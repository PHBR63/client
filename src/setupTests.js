// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import i18n from './config/i18n';

// Mock do IntersectionObserver
class IntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }

  observe() {
    return null;
  }

  unobserve() {
    return null;
  }

  disconnect() {
    return null;
  }
}

global.IntersectionObserver = IntersectionObserver;

// Mock do ResizeObserver
class ResizeObserver {
  observe() {
    return null;
  }

  unobserve() {
    return null;
  }

  disconnect() {
    return null;
  }
}

global.ResizeObserver = ResizeObserver;

// Mock do matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Configuração do i18n para testes
i18n.init({
  lng: 'pt-BR',
  fallbackLng: 'pt-BR',
  resources: {
    'pt-BR': {
      translation: {
        login: {
          title: 'Ordem Paranormal RPG',
          email: 'Email',
          password: 'Senha',
          rememberMe: 'Lembrar-me',
          submit: 'Entrar',
          forgotPassword: 'Esqueceu a senha?',
          createAccount: 'Criar conta',
          showPassword: 'Mostrar senha',
          hidePassword: 'Esconder senha',
          errors: {
            requiredEmail: 'Email é obrigatório',
            invalidEmail: 'Email inválido',
            requiredPassword: 'Senha é obrigatória',
            passwordLength: 'Senha deve ter pelo menos 6 caracteres',
            generic: 'Email ou senha inválidos. Por favor, tente novamente.',
          },
        },
      },
    },
  },
});
