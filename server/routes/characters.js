const express = require('express');
const router = express.Router();

// Placeholder para as rotas de personagens
router.get('/', (req, res) => {
  res.json({ message: 'Rota de personagens' });
});

module.exports = router; 