const Product = require("../models/product");

module.exports.createProduct = async (req, res) => {
  try {
    const { productName, slug, description, price, category, brand, images } = req.body;

    if(!productName || !slug || !description || price === undefined || !category || !brand) {
      return res.status(400).send({message: "Invalid Data"});
    }

    const data = await Product.create({
      productName,
      slug,
      description,
      price,
      category,
      brand,
      images
    });

    return res.status(200).send({data});

  }catch(error){
    res.status(500).send({ message: "It was not possible to create a product " + error })
  }
  
};

module.exports.getProduct = async (req, res) => {
    try {
     const { productId } = req.params;
     const data = await Product.findById(productId);

     return res.status(200).send(data);
   }catch(error) {
        if (error.name === 'CastError') {
          return res.status(400).send({ message: "Invalid product ID format" });
        }
     res.status(500).send({ message: "Server Error" + error })
   }
}

module.exports.getAllProducts = async (req, res) => {
    try {
     const { category } = req.query;
     const filter = category ? { category } : {};

     const data = await Product.find(filter);

     return res.status(200).send(data);
   } catch(error) {
     res.status(500).send({ message: "Server Error" + error })
   }
}

module.exports.deleteProduct = async (req, res) => {
    try {
     const { productId } = req.params;

     const data = await Product.findByIdAndDelete(productId);
     
     if(!data) {
      return res.status(404).send({ message: "That product was not found to be deleted" });
     }

     return res.status(200).send(data);

   } catch(error) {
      if (error.name === 'CastError') {
        return res.status(400).send({ message: "Invalid product ID format" });
      }
     res.status(500).send({ message: "Server Error" + error })
   }
};

module.exports.updateProduct = async (req, res) => {
    try {
    const { productName, slug, description, price, category, brand, countInStock, images } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
     req.params.productId,
     {
       productName: productName,
       slug: slug,
       description: description,
       price: price,
       category: category,
       brand: brand,
       countInStock: countInStock,
       images: images
     },
     { 
      new: true, 
      runValidators: true, 
    }
    );
    return res.status(200).send(updatedProduct);
   } catch(error) {
      if (error.name === 'CastError') {
        return res.status(400).send({ message: "Invalid product ID format" });
      }
     res.status(500).send({ message: "Server Error" + error })
   }
}