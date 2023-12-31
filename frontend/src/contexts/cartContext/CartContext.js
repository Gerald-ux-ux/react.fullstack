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

export const CartContext = createContext();

const CartContextProvider = ({ childern }) => {
  const { token } = useAuthContext();
  const { updateInCartOrInWish, clearCarted } = useProductsContext();
  const [loadingCart, setLoadingCart] = useState(false);
  const [disableCart, setDisableCart] = useState(false);
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // useEffect(() => {
  //   if (token) {
  //     setLoadingCart(true);
  //     (async () => {
  //       try {
  //         const cartRes = await getCartItemsService(token);
  //         if (cartRes.status === 200) {
  //           dispatch({
  //             type: actionTypes.INITIALIZE_CART,
  //             payload: cartRes.data.cart,
  //           });
  //         }
  //       } catch (err) {
  //         console.log(err);
  //         console.log(err.response.data);
  //         notify(
  //           "error",
  //           err?.response?.data?.errors
  //             ? err?.response?.data?.errors[0]
  //             : err?.response?.data?.message
  //         );
  //       } finally {
  //         setLoadingCart(false);
  //       }
  //     })();
  //   }
  // }, [token]);

  const addProductToCart = async (product) => {
    setDisableCart(true);
    try {
      const response = await postAddProductToCartService(
        {
          ...product,
          qty: 1,
        },
        token
      );

      if (response.status === 200 || response.status === 201) {
        dispatch({
          type: actionTypes.ADD_PRODUCT,
          payload: [{ ...product, qty: 1 }, ...state.cart],
        });
        updateInCartOrInWish(product._id, "inCart", true);
        notify("success", "Product added to cart successfully");
      }
    } catch (error) {
      console.log(error);
      notify(
        "error",
        error?.response?.data?.errors
          ? error?.response?.data?.errors[0]
          : "Some Error Occurred!!"
      );
    } finally {
      setDisableCart(false);
    }
  };

  const updateProductQtyInCart = async (productId, type) => {
    setDisableCart(true);
    try {
      const response = await postUpdateProductQtyCartService(
        productId,
        type,
        token
      );
      console.log({ response });
      if (response.status === 200 || response.status === 201) {
        if (type === "increment") {
          dispatch({
            type: actionTypes.UPDATE_PRODUCT_QTY_IN_CART,
            payload: state.cart.map((product) =>
              product._id === productId
                ? { ...product, qty: product.qty + 1 }
                : product
            ),
          });
        } else {
          dispatch({
            type: actionTypes.UPDATE_PRODUCT_QTY_IN_CART,
            payload: state.cart.map((product) =>
              product._id === productId
                ? { ...product, qty: product.qty - 1 }
                : product
            ),
          });
        }
      }
    } catch (error) {
      console.log(error);
      notify(
        "error",
        error?.response?.data?.errors
          ? error?.response?.data?.errors[0]
          : "Some Error Occurred!!"
      );
    } finally {
      setDisableCart(false);
    }
  };

  const deleteProductFromCart = async (productId) => {
    setDisableCart(true);
    try {
      const response = await deleteProductFromCartService(productId, token);
      if (response.status === 200 || response.status === 201) {
        dispatch({
          type: actionTypes.DELETE_PRODUCTS_FROM_CART,
          payload: response.data.cart,
        });
        updateInCartOrInWish(productId, "inCart", false);
        notify("notify", "Products removed from Cart");
      }
    } catch (error) {
      console.log(error);
      notify(
        "error",
        error?.response?.data?.errors
          ? error?.response?.data?.errors[0]
          : "Some Error Occurred!!"
      );
    } finally {
      setDisableCart(false);
    }
  };

  const clearCart = () => {
    state.cart.map(async ({ _id }) => {
      try {
        const response = await deleteProductFromCartService(_id, token);
        if (response.status === 200 || response.status === 201) {
          dispatch({
            type: actionTypes.DELETE_PRODUCTS_FROM_CART,
            payload: [],
          });
        }
      } catch (error) {
        console.log(error);
        notify(
          "error",
          error?.response?.data?.errors
            ? error?.response?.data?.errors[0]
            : "Some Error Occurred!!"
        );
      }
    });
    updateInCartOrInWish();
  };

  const { totalPriceOfCartProducts, actualPriceOfCart } = state.cart.reduce(
    (accumulator, { qty, price, newPrice }) => ({
      totalPriceOfCartProducts:
        accumulator.totalPriceOfCartProducts + qty * price,
      actualPriceOfCartProducts:
        accumulator.actualPriceOfCartProducts + qty * price,
    }),
    { totalPriceOfCartProducts: 0, actualPriceOfCartProducts: 0 }
  );

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        disableCart,
        loadingCart,
        addProductToCart,
        updateProductQtyInCart,
        deleteProductFromCart,
        totalPriceOfCartProducts,
        actualPriceOfCart,
        clearCart,
      }}
    >
      {childern}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
