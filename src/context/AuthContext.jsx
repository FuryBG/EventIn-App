import React, { useContext, useEffect, useState } from 'react'
import { getUserDetails } from '../services/authService'
const AuthContext = React.createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setisAuthenticated] = useState(false);

  useEffect(() => {
    getUserDetails().then(r => {
      setisAuthenticated(true);
      setUser(r.data);
      setLoading(false);
    }).catch(err => {
      setisAuthenticated(false);
      setLoading(false);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, setisAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
