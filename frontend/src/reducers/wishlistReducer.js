import { actionTypes } from "../utils/actionType";
export const initialState = {
  wishlist: [],
};

export const wishListReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INITIALIZE_WISHLIST:
      return { ...state, wishlist: action.payload };
    case actionTypes.ADD_PRODUCT_TO_WISHLIST:
      return { ...state, wishlist: action.payload };
    case actionTypes.DELETE_PRODUCTS_FROM_WISHLIST:
      return { ...state, wishlist: action.payload };
    default:
      return state;
  }
};
