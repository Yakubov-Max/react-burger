import {
  TUserActions,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
} from "../actions/user";

type TInitialUserState = {
  userEmail: string;
  userName: string;
  userPassword: string;

  registerRequest: boolean;
  registerFailed: boolean;
  registerSuccess: boolean;

  loggedIn: boolean;
};

const initialUserState: TInitialUserState = {
  userEmail: "",
  userName: "",
  userPassword: "",

  registerRequest: false,
  registerFailed: false,
  registerSuccess: false,

  loggedIn: false
};

export const userReducer = (
  state = initialUserState,
  action: TUserActions
): TInitialUserState => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return { ...state, registerRequest: true };
    }
    case REGISTER_FAILED: {
      return { ...state, registerFailed: true, registerRequest: false };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerFailed: false,
        registerRequest: false,
        userEmail: action.user,
        userName: action.name,
        loggedIn: true
      };
    }
    default: {
      return state;
    }
  }
};
