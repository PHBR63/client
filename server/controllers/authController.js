const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../config/jwt');

const authController = {
  async register(req, res) {
    try {
      const { email, password, name } = req.body;

      // Verifica se o usuário já existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email já cadastrado' });
      }

      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cria novo usuário
      const user = new User({
        name,
        email,
        password: hashedPassword
      });

      await user.save();

      // Gera token JWT
      const token = generateToken(user._id);

      res.status(201).json({
        message: 'Usuário criado com sucesso',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao criar usuário', error: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Busca usuário pelo email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
      }

      // Verifica senha
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
      }

      // Gera token JWT
      const token = generateToken(user._id);

      res.json({
        message: 'Login realizado com sucesso',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao realizar login', error: err.message });
    }
  }
};

module.exports = authController; 