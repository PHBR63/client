const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Session = require('../models/Session');

const configureSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true
    },
  });

  // Middleware de autenticação
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Token não fornecido'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return next(new Error('Usuário não encontrado'));
      }

      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Token inválido'));
    }
  });

  io.on('connection', (socket) => {
    console.log('Novo cliente conectado:', socket.id);

    socket.on('join-campaign', (campaignId) => {
      socket.join(campaignId);
      console.log(`Cliente ${socket.id} entrou na campanha ${campaignId}`);
    });

    socket.on('leave-campaign', (campaignId) => {
      socket.leave(campaignId);
      console.log(`Cliente ${socket.id} saiu da campanha ${campaignId}`);
    });

    socket.on('chat-message', (data) => {
      io.to(data.campaignId).emit('new-message', {
        user: data.user,
        message: data.message,
        timestamp: new Date()
      });
    });

    socket.on('dice-roll', (data) => {
      io.to(data.campaignId).emit('dice-result', {
        user: data.user,
        result: data.result,
        timestamp: new Date()
      });
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });

  return io;
};

module.exports = configureSocket; 