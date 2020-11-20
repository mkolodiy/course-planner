import { AxiosRequestConfig } from 'axios';
import React, { createContext, useReducer, FC, useContext } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RestApiUrl, HttpMethod, sendRequest } from '../../helper/axios';
import { SignInPayload, SignUpPayload } from '../../types/payloads';
import {
  authReducer,
  initialAuthState,
  AuthActionType,
  AuthState
} from './authState';

type AuthContextContent = AuthState & {
  signIn: (payload: SignInPayload) => Promise<void>;
  signUp: (payload: SignUpPayload) => Promise<void>;
  signOut: () => void;
  isAuthenticated: () => boolean;
};

const AuthContext = createContext<AuthContextContent>({} as AuthContextContent);

export const useAuth = () => useContext(AuthContext);

const AuthProvider: FC = props => {
  const history = useHistory();
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const { token, user, loading } = state;

  useEffect(() => {
    (async () => {
      if (!!token && !user && !loading) {
        dispatch({ type: AuthActionType.SET_LOADING });

        const requestConfig: AxiosRequestConfig = {
          method: HttpMethod.GET,
          url: RestApiUrl.GET_PROFILE,
          headers: {
            authorization: `Bearer: ${token}`
          }
        };

        try {
          const {
            data: { user }
          } = await sendRequest(requestConfig);
          dispatch({ type: AuthActionType.SET_USER, payload: { user } });
          history.push('/');
        } catch (err) {
          dispatch({ type: AuthActionType.RESET_STATE });
          history.push('/signin');
        }
      }
    })();
  });

  if (!!token && !user && loading) {
    return <div>Loading...</div>;
  }

  const handleAuthRequest = async (
    payload: SignInPayload | SignUpPayload,
    url: RestApiUrl
  ) => {
    dispatch({ type: AuthActionType.SET_LOADING });

    try {
      const requestConfig: AxiosRequestConfig = {
        method: HttpMethod.POST,
        url,
        data: payload
      };
      const {
        data: { token, user }
      } = await sendRequest(requestConfig);

      dispatch({
        type: AuthActionType.SET_TOKEN_AND_USER,
        payload: { token, user }
      });
    } catch (err) {
      dispatch({ type: AuthActionType.RESET_STATE });
      throw err.response.data;
    }
  };

  const signIn = (payload: SignInPayload) =>
    handleAuthRequest(payload, RestApiUrl.SIGN_IN);

  const signUp = async (payload: SignUpPayload) =>
    handleAuthRequest(payload, RestApiUrl.SIGN_UP);

  const signOut = () => dispatch({ type: AuthActionType.RESET_STATE });

  const isAuthenticated = () => {
    return !!token && !!user;
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signUp, signOut, isAuthenticated, ...state }}
      {...props}
    />
  );
};

export default AuthProvider;
