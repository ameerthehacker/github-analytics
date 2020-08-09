import { createContext, ReactNode } from 'react';
import React from 'react';
import { Http } from '../../services/http/http';

const httpContext = createContext<Http | null>(null);
const HttpProvider = ({ children }: { children: ReactNode }) => (
  <httpContext.Provider value={new Http('/api')}>
    {children}
  </httpContext.Provider>
);

export default HttpProvider;
export { httpContext };
