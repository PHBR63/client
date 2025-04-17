import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, campaignService, characterService, sessionService } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    
    setLoading(false);
  }, []);

  const addNotification = (type, title, message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      addNotification('success', 'Login realizado', 'Bem-vindo de volta!');
      navigate('/dashboard');
    } catch (error) {
      addNotification('error', 'Erro no login', error.response?.data?.message || 'Erro ao fazer login');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentCampaign(null);
    setCurrentSession(null);
    navigate('/login');
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      addNotification('success', 'Cadastro realizado', 'Conta criada com sucesso!');
      return response;
    } catch (error) {
      addNotification('error', 'Erro no cadastro', error.response?.data?.message || 'Erro ao criar conta');
      throw error;
    }
  };

  const loadCampaign = async (id) => {
    try {
      const campaign = await campaignService.getById(id);
      setCurrentCampaign(campaign);
      return campaign;
    } catch (error) {
      addNotification('error', 'Erro ao carregar campanha', error.response?.data?.message || 'Erro ao carregar campanha');
      throw error;
    }
  };

  const loadSession = async (id) => {
    try {
      const session = await sessionService.getById(id);
      setCurrentSession(session);
      return session;
    } catch (error) {
      addNotification('error', 'Erro ao carregar sessão', error.response?.data?.message || 'Erro ao carregar sessão');
      throw error;
    }
  };

  const value = {
    user,
    loading,
    notifications,
    currentCampaign,
    currentSession,
    login,
    logout,
    register,
    loadCampaign,
    loadSession,
    addNotification,
    campaignService,
    characterService,
    sessionService
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
}; 