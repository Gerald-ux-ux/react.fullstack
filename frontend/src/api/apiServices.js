import axios from "axios";
import {
  CART_URL,
  PRODUCTS_URL,
  LOGIN_URL,
  SIGNUP_URL,
  WISHLIST_URL,
  CATEGORIES_URL,
} from "./apiUrls";

// HANDLING HTTP METHODS CRUD OPERATIONS

// This function is used to login the user with the params passed in
export const loginService = (email, password) =>
  axios.post(LOGIN_URL, { email, password });

// This function is used to signUp the user with the params passed in
export const signupService = (username, email, password) =>
  axios.post(SIGNUP_URL, { username, email, password });

// This function just performs a get request to the server and returns all the products
export const getAllProductsService = () => axios.get(PRODUCTS_URL);

//This function just performs a get request to the server and returns a product with the specified id
export const getProductsByIdService = (productId) =>
  axios.get(`${PRODUCTS_URL}/${productId}`);

//This is a private function that gets the cart items after validation using the token
export const getCartItemsService = (token) =>
  axios.get(CART_URL, {
    headers: {
      authorization: token,
    },
  });

//This is also a private function that add products to the cart with the product ID after validation of the token
export const postAddProductToCartService = (product, token) =>
  axios.post(
    CART_URL,
    { product },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const postUpdateProductQtyCartService = (productId, type, token) =>
  axios.post(
    `${CART_URL}/${productId}`,
    {
      action: {
        type,
      },
    },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const deleteProductFromCartService = (productId, token) =>
  axios.delete(`${CART_URL}/${productId}`, {
    headers: {
      authorization: token,
    },
  });

export const getWishlistItemsService = (token) =>
  axios.get(WISHLIST_URL, {
    headers: {
      authorization: token,
    },
  });

export const postAddProductToWishlistService = (product, token) =>
  axios.post(
    WISHLIST_URL,
    { product },
    {
      headers: {
        authorization: token,
      },
    }
  );

export const deleteProductFromWishlistService = (productId, token) =>
  axios.delete(`${WISHLIST_URL}/${productId}`, {
    headers: {
      authorization: token,
    },
  });

export const getAllCategoriesService = () => axios.get(CATEGORIES_URL);
