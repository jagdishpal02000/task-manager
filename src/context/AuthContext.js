import React, { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refreshToken,setRefreshToken] = useState(null);
  const [accessToken,setAccessToken] = useState(null);

  useEffect(()=>{
    const currentRefreshToken =  localStorage.getItem('refresh_token');
    console.log('cd',currentRefreshToken);
    if(currentRefreshToken !== null){
        setRefreshToken(currentRefreshToken);
        setIsAuthenticated(true);
    }else{
        setIsAuthenticated(false);
    }
  },[]);

  const login = (refreshToken) => {
    localStorage.setItem('refresh_token', refreshToken);
    setRefreshToken(refreshToken);
    setIsAuthenticated(true);
    };


  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ setIsAuthenticated,isAuthenticated, login, logout ,accessToken,setAccessToken,refreshToken,setRefreshToken}}>
      {children}
    </AuthContext.Provider>
  );
};
