import { useContext } from 'react';
import { authContent } from '../../contexts/auth/auth';

export function useAuth() {
  const auth = useContext(authContent);

  if (auth === null) {
    throw new Error(
      'You need to wrap your component with `AuthProvider` for `useAuth` hook to work'
    );
  }

  return auth;
}
