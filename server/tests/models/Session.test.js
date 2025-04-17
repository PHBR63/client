const mongoose = require('mongoose');
const Session = require('../../models/Session');

describe('Session Model Test', () => {
  const sessionData = {
    campaign: new mongoose.Types.ObjectId(),
    name: 'Sessão de Teste',
    description: 'Uma sessão de teste para o RPG',
    date: new Date(),
    status: 'scheduled',
    participants: [{
      user: new mongoose.Types.ObjectId(),
      role: 'master'
    }],
    messages: [{
      user: new mongoose.Types.ObjectId(),
      content: 'Mensagem de teste',
      type: 'text'
    }],
    npcs: [{
      name: 'NPC Teste',
      description: 'Um NPC de teste',
      stats: new Map([['força', 10], ['agilidade', 8]])
    }]
  };

  it('deve criar e salvar uma sessão com sucesso', async () => {
    const validSession = new Session(sessionData);
    const savedSession = await validSession.save();
    
    expect(savedSession._id).toBeDefined();
    expect(savedSession.name).toBe(sessionData.name);
    expect(savedSession.description).toBe(sessionData.description);
    expect(savedSession.status).toBe(sessionData.status);
    expect(savedSession.participants).toHaveLength(1);
    expect(savedSession.messages).toHaveLength(1);
    expect(savedSession.npcs).toHaveLength(1);
  });

  it('deve falhar ao salvar uma sessão sem campos obrigatórios', async () => {
    const sessionSemCampos = new Session({});
    let err;
    
    try {
      await sessionSemCampos.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('deve falhar ao salvar uma sessão com status inválido', async () => {
    const sessionStatusInvalido = new Session({
      ...sessionData,
      status: 'status_invalido'
    });
    let err;
    
    try {
      await sessionStatusInvalido.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('deve falhar ao salvar uma sessão com participante com role inválida', async () => {
    const sessionRoleInvalida = new Session({
      ...sessionData,
      participants: [{
        user: new mongoose.Types.ObjectId(),
        role: 'role_invalida'
      }]
    });
    let err;
    
    try {
      await sessionRoleInvalida.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('deve atualizar o campo updatedAt ao salvar', async () => {
    const session = new Session(sessionData);
    const savedSession = await session.save();
    const initialUpdatedAt = savedSession.updatedAt;

    savedSession.name = 'Sessão Atualizada';
    const updatedSession = await savedSession.save();

    expect(updatedSession.updatedAt.getTime()).toBeGreaterThan(initialUpdatedAt.getTime());
  });

  it('deve salvar uma mensagem com resultado de dado', async () => {
    const sessionComDado = new Session({
      ...sessionData,
      messages: [{
        user: new mongoose.Types.ObjectId(),
        content: 'Rolando d20',
        type: 'dice',
        diceResult: {
          type: 'd20',
          value: 15,
          modifier: 2,
          total: 17,
          isCritical: false,
          isFailure: false
        }
      }]
    });

    const savedSession = await sessionComDado.save();
    expect(savedSession.messages[0].diceResult.total).toBe(17);
  });
}); 