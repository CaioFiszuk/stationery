const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const User = require('./models/user');

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/stationery")
.then(()=>{
  console.log("Database is successfully connected");
});

/*async function makeAdmin() {
  const user = await User.findOne({ email: 'maria@email.com' });

  if (!user) {
    console.log('Usuário não encontrado');
    return;
  }

  user.isAdmin = true;
  await user.save();

  console.log('Admin created');
  process.exit();
}*/

//makeAdmin();

const { PORT = 3000 } = process.env;

app.use('/users', usersRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

app.use((err, req, res, next) => {
   console.log("err:" + err)

  res.status(err.statusCode).send({ message: err.message });
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));