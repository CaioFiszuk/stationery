const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
  .then((user) => {
    if(!user){
      const error = new Error('Server Error');
      error.statusCode = 500;
      throw error;
    }

    res.send({ data: user })
  })
  .catch(next);
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Este e-mail já foi cadastrado." });
    }

    if (!email || !password) {
      return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    res.status(201).json({ 
      message: "Usuário cadastrado com sucesso!", 
      data: {
        id: newUser._id,
        email: newUser.email,
        isAdmin: newUser.isAdmin
      } 
    });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const nonExistingUser = await User.findOne({ email });
    if (!nonExistingUser) {
      return res.status(400).json({ message: "Este e-mail não está cadastrado." });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      const error = new Error('E-mail ou senha incorretos');
      error.statusCode = 401;
      throw error;
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      const error = new Error('E-mail ou senha incorretos');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.status(200).json({ token, isAdmin: user.isAdmin });

  } catch (err) {
    next(err);
  }
}

module.exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("email isAdmin");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};