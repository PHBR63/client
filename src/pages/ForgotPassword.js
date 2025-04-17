import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  padding: 20px;
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 0.05);
  padding: 40px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

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

const ErrorMessage = styled.p`
  color: #f44336;
  text-align: center;
  margin-top: 20px;
`;

const SuccessMessage = styled.p`
  color: #4caf50;
  text-align: center;
  margin-top: 20px;
`;

const LoginLink = styled(Link)`
  color: #6a1b9a;
  text-decoration: none;
  margin-top: 20px;
  display: block;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('Email é obrigatório'),
});

export const ForgotPassword = () => {
  const [success, setSuccess] = useState(false);
  const { forgotPassword } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await forgotPassword(values.email);
        setSuccess(true);
      } catch (error) {
        formik.setErrors({ submit: error.message });
      }
    },
  });

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Title>Recuperar Senha</Title>
        
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        
        {formik.touched.email && formik.errors.email && (
          <ErrorMessage>{formik.errors.email}</ErrorMessage>
        )}
        
        {formik.errors.submit && (
          <ErrorMessage>{formik.errors.submit}</ErrorMessage>
        )}
        
        {success && (
          <SuccessMessage>
            Email de recuperação enviado com sucesso!
          </SuccessMessage>
        )}
        
        <Button 
          type="submit" 
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {formik.isSubmitting ? 'Enviando...' : 'Enviar'}
        </Button>
        
        <LoginLink to="/login">
          Voltar para o login
        </LoginLink>
      </Form>
    </Container>
  );
}; 