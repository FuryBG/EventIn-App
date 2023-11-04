import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ authAccess }) {
    const { isAuthenticated, isLoading } = useAuthContext();

    if(isLoading) return null;

    if(authAccess) {
        if(isAuthenticated) {
            return <Outlet />
        }
        else {
            return <Navigate to={"/auth/login"}></Navigate>
        }
    }
    else {
        if(isAuthenticated) {
            return <Navigate to={"/"}></Navigate>
        }
        else {
            return <Outlet />
        }
    }
}
