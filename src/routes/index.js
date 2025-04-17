import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import { AuthProvider } from '../contexts/AuthContext';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard';
import CampaignForm from '../pages/CampaignForm';
import CharacterForm from '../pages/CharacterForm';
import CampaignLobby from '../pages/CampaignLobby';
import Session from '../pages/Session';

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        
        <Route path="/campaigns/new" element={
          <PrivateRoute>
            <CampaignForm />
          </PrivateRoute>
        } />
        
        <Route path="/campaigns/:id/edit" element={
          <PrivateRoute>
            <CampaignForm />
          </PrivateRoute>
        } />
        
        <Route path="/characters/new" element={
          <PrivateRoute>
            <CharacterForm />
          </PrivateRoute>
        } />
        
        <Route path="/characters/:id/edit" element={
          <PrivateRoute>
            <CharacterForm />
          </PrivateRoute>
        } />
        
        <Route path="/campaigns/:id/lobby" element={
          <PrivateRoute>
            <CampaignLobby />
          </PrivateRoute>
        } />
        
        <Route path="/campaigns/:id/session" element={
          <PrivateRoute>
            <Session />
          </PrivateRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}; 