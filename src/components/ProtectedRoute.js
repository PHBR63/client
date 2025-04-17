import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

const ProtectedRoute = ({ children, requireMaster = false }) => {
  const { user, currentCampaign } = useApp();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireMaster && currentCampaign && currentCampaign.masterId !== user._id) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute; 