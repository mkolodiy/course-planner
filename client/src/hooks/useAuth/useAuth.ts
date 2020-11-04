import { useReducer } from 'react';
import {
  sendRequest,
  createRequestConfig,
  RestApiUrl,
  HttpMethod
} from '../../helper/axios';
import { SignInPayload, SignUpPayload } from '../../types/payloads';
import { ActionType, authReducer, initialAuthState } from './authState';

const useAuth = () => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const handleAuthRequest = async <T>(payload: T, url: RestApiUrl) => {
    dispatch({ type: ActionType.SET_LOADING });

    try {
      const requestConfig = createRequestConfig(
        HttpMethod.POST,
        RestApiUrl.SIGN_IN,
        payload
      );
      const {
        data: { token, user }
      } = await sendRequest(requestConfig);

      dispatch({
        type: ActionType.SET_TOKEN_AND_USER,
        payload: { token, user }
      });
    } catch (err) {
      dispatch({ type: ActionType.SET_ERROR, payload: { error: err.message } });
    }
  };

  const signIn = (payload: SignUpPayload) =>
    handleAuthRequest(payload, RestApiUrl.SIGN_IN);

  const signUp = async (payload: SignUpPayload) =>
    handleAuthRequest(payload, RestApiUrl.SIGN_UP);

  const signOut = () => dispatch({ type: ActionType.RESET_STATE });

  return { signIn, signUp, signOut };
};

export default useAuth;
