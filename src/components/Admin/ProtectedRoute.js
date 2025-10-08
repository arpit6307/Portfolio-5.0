import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/Auth';

const ProtectedRoute = ({ children }) => {
    const { currentUser, isAdmin } = useAuth();

    // Agar user logged in nahi hai, ya logged in hai lekin admin nahi hai, to use redirect karein
    if (!currentUser || !isAdmin) {
        return <Navigate to="/auth" />;
    }

    return children;
};

export default ProtectedRoute;
