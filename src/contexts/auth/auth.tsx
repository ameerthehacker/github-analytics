import { createContext, ReactNode, useState } from 'react';
import { Auth } from '../../services/auth/auth';
import React from 'react';
import { useHttp } from '../../hooks/use-http/use-http';
import { LoginWithPasswordResponse } from '../../api/contract';

interface AuthInfo {
  isLoggedIn: boolean;
  user: {
    id: string;
    fullName: string;
  } | null;
}

interface AuthFunctions {
  loginWithPassword: (password: string) => Promise<LoginWithPasswordResponse>;
  loginWithToken: (token: string) => void;
  logout: () => void;
}

export const authInfoContext = createContext<AuthInfo | null>(null);
export const authFunctionsContext = createContext<AuthFunctions | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const http = useHttp();
  const auth = new Auth(http);
  const [isLoggedIn, setIsLoggedIn] = useState(auth.isLoggedIn());
  const jwtInfo = auth.decodeJwt();

  return (
    <authInfoContext.Provider
      value={{
        isLoggedIn,
        user: isLoggedIn
          ? {
              id: jwtInfo.sub,
              fullName: jwtInfo.fullName,
            }
          : null,
      }}
    >
      <authFunctionsContext.Provider
        value={{
          loginWithPassword(password: string) {
            return new Promise((resolve, reject) => {
              auth
                .loginWithPassword(password)
                .then((response) => {
                  if (response.isAuthenticated) {
                    setIsLoggedIn(true);
                  }

                  resolve(response);
                })
                .catch(reject);
            });
          },
          loginWithToken(token: string) {
            auth.loginWithToken(token);

            setIsLoggedIn(true);
          },
          logout: () => {
            auth.logout();

            setIsLoggedIn(false);
          },
        }}
      >
        {children}
      </authFunctionsContext.Provider>
    </authInfoContext.Provider>
  );
};

export default AuthProvider;
