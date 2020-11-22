import React, { createContext, FC } from 'react';
import { useContext } from 'react';
import { User } from '../../types/models';
import { useAuth } from '../auth-context';

interface UserContextContent {
  // TODO: Add correct typing
  user: User | null | undefined;
  isAuthenticated: () => boolean;
}

const UserContext = createContext<UserContextContent>({} as UserContextContent);

export const useUser = () => useContext(UserContext);

const UserProvider: FC = props => {
  const { isAuthenticated, user } = useAuth();
  return <UserContext.Provider value={{ isAuthenticated, user }} {...props} />;
};

export default UserProvider;
