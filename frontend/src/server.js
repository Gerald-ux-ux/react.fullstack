import { Model, RestSerializer, Server } from "miragejs";
import {
  loginHandler,
  signUpHandler,
} from "./backend/controllers/AuthController";
import {
  getAllProductsHandler,
  getProductsHandler,
} from "./backend/controllers/ProductController";
import {
  getAllCategoriesHandler,
  getCategoriesHandler,
} from "./backend/controllers/CategoryContorller";
import {
  addItemToCartHandler,
  getCartItemsHandler,
  removeItemsFromCartHandler,
  updateCartItemHandler,
} from "./backend/controllers/CartController";
import {
  addItemToWishlistHandler,
  getWishlistItemHandler,
  removeItemFromWishListHandler,
} from "./backend/controllers/WishlistConroller";
import { categories } from "./backend/db/categories";
import { products } from "./backend/db/products";
import { users } from "./backend/db/users";

export function createServer({ environment = "development" } = {}) {
  return new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    models: {
      product: Model,
      category: Model,
      user: Model,
      cart: Model,
      wishlist: Model,
    },

    logging: true,

    seeds(server) {
      server.logging = true;
      products.forEach((item) => {
        server.create("product", { ...item });
      });
      users.forEach((item) => {
        server.create("user", { ...item, cart: [], wishlist: [] });
      });

      categories.forEach((item) => {
        server.create("category", { ...item });
      });
    },
    routes() {
      this.namespace = "api";

      this.get("/test", () => {
        return "Server is running ok";
      });

      // auth routes (public)
      this.post("/auth/signup", signUpHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      // products routes (public)
      this.get("/products", getAllProductsHandler.bind(this));
      this.get("/products/:id", getProductsHandler.bind(this));

      // categories routes (public)
      this.get("/categories", getAllCategoriesHandler.bind(this));
      this.get("/categories/:id", getCategoriesHandler.bind(this));

      // cart routes (private)
      this.get("/user/cart", getCartItemsHandler.bind(this));
      this.post("/user/cart", addItemToCartHandler.bind(this));
      this.post("/user/cart/:productId", updateCartItemHandler.bind(this));
      this.delete(
        "/user/cart/:productId",
        removeItemsFromCartHandler.bind(this)
      );

      // wishlist routes (private)
      this.get("/user/wishlist", getWishlistItemHandler.bind(this));
      this.post("/user/wishlist", addItemToWishlistHandler.bind(this));
      this.delete(
        "/user/wishlist/:productId",
        removeItemFromWishListHandler.bind(this)
      );
    },
  });
}
