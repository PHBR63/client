const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

const isMaster = async (req, res, next) => {
  try {
    if (req.user.role !== 'master') {
      return res.status(403).json({ message: 'Acesso negado. Apenas mestres podem realizar esta ação.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao verificar permissões' });
  }
};

module.exports = { auth, isMaster }; 