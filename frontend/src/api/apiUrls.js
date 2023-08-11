/**
 * So this is a centralized api defination point
 * */

const baseUrl = "/api";

// test
export const TEST_URL = `${baseUrl}/test`;

// Auth urls
export const SIGNUP_URL = `${baseUrl}/auth/signup`;
export const LOGIN_URL = `${baseUrl}/auth/login`;

export const PRODUCTS_URL = `${baseUrl}/products`;

//category url
export const CATEGORIES_URL = `${baseUrl}/categories`;

//cart url
export const CART_URL = `${baseUrl}/user/cart`;

//wishlist url
export const WISHLIST_URL = `${baseUrl}/user/wishlist`;
