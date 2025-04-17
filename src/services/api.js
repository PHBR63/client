import api from '../config/api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token, password) => {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  },
};

export const campaignService = {
  getAll: async () => {
    const response = await api.get('/campaigns');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/campaigns/${id}`);
    return response.data;
  },

  create: async (campaignData) => {
    const response = await api.post('/campaigns', campaignData);
    return response.data;
  },

  update: async (id, campaignData) => {
    const response = await api.put(`/campaigns/${id}`, campaignData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/campaigns/${id}`);
    return response.data;
  },
};

export const characterService = {
  getAll: async () => {
    const response = await api.get('/characters');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/characters/${id}`);
    return response.data;
  },

  create: async (characterData) => {
    const response = await api.post('/characters', characterData);
    return response.data;
  },

  update: async (id, characterData) => {
    const response = await api.put(`/characters/${id}`, characterData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/characters/${id}`);
    return response.data;
  },
};

export const sessionService = {
  getById: async (id) => {
    const response = await api.get(`/sessions/${id}`);
    return response.data;
  },

  create: async (sessionData) => {
    const response = await api.post('/sessions', sessionData);
    return response.data;
  },

  update: async (id, sessionData) => {
    const response = await api.put(`/sessions/${id}`, sessionData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/sessions/${id}`);
    return response.data;
  },

  rollDice: async (sessionId, rollData) => {
    const response = await api.post(`/sessions/${sessionId}/roll`, rollData);
    return response.data;
  },

  addNPC: async (sessionId, npcData) => {
    const response = await api.post(`/sessions/${sessionId}/npcs`, npcData);
    return response.data;
  },

  updateNPC: async (sessionId, npcId, npcData) => {
    const response = await api.put(`/sessions/${sessionId}/npcs/${npcId}`, npcData);
    return response.data;
  },

  deleteNPC: async (sessionId, npcId) => {
    const response = await api.delete(`/sessions/${sessionId}/npcs/${npcId}`);
    return response.data;
  },
}; 