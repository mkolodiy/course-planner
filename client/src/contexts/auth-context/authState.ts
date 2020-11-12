import {
  getItemFromLocalStorage,
  LocalStorageKey,
  removeItemFromLocalStorage,
  setItemInLocalStorage
} from '../../helper/localStorageUtils';
import { User, Error } from '../../types/models';

export interface AuthState {
  token?: string | null;
  user?: User | null;
  loading?: boolean;
}

export enum AuthActionType {
  SET_TOKEN_AND_USER = 'SET_TOKEN_AND_USER',
  SET_LOADING = 'SET_LOADING',
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
  loading: false
};

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionType.SET_TOKEN_AND_USER:
      const token = action?.payload?.token;
      const user = action?.payload?.user;

      setItemInLocalStorage(LocalStorageKey.TOKEN, token);

      return {
        token,
        user,
        loading: false
      };
    case AuthActionType.SET_LOADING:
      return {
        ...state,
        loading: true
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
