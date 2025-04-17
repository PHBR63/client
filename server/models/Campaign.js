const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome da campanha é obrigatório'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
  },
  master: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Mestre é obrigatório'],
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  characters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character',
  }],
  sessions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
  }],
  status: {
    type: String,
    enum: ['active', 'paused', 'finished'],
    default: 'active',
  },
  settings: {
    maxPlayers: {
      type: Number,
      default: 6,
      min: 1,
      max: 10,
    },
    nexLimit: {
      type: Number,
      default: 99,
      min: 0,
      max: 99,
    },
    allowCustomRituals: {
      type: Boolean,
      default: false,
    },
  },
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
CampaignSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Campaign', CampaignSchema); 