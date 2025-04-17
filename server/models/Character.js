const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome do personagem é obrigatório'],
    trim: true,
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Jogador é obrigatório'],
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: [true, 'Campanha é obrigatória'],
  },
  class: {
    type: String,
    required: [true, 'Classe é obrigatória'],
    enum: ['Combatente', 'Especialista', 'Ocultista'],
  },
  nex: {
    type: Number,
    required: [true, 'NEX é obrigatório'],
    min: [0, 'NEX mínimo é 0'],
    max: [99, 'NEX máximo é 99'],
  },
  attributes: {
    strength: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    agility: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    intellect: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    vigor: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    presence: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  },
  skills: [{
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  }],
  rituals: [{
    name: {
      type: String,
      required: true,
    },
    circle: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    cost: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
      required: true,
    },
  }],
  equipment: [{
    name: {
      type: String,
      required: true,
    },
    description: String,
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  }],
  background: {
    type: String,
    required: [true, 'História do personagem é obrigatória'],
  },
  image: {
    type: String,
    default: '',
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
CharacterSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Character', CharacterSchema); 