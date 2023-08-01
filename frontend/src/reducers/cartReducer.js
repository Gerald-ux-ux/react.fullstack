import { actionTypes } from "../utils/actionTypes";

// Setting the cart initial state to be empty by passing an empty array
export const initialState = {
  cart: [],
};

// Reducer function that takes in state & action as params to perform action
export const cartReducer = (state, action) => {
    // We use switch cases to typically avoid using many if else statements
  switch (action.type) {
    case actionTypes.INITIALIZE_CART:
      return { ...state, cart: action.payload };

    case actionTypes.ADD_PRODUCT_TO_CART:
      return { ...state, cart: action.payload };

    case actionTypes.UPDATE_PRODUCT_QTY_IN_CART:
      return { ...state, cart: action.payload };

    case actionTypes.DELETE_PRODUCTS_FROM_CART:
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};

