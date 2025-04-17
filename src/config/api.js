import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // Erros do servidor
      switch (error.response.status) {
        case 401:
          // Token inválido ou expirado
          localStorage.removeItem('@OrdemParanormal:token');
          localStorage.removeItem('@OrdemParanormal:user');
          window.location.href = '/login';
          break;
        case 403:
          // Acesso negado
          console.error('Acesso negado');
          break;
        case 404:
          // Recurso não encontrado
          console.error('Recurso não encontrado');
          break;
        case 500:
          // Erro interno do servidor
          console.error('Erro interno do servidor');
          break;
        default:
          console.error('Erro desconhecido');
      }
    } else if (error.request) {
      // Erros de rede
      console.error('Erro de conexão');
    } else {
      // Erros na configuração da requisição
      console.error('Erro na requisição');
    }
    return Promise.reject(error);
  }
);

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@OrdemParanormal:token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api; 