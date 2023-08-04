import React from "react";
import { Index as Route } from "./routes/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer hideProgressBar theme="dark" autoClose={2000} />
      <Route />
    </>
  );
}

export default App;
