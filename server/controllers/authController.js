const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

const authController = {
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      // Verifica se o usuário já existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email já cadastrado' });
      }

      // Cria novo usuário
      const user = await User.create({
        name,
        email,
        password,
        role: role || 'player',
      });

      // Gera token JWT
      const token = generateToken(user);

      res.status(201).json({
        message: 'Usuário criado com sucesso',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
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
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
      }

      // Verifica senha
      const validPassword = await user.comparePassword(password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
      }

      // Gera token JWT
      const token = generateToken(user);

      res.json({
        message: 'Login realizado com sucesso',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao realizar login', error: err.message });
    }
  },

  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id)
        .select('-password')
        .populate('characters')
        .populate('campaigns');

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar perfil', error: error.message });
    }
  },

  async updateProfile(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      if (name) user.name = name;
      if (email) user.email = email;
      if (password) user.password = password;

      await user.save();

      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar perfil', error: error.message });
    }
  }
};

module.exports = authController; 