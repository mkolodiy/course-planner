import {
  getItemFromLocalStorage,
  LocalStorageKey,
  removeItemFromLocalStorage,
  setItemInLocalStorage
} from '../../helper/localStorageUtils';
import { User } from '../../types/models';

export interface AuthState {
  token: string;
  user: User;
  loading: boolean;
}

export enum AuthActionType {
  SET_TOKEN = 'SET_TOKEN',
  SET_USER = 'SET_USER',
  START_LOADING = 'START_LOADING',
  RESET_STATE = 'RESET_STATE'
}

interface AuthAction {
  type: AuthActionType;
  payload?: unknown;
}

const storedToken = getItemFromLocalStorage<string>(LocalStorageKey.TOKEN);

export const initialAuthState: AuthState = {
  token: storedToken as string,
  user: {} as User,
  loading: false
};

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AuthActionType.SET_TOKEN:
      const token = action?.payload as string;

      setItemInLocalStorage(LocalStorageKey.TOKEN, token);

      return {
        ...state,
        token,
        loading: false
      };
    case AuthActionType.SET_USER:
      return {
        ...state,
        user: action?.payload as User,
        loading: false
      };
    case AuthActionType.START_LOADING:
      return {
        ...state,
        loading: true
      };
    case AuthActionType.RESET_STATE:
      removeItemFromLocalStorage(LocalStorageKey.TOKEN);

      return initialAuthState;
    default:
      return state;
  }
};
