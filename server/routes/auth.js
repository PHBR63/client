const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { generateToken } = require('../config/jwt');
const User = require('../models/User');
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
const { auth } = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Registrar um novo usuário
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Autenticar usuário e retornar token
// @access  Public
router.post('/login', login);

// Rotas protegidas
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

module.exports = router; 