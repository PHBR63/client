const express = require('express');
const router = express.Router();

// Placeholder para as rotas de sessões
router.get('/', (req, res) => {
  res.json({ message: 'Rota de sessões' });
});

module.exports = router; 