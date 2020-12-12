import { AxiosRequestConfig } from 'axios';
import React, { createContext, FC } from 'react';
import { useContext } from 'react';
import { RestApiUrl, HttpMethod, sendRequest } from '../../helper/axios';
import { isEmpty } from '../../helper/checkUtils';
import { Role, User } from '../../types/models';
import { SignUpPayload } from '../../types/payloads';
import { useAuth } from '../auth-context';

interface UserContextContent {
  user: User;
  isAuthenticated: boolean;
  isAdmin: boolean;
  updateProfile: (payload: SignUpPayload) => Promise<void>;
}

const UserContext = createContext<UserContextContent>({} as UserContextContent);

export const useUser = () => useContext(UserContext);

const UserProvider: FC = props => {
  const { user, token } = useAuth();

  const isAuthenticated = !!token && !isEmpty(user);

  const isAdmin = isAuthenticated && user.roles.includes(Role.ADMIN);

  const updateProfile = async (payload: SignUpPayload) => {
    try {
      const requestConfig: AxiosRequestConfig = {
        method: HttpMethod.POST,
        url: RestApiUrl.UPDATE_PROFILE,
        headers: {
          authorization: `Bearer: ${token}`
        },
        data: payload
      };
      await sendRequest(requestConfig);
    } catch (err) {
      throw err.response.data;
    }
  };

  return (
    <UserContext.Provider
      value={{ isAuthenticated, isAdmin, user, updateProfile }}
      {...props}
    />
  );
};

export default UserProvider;
