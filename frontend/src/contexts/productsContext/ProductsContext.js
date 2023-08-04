import { createContext, useEffect, useReducer, useState } from "react";
import { initialState, productReducer } from "../../reducers/productReducer";
import {
  getAllCategoriesService,
  getAllProductsService,
} from "../../api/apiServices";
import { actionTypes, addressTypes, filterTypes } from "../../utils/actionType";
import { useAuthContext } from "..";

export const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [currentAddress, setCurrentAddress] = useState(state.addressList[0]);
  const [isOrderPlaced, setisOrderPlaced] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const productsRes = await getAllProductsService();
        if (productsRes.status === 200) {
          dispatch({
            type: actionTypes.INITIALIZE_PRODUCTS,
            payload: productsRes.data.products,
          });
        }

        const categoryRes = await getAllCategoriesService();

        if (categoryRes.status === 200) {
          dispatch({
            type: actionTypes.INITIALIZE_CATEGORIES,
            payload: categoryRes.data.categories,
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const getProductById = (productId) => {
    return state.allProducts.find((product) => product._id === productId);
  };

  const updateInCartOrInWish = (type, productId, value) => {
    if (productId)
      dispatch({
        type: actionTypes.UPDATE_PRODUCTS,
        payload: state.allProducts.map((item) => {
          return item._id === productId ? { ...state, [type]: value } : item;
        }),
      });
    else {
      dispatch({
        type: actionTypes.UPDATE_PRODUCTS,
        payload: state.allproducts.map((item) => {
          return {
            ...item,
            inCart: false,
            qty: 0,
          };
        }),
      });
    }
  };

  const applyFilters = (filterType, filterValue) => {
    dispatch({
      type: filterTypes.FILTERS,
      payload: { filterType, filterValue },
    });
  };

  const clearFilters = (filterTypes) => {
    dispatch({
      type: filterTypes.CLEAR_FILTERS,
      payload: [],
    });
  };

  const trendingProducts = state.allProducts.filter(
    (product) => product.trending
  );

  const addAddress = (newAddress) => {
    dispatch({
      type: addressTypes.ADD_ADDRESS,
      payload: [newAddress, { ...state.addressList }],
    });
  };

  const updateAddress = (updatedAddress, addressId) => {
    dispatch({
      type: addressTypes.UPDATE_ADDRESS,
      payload: state.addressList.map((item) => {
        return item._id === addressId ? updatedAddress : item;
      }),
    });
    if (currentAddress.id === addressId) {
      setCurrentAddress(updatedAddress);
    }
  };

  const deleteAddress = (addressId) => {
    dispatch({
      type: addressTypes.DELETE_ADDRESS,
      payload: state.addressList.filter(({ id }) => id !== addressId),
    });
    if (currentAddress.id !== addressId) {
      setCurrentAddress({});
    }
  };

  const isInCart = (productId) => {
    state.allProducts.find((item) => {
      return item._id === productId && item.inCart;
    });
  };

  const isInWish = (productId) => {
    state.allProducts.find((item) => {
      return item._id === productId && item.inWish;
    });
  };

  return (
    <ProductsContext.Provider
      value={{
        allProducts: state.allProducts,
        wishlist: state.wishlist,
        filters: state.filters,
        maxRange: state.maxRange,
        categoryList: state.categoryList,
        addressList: state.addressList,
        isInCart,
        isInWish,
        isOrderPlaced,
        currentAddress,
        loading,
        trendingProducts,
        updateInCartOrInWish,
        getProductById,
        applyFilters,
        clearFilters,
        addAddress,
        updateAddress,
        deleteAddress,
        setCurrentAddress,
        setisOrderPlaced,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
