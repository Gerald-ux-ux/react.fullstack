import { v4 as uuid } from "uuid";
import { Response } from "miragejs";
import { formatDate } from "../utils/authUtils";
const sign = require("jwt-encode");

// This hanlder function handles the sign request/process
export const signUpHandler = (schema, request) => {
  // this are the parameters coming from the request (the rest is used to catch any other parameters sent together)
  const { email, password, ...rest } = JSON.parse(request.body);
  //   we have a try catch block that handle the signup logic
  try {
    // check if the email already exists
    const foundUser = schema.users.findBy({ email });
    // if the user is found throw an error
    if (foundUser) {
      return new Response(
        422,
        {},
        {
          errors: ["Unprocessable Entity. Email already exists"],
        }
      );
    }
    // using the uuid dependency to create a unique user id
    const _id = uuid();
    // if tthe user is not found create the user with the correct parameters
    const newUser = {
      _id,
      email,
      password,
      createdAt: formatDate(),
      updatedAt: formatDate(),
      ...rest,
      cart: [],
      wishlist: [],
    };
    const createdUser = schema.users.create(newUser);
    const encodedToken = sign({ _id, email }, process.env.REACT_APP_JWT_SECRET);
    return new Response(201, {}, { createdUser, encodedToken });
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
 * This handler handles user login.
 * send POST Request at /api/auth/login
 * body contains {email, password}
 * */

export const loginHandler = (schema, request) => {
  // params form the frontend post request
  const { email, password } = JSON.parse(request.requestBody);
  // check if user is already created
  try {
    // find user by email
    const foundUser = schema.users.findBy({ email });
    // if they are not present
    if (!foundUser) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }

    // if they exist log them in
    if (password === foundUser.password) {
      const encodedToken = sign(
        { _id: foundUser._id, email },
        process.env.REACT_APP_JWT_SECRET
      );
      foundUser.password = undefined;
      return new Response(200, {}, { foundUser, encodedToken });
    }
    return new Response(
      401,
      {},
      {
        errors: [
          "The credentials you entered are invalid. Unauthorized access error.",
        ],
      }
    );
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
