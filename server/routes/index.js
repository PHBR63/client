const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { generateToken } = require('../config/jwt');

// Rotas públicas
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Aqui você implementaria a lógica de autenticação
    // Por exemplo, verificar no banco de dados
    const user = { id: 1, email }; // Exemplo
    
    const token = generateToken(user);
    
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Rotas protegidas
router.get('/perfil', auth, (req, res) => {
  res.json({ message: 'Rota protegida', user: req.user });
});

module.exports = router; 