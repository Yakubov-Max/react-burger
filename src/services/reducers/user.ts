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
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_FALIED,
  REFRESH_TOKEN_SUCCESS,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
  PATCH_USER_DATA_REQUEST,
  PATCH_USER_DATA_FAILED,
  PATCH_USER_DATA_SUCCESS,
} from "../actions/user";

type TInitialUserState = {
  userEmail: string;
  userName: string;

  registerRequest: boolean;
  registerFailed: boolean;
  registerSuccess: boolean;

  loginRequest: boolean;
  loginFailed: boolean;
  loginSuccess: boolean;

  logoutRequest: boolean;
  logoutFailed: boolean;
  logoutSuccess: boolean;

  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
  resetPasswordSuccess: boolean;

  resetPasswordCodeRequest: boolean;
  resetPasswordCodeFailed: boolean;
  resetPasswordCodeSuccess: boolean;

  refreshTokenRequest: boolean;
  refreshTokenFailed: boolean;
  refreshTokenSuccess: boolean;

  getUserDataRequest: boolean;
  getUserDataFailed: boolean;
  getUserDataSuccess: boolean;

  patchUserDataRequest: boolean;
  patchUserDataFailed: boolean;
  patchUserDataSuccess: boolean;
};

const initialUserState: TInitialUserState = {
  userEmail: "",
  userName: "",

  registerRequest: false,
  registerFailed: false,
  registerSuccess: false,

  loginRequest: false,
  loginFailed: false,
  loginSuccess: false,

  logoutRequest: false,
  logoutFailed: false,
  logoutSuccess: false,

  resetPasswordRequest: false,
  resetPasswordFailed: false,
  resetPasswordSuccess: false,

  resetPasswordCodeRequest: false,
  resetPasswordCodeFailed: false,
  resetPasswordCodeSuccess: false,

  refreshTokenRequest: false,
  refreshTokenFailed: false,
  refreshTokenSuccess: false,

  getUserDataRequest: false,
  getUserDataFailed: false,
  getUserDataSuccess: false,

  patchUserDataRequest: false,
  patchUserDataFailed: false,
  patchUserDataSuccess: false,
};

export const userReducer = (
  state = initialUserState,
  action: TUserActions
): TInitialUserState => {
  switch (action.type) {
    case PATCH_USER_DATA_REQUEST: {
      return { ...state, patchUserDataRequest: true };
    }
    case PATCH_USER_DATA_FAILED: {
      return { ...state, patchUserDataFailed: true, patchUserDataRequest: false };
    }
    case PATCH_USER_DATA_SUCCESS: {
      return {
        ...state,
        patchUserDataRequest: false,
        patchUserDataFailed: false,
        patchUserDataSuccess: true,
        userEmail: action.email,
        userName: action.name,
      };
    }
    case LOGOUT_REQUEST: {
      return { ...state, logoutRequest: true };
    }
    case LOGOUT_FAILED: {
      return { ...state, logoutFailed: true, logoutRequest: false };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutSuccess: true,
        logoutRequest: false,
        logoutFailed: false,
        userName: '',
        userEmail: ''
      };
    }
    case GET_USER_DATA_REQUEST: {
      return { ...state, getUserDataRequest: true };
    }
    case GET_USER_DATA_FAILED: {
      return { ...state, getUserDataFailed: true, getUserDataRequest: false };
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        getUserDataRequest: false,
        getUserDataFailed: false,
        getUserDataSuccess: true,
        userEmail: action.email,
        userName: action.name,
      };
    }
    case REFRESH_TOKEN_REQUEST: {
      return { ...state, refreshTokenRequest: true };
    }
    case REFRESH_TOKEN_FALIED: {
      return { ...state, refreshTokenFailed: true, refreshTokenRequest: false };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        refreshTokenSuccess: true,
        refreshTokenRequest: false,
        refreshTokenFailed: false,
      };
    }
    case PASSWORD_RESET_CODE_REQUEST: {
      return { ...state, resetPasswordCodeRequest: true };
    }
    case PASSWORD_RESET_CODE_FAILED: {
      return {
        ...state,
        resetPasswordCodeFailed: true,
        resetPasswordCodeRequest: false,
      };
    }
    case PASSWORD_RESET_CODE_SUCCESS: {
      return {
        ...state,
        resetPasswordCodeSuccess: true,
        resetPasswordCodeFailed: false,
        resetPasswordCodeRequest: false,
      };
    }
    case PASSWORD_RESET_REQUEST: {
      return { ...state, resetPasswordRequest: true };
    }
    case PASSWORD_RESET_FAILED: {
      return {
        ...state,
        resetPasswordFailed: true,
        resetPasswordRequest: false,
      };
    }
    case PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        resetPasswordSuccess: true,
        resetPasswordFailed: false,
        resetPasswordRequest: false,
      };
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
        registerSuccess: true,
        userEmail: action.email,
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
        loginSuccess: true,
        userEmail: action.email,
        userName: action.name,
      };
    }
    default: {
      return state;
    }
  }
};
