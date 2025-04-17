const express = require('express');
const router = express.Router();

// Placeholder para as rotas de campanhas
router.get('/', (req, res) => {
  res.json({ message: 'Rota de campanhas' });
});

module.exports = router; 