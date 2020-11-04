import {
  getItemFromLocalStorage,
  LocalStorageKey,
  removeItemFromLocalStorage,
  setItemInLocalStorage
} from '../../helper/localStorageUtils';
import { User } from '../../types/models';

interface State {
  token?: string | null;
  user?: User | null;
  loading?: boolean;
  error?: string;
}

export enum ActionType {
  SET_TOKEN_AND_USER = 'SET_TOKEN_AND_USER',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  RESET_STATE = 'RESET_STATE'
}

interface Action {
  type: ActionType;
  payload?: State;
}

const storedToken = getItemFromLocalStorage<string>(LocalStorageKey.TOKEN);
const storedUser = getItemFromLocalStorage<User>(LocalStorageKey.USER);

export const initialAuthState: State = {
  token: storedToken || null,
  user: storedUser || null,
  loading: false,
  error: ''
};

export const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.SET_TOKEN_AND_USER:
      const token = action?.payload?.token;
      const user = action?.payload?.user;

      setItemInLocalStorage(LocalStorageKey.TOKEN, token);
      setItemInLocalStorage(LocalStorageKey.USER, user);

      return {
        token,
        user,
        loading: false,
        error: ''
      };
    case ActionType.SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case ActionType.SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action?.payload?.error
      };
    case ActionType.RESET_STATE:
      removeItemFromLocalStorage(LocalStorageKey.TOKEN);
      removeItemFromLocalStorage(LocalStorageKey.USER);

      return {
        ...initialAuthState,
        token: null,
        user: null
      };
    default:
      return state;
  }
};
