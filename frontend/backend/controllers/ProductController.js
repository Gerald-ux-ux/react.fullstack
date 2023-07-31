import { Response } from "miragejs";

/**
 * All the routes related to Product are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all products in the db.
 * send GET Request at /api/products
 * */

export const getAllProductsHandler = () => {
  try {
    return new Response(200, {}, { products: this.db.products });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles gets specific products in the db.
 * send GET Request at /api/user/products/:productId
 * */

export const getProductsHandler = (schema, request) => {
  const productId = request.params.productId;
  try {
    const product = schema.products.findBy({ _id: productId });
    return new Response(200, {}, { product });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
