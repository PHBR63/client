const { MongoClient } = require('mongodb');
require('dotenv').config();

let db = null;

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db(process.env.MONGODB_DB_NAME);
    console.log('Conectado ao MongoDB com sucesso!');
    return db;
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    throw err;
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Banco de dados não inicializado');
  }
  return db;
};

const closeDB = async () => {
  if (db) {
    await db.client.close();
    db = null;
  }
};

module.exports = {
  connectDB,
  getDB,
  closeDB
}; 