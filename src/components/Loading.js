import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useApp } from '../contexts/AppContext';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingMessage = styled.p`
  color: white;
  margin-top: 20px;
  font-size: 16px;
  text-align: center;
`;

export const Loading = () => {
  const { loading } = useApp();

  if (!loading) return null;

  return (
    <LoadingContainer>
      <div>
        <LoadingSpinner />
        <LoadingMessage>Carregando...</LoadingMessage>
      </div>
    </LoadingContainer>
  );
}; 