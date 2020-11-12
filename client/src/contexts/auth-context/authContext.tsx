import React, { createContext, useReducer, FC, useContext } from 'react';
import {
  RestApiUrl,
  createRequestConfig,
  HttpMethod,
  sendRequest
} from '../../helper/axios';
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
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const { token, user } = state;

  const handleAuthRequest = async (
    payload: SignInPayload | SignUpPayload,
    url: RestApiUrl
  ) => {
    dispatch({ type: AuthActionType.SET_LOADING });

    try {
      const requestConfig = createRequestConfig(HttpMethod.POST, url, payload);
      const {
        data: { token, user }
      } = await sendRequest(requestConfig);

      dispatch({
        type: AuthActionType.SET_TOKEN_AND_USER,
        payload: { token, user }
      });
    } catch (err) {
      throw err.response.data;
    }
  };

  const signIn = (payload: SignInPayload) =>
    handleAuthRequest(payload, RestApiUrl.SIGN_IN);

  const signUp = async (payload: SignUpPayload) =>
    handleAuthRequest(payload, RestApiUrl.SIGN_UP);

  const signOut = () => dispatch({ type: AuthActionType.RESET_STATE });

  const isAuthenticated = () => {
    // return !!token && !!user;
    return !!token;
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signUp, signOut, isAuthenticated, ...state }}
      {...props}
    />
  );
};

export default AuthProvider;
