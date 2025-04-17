const { verifyToken } = require('../config/jwt');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = verifyToken(token);
    req.user = decoded.user;
    
    next();
  } catch (err) {
    res.status(401).json({ message: 'Por favor, faça login para acessar este recurso' });
  }
};

module.exports = auth; 