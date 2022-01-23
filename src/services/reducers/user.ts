import {
  TUserActions,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  LOGIN_REQUEST,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_REQUEST,
  PASSWORD_RESET_FAILED,
  PASSWORD_RESET_CODE_REQUEST,
  PASSWORD_RESET_CODE_FAILED,
  PASSWORD_RESET_CODE_SUCCESS,
} from "../actions/user";

type TInitialUserState = {
  userEmail: string;
  userName: string;
  userPassword: string;

  registerRequest: boolean;
  registerFailed: boolean;
  registerSuccess: boolean;

  loginRequest: boolean;
  loginFailed: boolean;
  loginSuccess: boolean;

  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
  resetPasswordSuccess: boolean;

  resetPasswordCodeRequest: boolean,
  resetPasswordCodeFailed: boolean,
  resetPasswordCodeSuccess: boolean,
};

const initialUserState: TInitialUserState = {
  userEmail: "",
  userName: "",
  userPassword: "",

  registerRequest: false,
  registerFailed: false,
  registerSuccess: false,

  loginRequest: false,
  loginFailed: false,
  loginSuccess: false,

  resetPasswordRequest: false,
  resetPasswordFailed: false,
  resetPasswordSuccess: false,

  resetPasswordCodeRequest: false,
  resetPasswordCodeFailed: false,
  resetPasswordCodeSuccess: false,
};

export const userReducer = (
  state = initialUserState,
  action: TUserActions
): TInitialUserState => {
  switch (action.type) {
    case PASSWORD_RESET_CODE_REQUEST: {
      return { ...state, resetPasswordCodeRequest: true };
    }
    case PASSWORD_RESET_CODE_FAILED: {
      return { ...state, resetPasswordCodeFailed: true };
    }
    case PASSWORD_RESET_CODE_SUCCESS: {
      return { ...state, resetPasswordCodeSuccess: true };
    }
    case PASSWORD_RESET_REQUEST: {
      return { ...state, resetPasswordRequest: true };
    }
    case PASSWORD_RESET_FAILED: {
      return { ...state, resetPasswordFailed: true };
    }
    case PASSWORD_RESET_SUCCESS: {
      return { ...state, resetPasswordSuccess: true };
    }
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
      };
    }
    case LOGIN_REQUEST: {
      return { ...state, loginRequest: true };
    }
    case LOGIN_FAILED: {
      return { ...state, loginFailed: true, loginRequest: false };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginFailed: false,
        loginRequest: false,
        userEmail: action.user,
        userName: action.name,
      };
    }
    default: {
      return state;
    }
  }
};
