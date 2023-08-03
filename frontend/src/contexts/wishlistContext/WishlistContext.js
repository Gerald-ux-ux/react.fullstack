import { createContext, useEffect, useReducer, useState } from "react";
import { useAuthContext } from "..";
import { wishListReducer, initialState } from "../../reducers/wishlistReducer";

export const WishListContext = createContext();

const WishListContextProvider = ({ childern }) => {
  const { token } = useAuthContext();

  const [state, dispatch] = useReducer(wishListReducer, initialState);
  const { updateInCartOrInWish, clearCarted } = useProductsContext();
  const [isProductWishlisted, setIsProductWishlisted] = useState(false);
  const [loadingWishList, setLoadingWishList] = useState(false);

  useEffect(async () => {
     try {
        
     } catch (error) {

     }
  });
};
