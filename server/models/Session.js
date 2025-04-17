const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: [true, 'Mensagem é obrigatória'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['text', 'dice', 'system'],
    default: 'text',
  },
  diceResult: {
    type: {
      type: String,
      enum: ['d20', 'd100', 'custom'],
    },
    value: Number,
    modifier: Number,
    total: Number,
    isCritical: Boolean,
    isFailure: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SessionSchema = new mongoose.Schema({
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: [true, 'Campanha é obrigatória'],
  },
  name: {
    type: String,
    required: [true, 'Nome da sessão é obrigatório'],
    trim: true,
  },
  description: String,
  date: {
    type: Date,
    required: [true, 'Data da sessão é obrigatória'],
  },
  status: {
    type: String,
    enum: ['scheduled', 'in_progress', 'finished'],
    default: 'scheduled',
  },
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    character: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Character',
    },
    role: {
      type: String,
      enum: ['master', 'player', 'spectator'],
      required: true,
    },
  }],
  messages: [MessageSchema],
  npcs: [{
    name: {
      type: String,
      required: true,
    },
    description: String,
    stats: {
      type: Map,
      of: Number,
    },
    notes: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para atualizar o campo updatedAt
SessionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Session', SessionSchema); 