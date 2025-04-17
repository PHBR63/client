import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LoginContainer,
  LoginCard,
  LoginTitle,
  LoginForm,
  StyledTextField,
  LoginButton,
  RememberMe,
  LinksContainer,
  RegisterLink,
  ErrorMessage,
  Footer,
  LoadingSkeleton,
  StyledSnackbar,
  StyledAlert,
  ThemeToggle,
  ParticlesContainer,
  LanguageSelector,
} from '../styles/LoginStyles';
import { Visibility, VisibilityOff, Brightness4, Brightness7 } from '@mui/icons-material';
import { IconButton, InputAdornment, Checkbox } from '@mui/material';
import { theme } from '../config/theme';
import Particles from 'react-particles-js';
import { useTranslation } from 'react-i18next';
import { Analytics } from '@vercel/analytics/react';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';

const Title = styled.h1`
  color: #fff;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #6a1b9a;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #7b1fa2;
  }

  &:disabled {
    background: #9e9e9e;
    cursor: not-allowed;
  }
`;

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn({ email, password });
    } catch (err) {
      setError('Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Login</Title>
        
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Entrar'}
        </Button>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <RegisterLink to="/register">
          Não tem uma conta? Registre-se
        </RegisterLink>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login; 