import { createContext, useEffect, useReducer, useState } from "react";
import { initialState, cartReducer } from "../../reducers/cartReducer";
import {
  deleteProductFromCartService,
  getCartItemsService,
  postAddProductToCartService,
  postUpdateProductQtyCartService,
} from "../../api/apiServices";

import { actionTypes } from "../../utils/actionType";
import { useAuthContext, useProductsContext } from "..";
import { notify } from "../../utils/utils";
import { AuthContext } from "../authContext/AuthContext";

export const cartContext = createContext();

const CartContextProvider = ({ childern }) => {
  const { token } = useAuthContext();
  const { updateInCartOrInWish, clearCarted } = useProductsContext();

  const [loadingCart, setLoadingCart] = useState(false);
  const [disableCart, setDisableCart] = useState(false);

  const [state, dispatch] = useReducer(cartReducer, initialState);
};
