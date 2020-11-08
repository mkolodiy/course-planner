import {
  getItemFromLocalStorage,
  LocalStorageKey,
  removeItemFromLocalStorage,
  setItemInLocalStorage
} from '../../helper/localStorageUtils';
import { User } from '../../types/models';

export interface AuthState {
  token?: string | null;
  user?: User | null;
  loading?: boolean;
  error?: string;
}

export enum AuthActionType {
  SET_TOKEN_AND_USER = 'SET_TOKEN_AND_USER',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  RESET_STATE = 'RESET_STATE'
}

interface AuthAction {
  type: AuthActionType;
  payload?: AuthState;
}

const storedToken = getItemFromLocalStorage<string>(LocalStorageKey.TOKEN);

export const initialAuthState: AuthState = {
  token: storedToken || null,
  user: null,
  loading: false,
  error: ''
};

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionType.SET_TOKEN_AND_USER:
      const token = action?.payload?.token;
      const user = action?.payload?.user;

      setItemInLocalStorage(LocalStorageKey.TOKEN, token);

      return {
        token,
        user,
        loading: false,
        error: ''
      };
    case AuthActionType.SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case AuthActionType.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action?.payload?.error
      };
    case AuthActionType.RESET_STATE:
      removeItemFromLocalStorage(LocalStorageKey.TOKEN);

      return {
        ...initialAuthState,
        token: null,
        user: null
      };
    default:
      return state;
  }
};
