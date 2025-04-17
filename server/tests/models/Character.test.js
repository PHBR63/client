const mongoose = require('mongoose');
const Character = require('../../models/Character');

describe('Character Model Test', () => {
  const characterData = {
    name: 'Personagem Teste',
    player: new mongoose.Types.ObjectId(),
    campaign: new mongoose.Types.ObjectId(),
    class: 'Combatente',
    nex: 5,
    attributes: {
      strength: 3,
      agility: 2,
      intellect: 1,
      vigor: 3,
      presence: 2
    },
    skills: [{
      name: 'Luta',
      value: 2
    }, {
      name: 'Reflexos',
      value: 1
    }],
    rituals: [{
      name: 'Ritual Teste',
      circle: 1,
      cost: 1,
      description: 'Descrição do ritual'
    }],
    equipment: [{
      name: 'Arma Teste',
      description: 'Uma arma de teste',
      quantity: 1
    }],
    background: 'História de teste do personagem'
  };

  it('deve criar e salvar um personagem com sucesso', async () => {
    const validCharacter = new Character(characterData);
    const savedCharacter = await validCharacter.save();
    
    expect(savedCharacter._id).toBeDefined();
    expect(savedCharacter.name).toBe(characterData.name);
    expect(savedCharacter.class).toBe(characterData.class);
    expect(savedCharacter.nex).toBe(characterData.nex);
    expect(savedCharacter.skills).toHaveLength(2);
    expect(savedCharacter.rituals).toHaveLength(1);
    expect(savedCharacter.equipment).toHaveLength(1);
  });

  it('deve falhar ao salvar um personagem sem campos obrigatórios', async () => {
    const characterSemCampos = new Character({});
    let err;
    
    try {
      await characterSemCampos.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('deve falhar ao salvar um personagem com classe inválida', async () => {
    const characterClasseInvalida = new Character({
      ...characterData,
      class: 'Classe Invalida'
    });
    let err;
    
    try {
      await characterClasseInvalida.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('deve falhar ao salvar um personagem com NEX fora do intervalo', async () => {
    const characterNexInvalido = new Character({
      ...characterData,
      nex: 100
    });
    let err;
    
    try {
      await characterNexInvalido.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('deve falhar ao salvar um personagem com atributo fora do intervalo', async () => {
    const characterAtributoInvalido = new Character({
      ...characterData,
      attributes: {
        ...characterData.attributes,
        strength: 6
      }
    });
    let err;
    
    try {
      await characterAtributoInvalido.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('deve falhar ao salvar um personagem com habilidade fora do intervalo', async () => {
    const characterHabilidadeInvalida = new Character({
      ...characterData,
      skills: [{
        name: 'Luta',
        value: 6
      }]
    });
    let err;
    
    try {
      await characterHabilidadeInvalida.save();
    } catch (error) {
      err = error;
    }
    
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('deve atualizar o campo updatedAt ao salvar', async () => {
    const character = new Character(characterData);
    const savedCharacter = await character.save();
    const initialUpdatedAt = savedCharacter.updatedAt;

    savedCharacter.name = 'Personagem Atualizado';
    const updatedCharacter = await savedCharacter.save();

    expect(updatedCharacter.updatedAt.getTime()).toBeGreaterThan(initialUpdatedAt.getTime());
  });
}); 