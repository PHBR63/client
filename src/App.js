import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CampaignForm from './pages/CampaignForm';
import CampaignLobby from './pages/CampaignLobby';
import CharacterForm from './pages/CharacterForm';
import Session from './pages/Session';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/campaign/new"
            element={
              <ProtectedRoute>
                <CampaignForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/campaign/:id/edit"
            element={
              <ProtectedRoute requireMaster>
                <CampaignForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/campaign/:id/lobby"
            element={
              <ProtectedRoute>
                <CampaignLobby />
              </ProtectedRoute>
            }
          />
          <Route
            path="/character/new"
            element={
              <ProtectedRoute>
                <CharacterForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/character/:id/edit"
            element={
              <ProtectedRoute>
                <CharacterForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/session/:id"
            element={
              <ProtectedRoute>
                <Session />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
