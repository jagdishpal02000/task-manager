import React, { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refreshToken,setRefreshToken] = useState(null);
  const [accessToken,setAccessToken] = useState(null);
  const [userName,setUserName] = useState('user');
  useEffect(()=>{
    const currentRefreshToken =  localStorage.getItem('refresh_token');
    if(currentRefreshToken !== null){
        setRefreshToken(currentRefreshToken);
        setUserName(localStorage.getItem('user_name') || 'user');
        setIsAuthenticated(true);
    }else{
        setIsAuthenticated(false);
    }
  },[]);

  const login = (refreshToken,name) => {
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('user_name', name);
    setRefreshToken(refreshToken);
    setUserName(name);
    setIsAuthenticated(true);
    };


  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ userName,setUserName,setIsAuthenticated,isAuthenticated, login, logout ,accessToken,setAccessToken,refreshToken,setRefreshToken}}>
      {children}
    </AuthContext.Provider>
  );
};
