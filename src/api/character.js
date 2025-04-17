import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchCharacter = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/characters/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao carregar personagem');
  }
};

export const saveCharacter = async (characterData) => {
  try {
    const url = characterData._id 
      ? `${API_URL}/characters/${characterData._id}`
      : `${API_URL}/characters`;
    
    const method = characterData._id ? 'put' : 'post';
    
    const response = await axios[method](url, characterData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao salvar personagem');
  }
}; 