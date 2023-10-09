import React from 'react'
import { Outlet } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import AuthorizationLoader from './shared-components/AuthorizationLoader/AuthorizationLoader';

export default function App() {

    const { isLoading } = useAuthContext();
    return (
        isLoading ? <AuthorizationLoader></AuthorizationLoader> : <Outlet />
    )
}
