const mongoose = require('mongoose');
const User = require('../../models/User');

describe('User Model Test', () => {
  const userData = {
    name: 'Teste Usuario',
    email: 'teste@email.com',
    password: 'senha123',
    role: 'player'
  };

  it('deve criar e salvar um usuário com sucesso', async () => {
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.role).toBe(userData.role);
  });

  it('deve falhar ao salvar um usuário sem campos obrigatórios', async () => {
    const userSemCampos = new User({});
    let err;
    
    try {
      await userSemCampos.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('deve falhar ao salvar um usuário com email inválido', async () => {
    const userEmailInvalido = new User({
      ...userData,
      email: 'emailinvalido'
    });
    let err;
    
    try {
      await userEmailInvalido.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('deve criptografar a senha antes de salvar', async () => {
    const user = new User(userData);
    await user.save();
    
    expect(user.password).not.toBe(userData.password);
  });

  it('deve comparar senha corretamente', async () => {
    const user = new User(userData);
    await user.save();
    
    const senhaCorreta = await user.comparePassword(userData.password);
    const senhaIncorreta = await user.comparePassword('senhaerrada');
    
    expect(senhaCorreta).toBe(true);
    expect(senhaIncorreta).toBe(false);
  });
}); 