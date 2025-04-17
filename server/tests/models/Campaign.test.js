const mongoose = require('mongoose');
const Campaign = require('../../models/Campaign');

describe('Campaign Model Test', () => {
  const campaignData = {
    name: 'Campanha Teste',
    description: 'Uma campanha de teste para o RPG',
    master: new mongoose.Types.ObjectId(),
    players: [new mongoose.Types.ObjectId()],
    characters: [new mongoose.Types.ObjectId()],
    sessions: [new mongoose.Types.ObjectId()],
    status: 'active',
    settings: {
      maxPlayers: 4,
      nexLimit: 50,
      allowCustomRituals: true
    }
  };

  it('deve criar e salvar uma campanha com sucesso', async () => {
    const validCampaign = new Campaign(campaignData);
    const savedCampaign = await validCampaign.save();
    
    expect(savedCampaign._id).toBeDefined();
    expect(savedCampaign.name).toBe(campaignData.name);
    expect(savedCampaign.description).toBe(campaignData.description);
    expect(savedCampaign.status).toBe(campaignData.status);
    expect(savedCampaign.players).toHaveLength(1);
    expect(savedCampaign.characters).toHaveLength(1);
    expect(savedCampaign.sessions).toHaveLength(1);
    expect(savedCampaign.settings.maxPlayers).toBe(4);
  });

  it('deve falhar ao salvar uma campanha sem campos obrigatórios', async () => {
    const campaignSemCampos = new Campaign({});
    let err;
    
    try {
      await campaignSemCampos.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('deve falhar ao salvar uma campanha com status inválido', async () => {
    const campaignStatusInvalido = new Campaign({
      ...campaignData,
      status: 'status_invalido'
    });
    let err;
    
    try {
      await campaignStatusInvalido.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('deve falhar ao salvar uma campanha com maxPlayers fora do intervalo', async () => {
    const campaignMaxPlayersInvalido = new Campaign({
      ...campaignData,
      settings: {
        ...campaignData.settings,
        maxPlayers: 11
      }
    });
    let err;
    
    try {
      await campaignMaxPlayersInvalido.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('deve falhar ao salvar uma campanha com nexLimit fora do intervalo', async () => {
    const campaignNexLimitInvalido = new Campaign({
      ...campaignData,
      settings: {
        ...campaignData.settings,
        nexLimit: 100
      }
    });
    let err;
    
    try {
      await campaignNexLimitInvalido.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('deve atualizar o campo updatedAt ao salvar', async () => {
    const campaign = new Campaign(campaignData);
    const savedCampaign = await campaign.save();
    const initialUpdatedAt = savedCampaign.updatedAt;

    savedCampaign.name = 'Campanha Atualizada';
    const updatedCampaign = await savedCampaign.save();

    expect(updatedCampaign.updatedAt.getTime()).toBeGreaterThan(initialUpdatedAt.getTime());
  });

  it('deve usar valores padrão para configurações não fornecidas', async () => {
    const campaignSemSettings = new Campaign({
      name: 'Campanha Sem Settings',
      description: 'Descrição',
      master: new mongoose.Types.ObjectId()
    });
    const savedCampaign = await campaignSemSettings.save();

    expect(savedCampaign.settings.maxPlayers).toBe(6);
    expect(savedCampaign.settings.nexLimit).toBe(99);
    expect(savedCampaign.settings.allowCustomRituals).toBe(false);
  });
}); 