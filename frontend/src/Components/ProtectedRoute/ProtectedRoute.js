import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const ProtectedRoute = () => {
  const { authState } = useAuth();

  return authState.token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
