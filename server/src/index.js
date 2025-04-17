const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
connectDB()
  .then(() => {
    console.log('Conectado ao MongoDB Atlas com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  });

// Rotas básicas
app.get('/', (req, res) => {
  res.json({ message: 'API do Sistema de Fichas Ordem Paranormal' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
}); 