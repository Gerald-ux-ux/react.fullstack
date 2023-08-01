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
