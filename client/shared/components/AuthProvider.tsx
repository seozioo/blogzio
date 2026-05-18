'use client';

import {
  registerTokenrefresh,
  unregisterTokenrefresh,
} from '@/constants/api-client';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  isAdmin: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export type AuthProviderProps = Readonly<{
  children: React.ReactNode;
}>;

export const AuthProvider = (props: AuthProviderProps) => {
  const [token, setTokenState] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;

    return localStorage.getItem('accessToken');
  });

  const setToken = useCallback((token: string | null) => {
    setTokenState(token);

    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
  }, []);

  const isAdmin = useMemo(() => {
    // TODO: 임시 구현입니다. 아직 관리자 계정 뿐이라 이렇게 처리합니다.
    return !!token;
  }, [token]);

  useEffect(() => {
    const handler = (t: string) => {
      setToken(t);
    };

    registerTokenrefresh(handler);

    return () => {
      unregisterTokenrefresh(handler);
    };
  }, [setToken]);

  return (
    <AuthContext.Provider value={{ token, setToken, isAdmin }}>
      {props.children}
    </AuthContext.Provider>
  );
};
