import React, { FC, ComponentType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../../contexts/auth-context';

interface Props {
  path: string;
  component: ComponentType;
  isPrivate: boolean;
  exact: boolean;
}

const ProtectedRoute: FC<Props> = ({
  path,
  component: Component,
  isPrivate,
  exact,
  ...rest
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      path={path}
      exact={exact}
      render={() =>
        isPrivate && !isAuthenticated() ? (
          <Redirect to={{ pathname: '/signin' }} />
        ) : (
          <Component />
        )
      }
      {...rest}
    />
  );
};

export default ProtectedRoute;
