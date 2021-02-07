import React, { FC, ComponentType } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { useAuth } from '../../../contexts/auth-context';
import { useUser } from '../../../contexts/user-context';
import LoadingSpinner from '../../ui/loading-spinner';

interface Params {
  id: string;
}

interface Props {
  path: string;
  component: ComponentType<RouteComponentProps<Params>>;
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
  const { isAuthenticated } = useUser();
  const { loading } = useAuth();

  return loading ? (
    <LoadingSpinner size={100} />
  ) : (
    <Route
      path={path}
      exact={exact}
      render={props =>
        isPrivate && !isAuthenticated ? (
          <Redirect to={{ pathname: '/signin' }} />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};

export default ProtectedRoute;
