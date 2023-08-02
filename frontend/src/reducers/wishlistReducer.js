import { actionTypes } from "../utils/actionType";
export const initialState = {
  wishlist: [],
};

export const wishListReducer = (state, action) => {
  switch (action.type) {
    case addressTypes.INITIALIZE_WISHLIST:
      return { ...state, wishlist: action.payload };
    case actionTypes.ADD_PRODUCT_TO_WISHLIST:
      return { ...state, wishlist: action.payload };
    case addressTypes.DELETE_PRODUCTS_FROM_WISHLIS:
      return { ...state, wishlist: action.payload };
    default:
      return state;
  }
};
