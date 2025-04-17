import React from 'react';
import styled from 'styled-components';
import { useApp } from '../contexts/AppContext';

const NotificationsContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Notification = styled.div`
  background: ${props => {
    switch (props.type) {
      case 'success':
        return 'rgba(76, 175, 80, 0.9)';
      case 'error':
        return 'rgba(244, 67, 54, 0.9)';
      case 'warning':
        return 'rgba(255, 152, 0, 0.9)';
      case 'info':
        return 'rgba(33, 150, 243, 0.9)';
      case 'dice':
        return 'rgba(156, 39, 176, 0.9)';
      default:
        return 'rgba(33, 33, 33, 0.9)';
    }
  }};
  color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-out;
  max-width: 300px;
  word-wrap: break-word;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const NotificationTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
`;

const NotificationMessage = styled.p`
  margin: 0;
  font-size: 14px;
`;

const DiceResult = styled.div`
  margin-top: 8px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-family: monospace;
`;

export const Notifications = () => {
  const { notifications } = useApp();

  return (
    <NotificationsContainer>
      {notifications.map(notification => (
        <Notification key={notification.id} type={notification.type}>
          <NotificationTitle>
            {notification.type === 'dice' ? 'Rolagem de Dados' : 'Notificação'}
          </NotificationTitle>
          <NotificationMessage>{notification.message}</NotificationMessage>
          {notification.type === 'dice' && notification.data && (
            <DiceResult>
              {notification.data.dice}: {notification.data.result}
              {notification.data.critical && ' (Crítico!)'}
              {notification.data.failure && ' (Falha!)'}
            </DiceResult>
          )}
        </Notification>
      ))}
    </NotificationsContainer>
  );
}; 