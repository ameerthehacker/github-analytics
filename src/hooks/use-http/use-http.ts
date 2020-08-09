import { useContext } from 'react';
import { httpContext } from '../../contexts/http/http';

export function useHttp() {
  const http = useContext(httpContext);

  if (http === null) {
    throw new Error(
      'You need to wrap your component with `HttpProvider` for `useHttp` hook to work'
    );
  }

  return http;
}
