const request = require('supertest');
const app = require('../../config/express');
const User = require('../../models/User');
const { generateToken } = require('../../config/jwt');

describe('Auth Controller', () => {
  const userData = {
    name: 'Teste Usuario',
    email: 'teste@email.com',
    password: 'senha123',
    role: 'player'
  };

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    it('deve registrar um novo usuário com sucesso', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user.email).toBe(userData.email);
    });

    it('deve falhar ao registrar com email já existente', async () => {
      await User.create(userData);

      const res = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Email já cadastrado');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await User.create(userData);
    });

    it('deve fazer login com sucesso', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: userData.email,
          password: userData.password
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe(userData.email);
    });

    it('deve falhar ao fazer login com senha incorreta', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: userData.email,
          password: 'senhaerrada'
        });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Email ou senha inválidos');
    });
  });

  describe('GET /api/auth/profile', () => {
    let token;
    let user;

    beforeEach(async () => {
      user = await User.create(userData);
      token = generateToken(user);
    });

    it('deve retornar o perfil do usuário autenticado', async () => {
      const res = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id', user._id.toString());
      expect(res.body).toHaveProperty('email', userData.email);
    });

    it('deve falhar ao acessar sem token', async () => {
      const res = await request(app)
        .get('/api/auth/profile');

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Token não fornecido');
    });
  });
}); 