'use client';

import { createContext, useEffect, useState } from 'react';

export type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export type AuthProviderProps = Readonly<{
  children: React.ReactNode;
}>;

export const AuthProvider = (props: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};
