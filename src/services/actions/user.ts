import { AppDispatch, AppThunk } from "../store/store";
import { AUTH_URL } from "../../utils/constants";
import { setCookie, _checkResponse } from "../../utils/funcs";

export const REGISTER_REQUEST: "REGISTER_REQUEST" = "REGISTER_REQUEST";
export const REGISTER_FAILED: "REGISTER_FAILED" = "REGISTER_FAILED";
export const REGISTER_SUCCESS: "REGISTER_SUCCESS" = "REGISTER_SUCCESS";

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
  | IRegisterSuccess;

export const register: AppThunk =
  ({ email, password, name }) =>
  (dispatch: AppDispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
    });
    sendData(email, password, name)
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

const sendData = async (email: string, password: string, name: string) => {
  return await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password, name: name }),
  }).then(_checkResponse);
};
