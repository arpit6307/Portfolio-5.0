import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/Auth'; // Hum yeh AuthContext use karenge

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Agar user logged in nahi hai, to login page par redirect karein
    return <Navigate to="/admin/login" />;
  }

  // Agar logged in hai, to requested page dikhayein
  return children;
};

export default ProtectedRoute;
