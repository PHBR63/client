import styled from 'styled-components';
import { Box, Paper, Typography, TextField, Button, Link } from '@mui/material';

export const RegisterContainer = styled(Box)`
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
`;

export const RegisterCard = styled(Paper)`
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 500px;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(139, 0, 0, 0.3);
  box-shadow: 0 0 20px rgba(139, 0, 0, 0.2);
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Title = styled(Typography)`
  color: #F9FAFB;
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Cinzel', serif;
`;

export const StyledTextField = styled(TextField)`
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

export const StyledButton = styled(Button)`
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

export const StyledLink = styled(Link)`
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

export const ErrorText = styled(Typography)`
  color: #EF4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const SuccessMessage = styled(Typography)`
  color: #10B981;
  text-align: center;
  margin-top: 1rem;
`;

export const LoadingOverlay = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(17, 24, 39, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  border-radius: 1rem;
`; 