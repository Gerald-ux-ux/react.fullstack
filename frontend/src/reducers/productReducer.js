import { actionTypes, addressTypes, filterTypes } from "../utils/actionType";

export const initialState = {
  allProducts: [],
  wishList: [],
  categoryList: [],
  maxRange: 0,
  filters: {
    choice: "all",
    categories: [],
    priceRange: "",
    rating: "",
    searchText: "",
    sortBy: "",
  },
  addressList: [
    {
      id: "61bf1558-94c3-4494-a522-0aad46ed5334",
      fullname: "Jane Smith",
      mobile: "0712236744",
      flat: "205, Kamakis Estern by pass ",
      area: "Kamakis",
      city: "Nairobi",
      pincode: "00100",
    },
  ],
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INITIALIZE_PRODUCTS:
      const maxValue = action.payload.reduce(
        (accumulator, { price }) => (accumulator > price ? accumulator : price),
        0
      );
      return {
        ...state,
        allProducts: action.payload,
        maxRange: maxValue,
        filters: { ...state.filters, priceRange: maxValue },
      };
    case actionTypes.UPDATE_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
      };

    case actionTypes.INITIALIZE_WISHLIST:
      return { ...state, wishlist: action.payload };

    case actionTypes.ADD_PRODUCT_TO_WISHLIST:
      return { ...state, wishlist: action.payload };

    case actionTypes.DELETE_PRODUCTS_FROM_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };
    case filterTypes.FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.filterType]: action.payload.filterValue,
        },
      };
    case filterTypes.CLEAR_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,

          choice: "all",
          categories: [],
          priceRange: "",
          rating: "",
          searchText: "",
          sortBy: "",
        },
      };
    case actionTypes.INITIALIZE_CATEGORIES:
      return { ...state, categoryList: action.payload };

    case addressTypes.ADD_ADDRESS:
      return { ...state, addressList: action.payload };
    case addressTypes.UPDATE_ADDRESS:
      return { ...state, addressList: action.payload };
    case addressTypes.DELETE_ADDRESS:
      return { ...state, addressList: action.payload };
    default:
      return state;
  }
};
