import React from 'react'
import { Outlet } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import GlobalLoader from './shared-components/GlobalLoader/GlobalLoader';

export default function App() {

    const { isLoading } = useAuthContext();
    return (
        isLoading ? <GlobalLoader></GlobalLoader> : <Outlet />
    )
}
