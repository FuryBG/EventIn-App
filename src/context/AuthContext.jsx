import React, { useContext, useState } from 'react'
import { getUserDetails } from '../services/authService'
import { useQuery } from 'react-query';
const AuthContext = React.createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setisAuthenticated] = useState(null);
  const { data, isError, isLoading, refetch } = useQuery({
    queryFn: getUserDetails,
    onSuccess: (data) => {
      setisAuthenticated(true);
    },
    onError: (error) => {
      setisAuthenticated(false);
    },
    refetchOnWindowFocus: false,
    retry: false
    
  });

  return (
    <AuthContext.Provider value={{ data, isLoading, isAuthenticated, setisAuthenticated, refetch }}>
      {children}
    </AuthContext.Provider>
  )
}
