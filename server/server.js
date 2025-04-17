require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, closeDB, getDB } = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  res.json({ message: 'API Ficha Paranormal está funcionando!' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;

// Conectar ao MongoDB antes de iniciar o servidor
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  });

// Tratamento de encerramento gracioso
process.on('SIGINT', async () => {
  try {
    await closeDB();
    console.log('Conexão com MongoDB fechada');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao fechar conexão com MongoDB:', err);
    process.exit(1);
  }
}); 