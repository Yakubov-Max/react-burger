import { INGREDIENTS_URL } from "../../utils/constants"

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
    });
  };
}

export function sendOrder(ingredientsId) {
  return function(dispatch) {
    dispatch({
      type: SEND_ORDER_REQUEST
    });
    sendData(ingredientsId).then(res => {
      console.log(res)
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
    });
  };
}

const sendData = async (ingredientsId) => {
  const res = await fetch(`https://norma.nomoreparties.space/api/orders`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredients: ingredientsId })
  })

  if (res.ok) {
    const data = await res.json()
    return data
  } else {
    throw new Error("error")
  }
}


const downloadData = async () => {
  try {
    const res = await fetch(INGREDIENTS_URL)
    const dataObj = await res.json()
    return dataObj
  } catch (err) {
    console.log(err)
  }
}