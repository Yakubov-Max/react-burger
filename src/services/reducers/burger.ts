import {
  ADD_INGREDIENT,
  ADD_BUN,
  REMOVE_INGREDIENT,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  REMOVE_CURRENT_INGREDIENT,
  ADD_CURRENT_INGREDIENT,
  SEND_ORDER_FAILED,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_REQUEST,
  CLEAR_ORDER_MODAL,
  SORT_CONSTRUCTOR_LIST,
  CLEAR_CONSTRUCTOR_INGREDIENTS,
  TActions,
} from "../actions/burger";

import { TIngredient } from "../../utils/types";

type TInitialState = {
  constructorList: TIngredient[];
  bun: TIngredient | null;

  ingredients: TIngredient[];
  ingredeintsRequest: boolean;
  ingredientsRequestFailed: boolean;

  currentIngredient: TIngredient | null;

  sendOrderFailed: boolean;
  sendOrderRequest: boolean;
  currentOrder: TIngredient[] | null;
  orderNumber: number | null;
};

const initialState: TInitialState = {
  constructorList: [],
  bun: null,

  ingredients: [],
  ingredeintsRequest: false,
  ingredientsRequestFailed: false,

  currentIngredient: null,

  sendOrderFailed: false,
  sendOrderRequest: false,
  currentOrder: null,
  orderNumber: null,
};

export const burgerReducer = (
  state = initialState,
  action: TActions
): TInitialState => {
  switch (action.type) {
    case SORT_CONSTRUCTOR_LIST: {
      return { ...state, constructorList: action.sortedIngredients };
    }
    case SEND_ORDER_REQUEST: {
      return { ...state, sendOrderRequest: true };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        sendOrderRequest: false,
        sendOrderFailed: false,
        currentOrder: action.currentOrder,
        orderNumber: action.orderNumber,
      };
    }
    case SEND_ORDER_FAILED: {
      return { ...state, sendOrderFailed: true };
    }
    case CLEAR_ORDER_MODAL: {
      return { ...state, orderNumber: null };
    }
    case ADD_CURRENT_INGREDIENT: {
      return { ...state, currentIngredient: action.item };
    }
    case REMOVE_CURRENT_INGREDIENT: {
      return { ...state, currentIngredient: null };
    }
    case ADD_BUN: {
      return { ...state, bun: action.item };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        constructorList: [...state.constructorList, action.item],
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        constructorList: [...state.constructorList].filter(
          (_, i) => action.index !== i
        ),
      };
    }
    case GET_INGREDIENTS_REQUEST: {
      return { ...state, ingredeintsRequest: true };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequestFailed: true,
        ingredeintsRequest: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredeintsRequest: false,
        ingredients: action.ingredients,
      };
    }
    case CLEAR_CONSTRUCTOR_INGREDIENTS: {
      return {
        ...state,
        constructorList: [],
        bun: null,
      };
    }
    default: {
      return state;
    }
  }
};
