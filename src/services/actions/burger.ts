import { AppDispatch, AppThunk } from "../store/store";
import { API_URL } from "../../utils/constants";
import { _checkResponse } from "../../utils/funcs";
import { TIngredient } from "../../utils/types";

export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT: "REMOVE_INGREDIENT" = "REMOVE_INGREDIENT";

export const ADD_BUN: "ADD_BUN" = "ADD_BUN";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
  "GET_INGREDIENTS_SUCCESS";

export const ADD_CURRENT_INGREDIENT: "ADD_CURRENT_INGREDIENT" =
  "ADD_CURRENT_INGREDIENT";
export const REMOVE_CURRENT_INGREDIENT: "REMOVE_CURRENT_INGREDIENT" =
  "REMOVE_CURRENT_INGREDIENT";

export const SEND_ORDER_REQUEST: "SEND_ORDER_REQUEST" = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCESS: "SEND_ORDER_SUCCESS" = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_FAILED: "SEND_ORDER_FAILED" = "SEND_ORDER_FAILED";

export const CLEAR_ORDER_MODAL: "CLEAR_ORDER_MODAL" = "CLEAR_ORDER_MODAL";

export const SORT_CONSTRUCTOR_LIST: "SORT_CONSTRUCTOR_LIST" =
  "SORT_CONSTRUCTOR_LIST";

export const CLEAR_CONSTRUCTOR_INGREDIENTS: "CLEAR_CONSTRUCTOR_INGREDIENTS" =
  "CLEAR_CONSTRUCTOR_INGREDIENTS";

export interface IAddIngredient {
  item: TIngredient;
  readonly type: typeof ADD_INGREDIENT;
}
export interface IRemoveIngredient {
  index: number;
  readonly type: typeof REMOVE_INGREDIENT;
}
export interface IAddBun {
  item: TIngredient | null;
  readonly type: typeof ADD_BUN;
}
export interface IGetIngrediensRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IGetIngredientSuccess {
  ingredients: TIngredient[];
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
}
export interface IAddCurrentIngredient {
  item: TIngredient | null;
  readonly type: typeof ADD_CURRENT_INGREDIENT;
}
export interface IRemoveCurrentIngredient {
  readonly type: typeof REMOVE_CURRENT_INGREDIENT;
}
export interface ISendOrderRequest {
  readonly type: typeof SEND_ORDER_REQUEST;
}
export interface ISendOrderSuccess {
  currentOrder: TIngredient[] | null;
  orderNumber: number | null;
  readonly type: typeof SEND_ORDER_SUCCESS;
}
export interface ISendOrderFailed {
  readonly type: typeof SEND_ORDER_FAILED;
}
export interface IClearOrderModal {
  readonly type: typeof CLEAR_ORDER_MODAL;
}
export interface ISortConstructorList {
  sortedIngredients: TIngredient[];
  readonly type: typeof SORT_CONSTRUCTOR_LIST;
}
export interface IClearConstructorIngredients {
  readonly type: typeof CLEAR_CONSTRUCTOR_INGREDIENTS;
}

export type TActions =
  | IAddBun
  | IAddCurrentIngredient
  | IAddIngredient
  | IClearOrderModal
  | IGetIngrediensRequest
  | IGetIngredientSuccess
  | IGetIngredientsFailed
  | IRemoveIngredient
  | ISortConstructorList
  | ISendOrderFailed
  | ISendOrderRequest
  | ISendOrderSuccess
  | IRemoveCurrentIngredient
  | IClearConstructorIngredients;

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });
  downloadData()
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      }
    })
    .catch((error) => console.log(`Ошибка: ${error}`));
};

export const sendOrder: AppThunk =
  (ingredientsId: string[]) => (dispatch: AppDispatch) => {
    dispatch({
      type: SEND_ORDER_REQUEST,
    });
    sendData(ingredientsId)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SEND_ORDER_SUCCESS,
            currentOrder: res.name,
            orderNumber: res.order.number,
          });
        } else {
          dispatch({
            type: SEND_ORDER_FAILED,
          });
        }
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  };

const sendData = async (ingredientsId: string[]) => {
  return await fetch(`${API_URL}/orders`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients: ingredientsId }),
  }).then(_checkResponse);
};

const downloadData = async () => {
  return await fetch(`${API_URL}/ingredients`).then(_checkResponse);
};
