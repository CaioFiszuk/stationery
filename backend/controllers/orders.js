const Order = require('../models/order');
const Product = require('../models/product');


module.exports.createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    let itemsPrice = 0;
    const processedItems = [];

    for (const item of orderItems) {
      const product = await Product.findById(item.product);

      if (!product || !product.isActive) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (product.countInStock < item.quantity) {
        return res.status(400).json({
          message: `Product ${product.productName} is out of stock`
        });
      }

      const itemTotal = product.price * item.quantity;
      itemsPrice += itemTotal;

      processedItems.push({
        product: product._id,
        name: product.productName,
        image: item.image,
        price: product.price,
        quantity: item.quantity
      });

    }

    const shippingPrice = itemsPrice > 200 ? 0 : 20;
    const totalPrice = itemsPrice + shippingPrice;

    const order = new Order({
      user: req.user.id,
      orderItems: processedItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice
    });

    const createdOrder = await order.save();

    for (const item of processedItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { countInStock: -item.quantity }
      });
    }

    res.status(201).json(createdOrder);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

 module.exports.getAllOrders = async (req, res) => {
   try {
     const orders = await Order.find({})
     .populate('user', 'name email')
     .sort('-createdAt')
 
     res.json(orders);
   } catch (error) {
     res.status(500).json({ message: 'Error fetching orders' });
   }
 };

module.exports.getMyOrders = async (req, res) => {
   try {
     const orders = await Order.find({ user: req.user.id })
     .sort('-createdAt');

     res.json(orders);
   } catch (error) {
     res.status(500).json({ message: 'Error fetching orders' });
   }
 };

module.exports.getOrderById = async (req, res) => {
   try {
     const order = await Order.findById(req.params.id)
       .populate('user', 'name email');
 
     if (!order) {
       return res.status(404).json({ message: 'Order not found' });
     }
 
     if (
       order.user._id.toString() !== req.user.id.toString() &&
       !req.user.isAdmin
     ) {
       return res.status(403).json({ message: 'Not authorized' });
     }
 
     res.json(order);
   } catch (error) {
     res.status(500).json({
    message: 'Error fetching orders',
    error: error.message
  });
   }
 }; 

 module.exports.updateOrderStatus = async (req, res) => {
   try {
     const { status } = req.body;
 
     const order = await Order.findById(req.params.id);
 
     if (!order) {
       return res.status(404).json({ message: 'Order not found' });
     }
 
     order.status = status;
 
     if (status === 'paid') {
       order.isPaid = true;
       order.paidAt = Date.now();
     }
 
     const updatedOrder = await order.save();
     res.json(updatedOrder);
   } catch (error) {
     res.status(500).json({ message: 'Error updating order' });
   }
 };