import { API_URL } from "../../utils/constants"
import { _checkResponse } from "../../utils/funcs"

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT"

export const ADD_BUN = "ADD_BUN"

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'

export const ADD_CURRENT_INGREDIENT = "ADD_CURRENT_INGREDIENT"
export const REMOVE_CURRENT_INGREDIENT = "REMOVE_CURRENT_INGREDIENT"

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST' 
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS'
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED'

export const CLEAR_ORDER_MODAL = 'CLEAR_ORDER_MODAL'

export const SORT_CONSTRUCTOR_LIST = 'SORT_CONSTRUCTOR_LIST'

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    downloadData().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      }
    }).catch(error => console.log(`Ошибка: ${error}`));
  };
}

export function sendOrder(ingredientsId) {
  return function(dispatch) {
    dispatch({
      type: SEND_ORDER_REQUEST
    });
    sendData(ingredientsId).then(res => {
      if (res && res.success) {
        dispatch({
          type: SEND_ORDER_SUCCESS,
          currentOrder: res.name,
          orderNumber: res.order.number
        });
      } else {
        dispatch({
          type: SEND_ORDER_FAILED
        });
      }
    }).catch(error => console.log(`Ошибка: ${error}`));
  };
}

const sendData = async (ingredientsId) => {
  return await fetch(`${API_URL}/orders`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredients: ingredientsId })
  }).then(_checkResponse)
}


const downloadData = async () => {
  return await fetch(`${API_URL}/ingredients`).then(_checkResponse)
}