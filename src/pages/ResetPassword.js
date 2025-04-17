import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ResetPasswordContainer = styled(Box)`
  min-height: 100vh;
  background: linear-gradient(135deg, #111827 0%, #1F2937 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/paranormal-bg.jpg') center/cover;
    opacity: 0.1;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(17, 24, 39, 0.8) 100%);
    z-index: 1;
  }
`;

const ResetPasswordCard = styled(motion(Paper))`
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 500px;
  position: relative;
  z-index: 2;
  border: 1px solid rgba(139, 0, 0, 0.3);
  box-shadow: 0 0 20px rgba(139, 0, 0, 0.2);
`;

const Title = styled(Typography)`
  color: #F9FAFB;
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Cinzel', serif;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem;
  
  & .MuiOutlinedInput-root {
    color: #F9FAFB;
    
    & fieldset {
      border-color: rgba(139, 0, 0, 0.3);
    }
    
    &:hover fieldset {
      border-color: rgba(139, 0, 0, 0.5);
    }
    
    &.Mui-focused fieldset {
      border-color: #8B0000;
    }
  }
  
  & .MuiInputLabel-root {
    color: #6B7280;
    
    &.Mui-focused {
      color: #8B0000;
    }
  }
`;

const StyledButton = styled(Button)`
  background: #8B0000;
  color: #F9FAFB;
  padding: 0.75rem;
  margin-top: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #A00000;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(139, 0, 0, 0.3);
  }
`;

const StyledLink = styled(Link)`
  color: #6B7280;
  text-decoration: none;
  margin-top: 1rem;
  display: block;
  text-align: center;
  transition: color 0.3s ease;
  
  &:hover {
    color: #8B0000;
  }
`;

const Footer = styled(Box)`
  position: absolute;
  bottom: 2rem;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 2;
`;

const FooterLink = styled(Link)`
  color: #6B7280;
  text-decoration: none;
  margin: 0 1rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #8B0000;
  }
`;

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Senha deve conter letra maiúscula, minúscula e número'
    )
    .required('Senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Senhas não coincidem')
    .required('Confirmação de senha é obrigatória'),
});

export const ResetPassword = () => {
  const [success, setSuccess] = useState(false);
  const { resetPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await resetPassword(searchParams.get('token'), values.password);
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        formik.setErrors({ submit: error.message });
      }
    },
  });

  return (
    <ResetPasswordContainer>
      <ResetPasswordCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title variant="h4">Redefinir Senha</Title>
        
        <form onSubmit={formik.handleSubmit}>
          <StyledTextField
            fullWidth
            label="Nova Senha"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!formik.errors.password}
            helperText={formik.errors.password}
            disabled={formik.isSubmitting}
          />
          
          <StyledTextField
            fullWidth
            label="Confirmar Nova Senha"
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={!!formik.errors.confirmPassword}
            helperText={formik.errors.confirmPassword}
            disabled={formik.isSubmitting}
          />
          
          {formik.errors.submit && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formik.errors.submit}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Senha redefinida com sucesso! Redirecionando para o login...
            </Alert>
          )}
          
          <StyledButton
            fullWidth
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Redefinir Senha'}
          </StyledButton>
        </form>
        
        <StyledLink href="/login">
          Voltar ao Login
        </StyledLink>
      </ResetPasswordCard>

      <Footer>
        <FooterLink href="/about">Sobre</FooterLink>
        <FooterLink href="/contact">Contato</FooterLink>
        <FooterLink href="https://x.com" target="_blank">X</FooterLink>
        <FooterLink href="https://discord.com" target="_blank">Discord</FooterLink>
        <Typography variant="body2" color="#6B7280" sx={{ mt: 2 }}>
          Powered by xAI
        </Typography>
      </Footer>
    </ResetPasswordContainer>
  );
}; 