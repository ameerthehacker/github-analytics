import { useContext } from 'react';
import {
  authInfoContext,
  authFunctionsContext,
} from '../../contexts/auth/auth';

export function useAuth() {
  const authInfo = useContext(authInfoContext);
  const authFunctions = useContext(authFunctionsContext);

  if (authInfo === null || authFunctions === null) {
    throw new Error(
      'You need to wrap your component with `AuthProvider` for `useAuth` hook to work'
    );
  }

  return { ...authInfo, ...authFunctions };
}
