import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router';
import { useAuth } from '../../hooks/use-auth/use-auth';

export interface PrivateRouteProps extends Omit<RouteProps, 'children'> {
  fallbackPath?: string;
}

export default function PrivateRoute({
  fallbackPath = '/login',
  component,
  ...rest
}: PrivateRouteProps) {
  const { isLoggedIn } = useAuth();
  const componentToRender = isLoggedIn
    ? component
    : () => <Redirect to={fallbackPath} />;

  return <Route {...rest} component={componentToRender} />;
}
