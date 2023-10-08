import React from 'react'
import { Outlet } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import { PrimeReactProvider } from 'primereact/api';
import AuthorizationLoader from './shared-components/AuthorizationLoader/AuthorizationLoader';

export default function App() {

    const val = useAuthContext();
    return (
        <PrimeReactProvider>
            { val.loading ? <AuthorizationLoader></AuthorizationLoader> : <Outlet /> }
        </PrimeReactProvider>
    )
}
