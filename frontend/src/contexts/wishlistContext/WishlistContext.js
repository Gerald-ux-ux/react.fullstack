import { createContext, useEffect, useReducer, useState } from "react";
import { useAuthContext, useProductsContext } from "..";
import { wishListReducer, initialState } from "../../reducers/wishlistReducer";
import {
  deleteProductFromWishlistService,
  getWishlistItemsService,
  postAddProductToWishlistService,
} from "../../api/apiServices";
import { actionTypes } from "../../utils/actionType";
import { notify } from "../../utils/utils";

export const WishlistContext = createContext();

const WishlistContextProvider = ({ children }) => {
  const { token } = useAuthContext();
  const [state, dispatch] = useReducer(wishListReducer, initialState);
  const [disableWish, setDisableWish] = useState(false);
  const { updateInCartOrInWish } = useProductsContext();
  const [loadingWishlist, setLoadingWishList] = useState(false);

  useEffect(() => {
    if (token) {
      setLoadingWishList(true);
      (async () => {
        try {
          const wishRes = await getWishlistItemsService(token);
          if (wishRes.status === 200 || wishRes.status === 201) {
            dispatch({
              type: actionTypes.INITIALIZE_WISHLIST,
              payload: wishRes.data.wishlist,
            });
          }
        } catch (error) {
          console.log(error);
          notify(
            "error",
            error?.response?.data?.errors
              ? error?.response?.data?.errors[0]
              : error?.response?.data?.message
          );
        } finally {
          setLoadingWishList(false);
        }
      })();
    }
  }, [token]);

  const addProductToWishlist = async (product) => {
    setDisableWish(true);

    try {
      const response = await postAddProductToWishlistService(product, token);
      if (response.status === 200 || response.status === 201) {
        dispatch({
          type: actionTypes.ADD_PRODUCT_TO_WISHLIST,
          payload: [{ ...product, inWish: true }, ...state.wishlist],
        });
        updateInCartOrInWish(product._id, "inWish", true);
      }

      notify("success", "Added to wishlist");
    } catch (error) {
      console.log(error);
      notify(
        "error",
        error?.response?.data?.errors
          ? error?.response?.data?.errors[0]
          : "Some Error Occurred!!"
      );
    } finally {
      setDisableWish(false);
    }
  };

  const deleteProductFromWishlist = async (productId) => {
    setDisableWish(true);

    try {
      const response = await deleteProductFromWishlistService(productId, token);
      if (response.status === 200 || response.status === 201) {
        dispatch({
          type: actionTypes.DELETE_PRODUCTS_FROM_WISHLIST,
          payload: state.wishlist.filter(({ _id }) => _id !== productId),
        });
        updateInCartOrInWish(productId, "inWish", false);
        notify("warn", "Removed from wishlist");
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
      setDisableWish(false);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist: state.wishlist,
        disableWish,
        loadingWishlist,
        addProductToWishlist,
        deleteProductFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;
