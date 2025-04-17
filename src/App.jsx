import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CharacterForm from './pages/CharacterForm';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import CampaignForm from './pages/CampaignForm';
import Home from './pages/Home';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B0000',
    },
    secondary: {
      main: '#1F2937',
    },
    background: {
      default: '#111827',
    },
    text: {
      primary: '#F9FAFB',
      secondary: '#6B7280',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontFamily: 'Cinzel, serif',
    },
    h2: {
      fontFamily: 'Cinzel, serif',
    },
    h3: {
      fontFamily: 'Cinzel, serif',
    },
    h4: {
      fontFamily: 'Cinzel, serif',
    },
    h5: {
      fontFamily: 'Cinzel, serif',
    },
    h6: {
      fontFamily: 'Cinzel, serif',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/character/new" element={<CharacterForm />} />
        <Route path="/character/:id" element={<CharacterForm />} />
        <Route path="/campaign/new" element={<CampaignForm />} />
        <Route path="/campaign/:id" element={<CampaignForm />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App; 