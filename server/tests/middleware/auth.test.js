const { auth, isMaster } = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

describe('Auth Middleware', () => {
  let mockReq;
  let mockRes;
  let nextFunction;

  beforeEach(() => {
    mockReq = {
      header: jest.fn(),
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  describe('auth', () => {
    it('deve passar quando token é válido', async () => {
      const user = {
        _id: '123',
        email: 'teste@email.com',
        role: 'player'
      };

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      mockReq.header = jest.fn().mockReturnValue(`Bearer ${token}`);
      
      User.findById = jest.fn().mockResolvedValue(user);

      await auth(mockReq, mockRes, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
      expect(mockReq.user).toEqual(user);
    });

    it('deve falhar quando token não é fornecido', async () => {
      mockReq.header = jest.fn().mockReturnValue(null);

      await auth(mockReq, mockRes, nextFunction);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Token não fornecido'
      });
    });

    it('deve falhar quando token é inválido', async () => {
      mockReq.header = jest.fn().mockReturnValue('Bearer tokeninvalido');

      await auth(mockReq, mockRes, nextFunction);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Token inválido'
      });
    });
  });

  describe('isMaster', () => {
    it('deve passar quando usuário é mestre', async () => {
      mockReq.user = { role: 'master' };

      await isMaster(mockReq, mockRes, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
    });

    it('deve falhar quando usuário não é mestre', async () => {
      mockReq.user = { role: 'player' };

      await isMaster(mockReq, mockRes, nextFunction);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Acesso negado. Apenas mestres podem realizar esta ação.'
      });
    });
  });
}); 