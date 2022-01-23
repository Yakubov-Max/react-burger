import { AppDispatch, AppThunk } from "../store/store";
import { API_URL, AUTH_URL } from "../../utils/constants";
import { setCookie, _checkResponse } from "../../utils/funcs";

export const REGISTER_REQUEST: "REGISTER_REQUEST" = "REGISTER_REQUEST";
export const REGISTER_FAILED: "REGISTER_FAILED" = "REGISTER_FAILED";
export const REGISTER_SUCCESS: "REGISTER_SUCCESS" = "REGISTER_SUCCESS";

export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";

export const PASSWORD_RESET_REQUEST: "PASSWORD_RESET_REQUEST" =
  "PASSWORD_RESET_REQUEST";
export const PASSWORD_RESET_FAILED: "PASSWORD_RESET_FAILED" =
  "PASSWORD_RESET_FAILED";
export const PASSWORD_RESET_SUCCESS: "PASSWORD_RESET_SUCCESS" =
  "PASSWORD_RESET_SUCCESS";

export const PASSWORD_RESET_CODE_REQUEST: "PASSWORD_RESET_CODE_REQUEST" =
  "PASSWORD_RESET_CODE_REQUEST";
export const PASSWORD_RESET_CODE_FAILED: "PASSWORD_RESET_CODE_FAILED" =
  "PASSWORD_RESET_CODE_FAILED";
export const PASSWORD_RESET_CODE_SUCCESS: "PASSWORD_RESET_CODE_SUCCESS" =
  "PASSWORD_RESET_CODE_SUCCESS";

export const REFRESH_TOKEN_REQUEST: "REFRESH_TOKEN_REQUEST" =
  "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_FALIED: "REFRESH_TOKEN_FALIED" =
  "REFRESH_TOKEN_FALIED";
export const REFRESH_TOKEN_SUCCESS: "REFRESH_TOKEN_SUCCESS" =
  "REFRESH_TOKEN_SUCCESS";

export interface IRefreshTokenRequest {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}

export interface IRefreshTokenFailed {
  readonly type: typeof REFRESH_TOKEN_FALIED;
}

export interface IRefreshTokenSuccess {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
}

export interface IResetPasswordCodeRequest {
  readonly type: typeof PASSWORD_RESET_CODE_REQUEST;
}

export interface IResetPasswordCodeFailed {
  readonly type: typeof PASSWORD_RESET_CODE_FAILED;
}

export interface IResetPasswordCodeSuccess {
  readonly type: typeof PASSWORD_RESET_CODE_SUCCESS;
}

export interface IResetPasswordRequest {
  readonly type: typeof PASSWORD_RESET_REQUEST;
}

export interface IResetPasswordFailed {
  readonly type: typeof PASSWORD_RESET_FAILED;
}

export interface IResetPasswordSuccess {
  readonly type: typeof PASSWORD_RESET_SUCCESS;
}

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}

export interface ILoginSuccess {
  name: string;
  user: string;
  readonly type: typeof LOGIN_SUCCESS;
}

export interface IRegisterRequest {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterFailed {
  readonly type: typeof REGISTER_FAILED;
}

export interface IRegisterSuccess {
  name: string;
  user: string;
  readonly type: typeof REGISTER_SUCCESS;
}

export type TUserActions =
  | IRegisterRequest
  | IRegisterFailed
  | IRegisterSuccess
  | ILoginRequest
  | ILoginFailed
  | ILoginSuccess
  | IResetPasswordRequest
  | IResetPasswordFailed
  | IResetPasswordSuccess
  | IResetPasswordCodeRequest
  | IResetPasswordCodeFailed
  | IResetPasswordCodeSuccess
  | IRefreshTokenRequest
  | IRefreshTokenFailed
  | IRefreshTokenSuccess;

export const refreshAccessToken: AppThunk =
  (refreshToken) => (dispatch: AppDispatch) => {
    dispatch({
      type: REFRESH_TOKEN_REQUEST,
    });
    sendRefreshToken(refreshToken).then((res) => {
      if (res && res.success) {
        dispatch({
          type: REFRESH_TOKEN_SUCCESS,
        });
        
        let accessToken;

        if (res.accessToken.indexOf("Bearer") === 0) {
          accessToken = res.accessToken.split("Bearer ")[1];
        }

        let refreshToken = res.refreshToken;
        if (accessToken && refreshToken) {
          setCookie("accessToken", accessToken, { expires: 1200 });
          setCookie("refreshToken", refreshToken);
        }
      } else {
        dispatch({
          type: REFRESH_TOKEN_FALIED,
        });
      }
    });
  };

const sendRefreshToken = async (refreshToken: string) => {
  return await fetch(`${AUTH_URL}/token`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  }).then(_checkResponse);
};

export const resetPasswordCode: AppThunk =
  ({ code, password }) =>
  (dispatch: AppDispatch) => {
    dispatch({
      type: PASSWORD_RESET_CODE_REQUEST,
    });
    sendResetPasswordCode(code, password).then((res) => {
      if (res && res.success) {
        dispatch({
          type: PASSWORD_RESET_CODE_SUCCESS,
        });
      } else {
        dispatch({
          type: PASSWORD_RESET_CODE_FAILED,
        });
      }
    });
  };

const sendResetPasswordCode = async (code: string, password: string) => {
  return await fetch(`${API_URL}/password-reset/reset`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, token: code }),
  }).then(_checkResponse);
};

export const resetPassword: AppThunk =
  ({ email }) =>
  (dispatch: AppDispatch) => {
    dispatch({
      type: PASSWORD_RESET_REQUEST,
    });
    sendPasswordResetData(email).then((res) => {
      if (res && res.success) {
        dispatch({
          type: PASSWORD_RESET_SUCCESS,
        });
      } else {
        dispatch({
          type: PASSWORD_RESET_FAILED,
        });
      }
    });
  };

const sendPasswordResetData = async (email: string) => {
  return await fetch(`${API_URL}/password-reset`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  }).then(_checkResponse);
};

export const login: AppThunk =
  ({ email, password }) =>
  (dispatch: AppDispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    sendLoginData(email, password).then((res) => {
      if (res && res.success) {
        dispatch({
          type: LOGIN_SUCCESS,
          user: res.user.email,
          name: res.user.name,
        });

        let accessToken;

        if (res.accessToken.indexOf("Bearer") === 0) {
          accessToken = res.accessToken.split("Bearer ")[1];
        }

        let refreshToken = res.refreshToken;
        if (accessToken && refreshToken) {
          setCookie("accessToken", accessToken, { expires: 1200 });
          setCookie("refreshToken", refreshToken);
        }
      } else {
        dispatch({
          type: LOGIN_FAILED,
        });
      }
    });
  };

const sendLoginData = async (email: string, password: string) => {
  return await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  }).then(_checkResponse);
};

export const register: AppThunk =
  ({ email, password, name }) =>
  (dispatch: AppDispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
    });
    sendRegisterData(email, password, name)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REGISTER_SUCCESS,
            user: res.user.email,
            name: res.user.name,
            loggedIn: true,
          });

          let accessToken;

          if (res.accessToken.indexOf("Bearer") === 0) {
            accessToken = res.accessToken.split("Bearer ")[1];
          }

          let refreshToken = res.refreshToken;
          if (accessToken && refreshToken) {
            setCookie("accessToken", accessToken, { expires: 300 });
            setCookie("refreshToken", refreshToken);
          }
        } else {
          dispatch({
            type: REGISTER_FAILED,
          });
        }
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  };

const sendRegisterData = async (
  email: string,
  password: string,
  name: string
) => {
  return await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password, name: name }),
  }).then(_checkResponse);
};
