import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../config/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStoredData = async () => {
      const storedToken = localStorage.getItem('@OrdemParanormal:token');
      const storedRefreshToken = localStorage.getItem('@OrdemParanormal:refreshToken');
      const storedUser = localStorage.getItem('@OrdemParanormal:user');

      if (storedToken && storedUser) {
        api.defaults.headers.authorization = `Bearer ${storedToken}`;
        setUser(JSON.parse(storedUser));
      } else if (storedRefreshToken) {
        try {
          const response = await api.post('/auth/refresh-token', {
            refreshToken: storedRefreshToken
          });
          
          const { token, refreshToken, user: userData } = response.data;
          
          localStorage.setItem('@OrdemParanormal:token', token);
          localStorage.setItem('@OrdemParanormal:refreshToken', refreshToken);
          localStorage.setItem('@OrdemParanormal:user', JSON.stringify(userData));
          
          api.defaults.headers.authorization = `Bearer ${token}`;
          setUser(userData);
        } catch (error) {
          signOut();
        }
      }
      setLoading(false);
    };

    loadStoredData();
  }, []);

  const signIn = async ({ email, password }) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, refreshToken, user: userData } = response.data;

      localStorage.setItem('@OrdemParanormal:token', token);
      localStorage.setItem('@OrdemParanormal:refreshToken', refreshToken);
      localStorage.setItem('@OrdemParanormal:user', JSON.stringify(userData));

      api.defaults.headers.authorization = `Bearer ${token}`;
      setUser(userData);
      navigate('/dashboard');
    } catch (error) {
      throw new Error('Erro ao fazer login');
    }
  };

  const signOut = () => {
    localStorage.removeItem('@OrdemParanormal:token');
    localStorage.removeItem('@OrdemParanormal:refreshToken');
    localStorage.removeItem('@OrdemParanormal:user');
    setUser(null);
    navigate('/');
  };

  const updateUser = async (userData) => {
    try {
      const response = await api.put('/users', userData);
      const updatedUser = response.data;
      
      localStorage.setItem('@OrdemParanormal:user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      throw new Error('Erro ao atualizar usuário');
    }
  };

  const forgotPassword = async (email) => {
    try {
      await api.post('/auth/forgot-password', { email });
    } catch (error) {
      throw new Error('Erro ao solicitar recuperação de senha');
    }
  };

  const resetPassword = async (token, password) => {
    try {
      await api.post('/auth/reset-password', { token, password });
    } catch (error) {
      throw new Error('Erro ao resetar senha');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      signed: !!user, 
      user, 
      loading, 
      signIn, 
      signOut, 
      updateUser,
      forgotPassword,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 