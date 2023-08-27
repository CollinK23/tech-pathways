import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import postsReducer from "./reducers/posts"; // Assuming this is the slice reducer you've created
import authReducer from "./reducers/auth";

const rootElement = document.getElementById("root");

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

const app = (
  <BrowserRouter>
    <Provider store={store}>
      <App className="bg-primary fixed" />
    </Provider>
  </BrowserRouter>
);

createRoot(rootElement).render(app);
