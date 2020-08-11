import { createContext, ReactNode } from 'react';
import { Auth } from '../../services/auth/auth';
import React from 'react';
import { useHttp } from '../../hooks/use-http/use-http';

export const authContent = createContext<Auth | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const http = useHttp();

  return (
    <authContent.Provider value={new Auth(http)}>
      {children}
    </authContent.Provider>
  );
};

export default AuthProvider;
