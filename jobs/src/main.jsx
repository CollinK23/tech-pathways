import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import postsReducer from "./reducers/posts";
import authReducer from "./reducers/auth";
import expandedReducer from "./reducers/dashnav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const rootElement = document.getElementById("root");

const queryClient = new QueryClient();

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    expand: expandedReducer,
  },
});

const app = (
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App className="bg-primary fixed" />
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);

createRoot(rootElement).render(app);
