const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { authMiddleware } = require('./jwt');

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas públicas
app.use('/api/auth', require('../routes/auth'));

// Middleware de autenticação
app.use(authMiddleware);

// Rotas protegidas
app.use('/api/campaigns', require('../routes/campaigns'));
app.use('/api/characters', require('../routes/characters'));
app.use('/api/sessions', require('../routes/sessions'));

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

module.exports = app; 