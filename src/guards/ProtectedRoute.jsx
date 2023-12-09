import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { loginUrl } from '../services/authService';

export default function ProtectedRoute( { children } ) {
    const { isAuthenticated, isLoading } = useAuthContext();

    if(isLoading) return null;

    if(isAuthenticated) {
        return children
    }
    else {
        location.href = loginUrl;
    }
}
