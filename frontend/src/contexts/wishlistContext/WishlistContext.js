import { createContext, useEffect, useReducer, useState } from "react";
import { useAuthContext, useProductsContext } from "..";
import { wishListReducer, initialState } from "../../reducers/wishlistReducer";
import { getWishlistItemsService } from "../../api/apiServices";
import { actionTypes } from "../../utils/actionType";

export const WishListContext = createContext();

const WishListContextProvider = ({ childern }) => {
 
  const { token } = useAuthContext();
  const [state, dispatch] = useReducer(wishListReducer, initialState);
  const [disableWish, setDisableWish] = useState(false);
  const { updateInCartOrInWish } = useProductsContext();
  const [loadingWishList, setLoadingWishList] = useState(false);

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
            err?.response?.data?.errors
              ? err?.response?.data?.errors[0]
              : err?.response?.data?.message
          );
        } finally {
          setLoadingWishList(false);
        }
      })();
    }
  }, [token]);
};
