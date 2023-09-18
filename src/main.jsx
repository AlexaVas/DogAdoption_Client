/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProviderWrapper } from "./context/auth.context";

import { BrowserRouter as Router } from "react-router-dom";
import { FilteredDogsProvider } from "./context/filter.context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper> 
      <FilteredDogsProvider>
      <App />
      </FilteredDogsProvider>
      </AuthProviderWrapper> 
    </Router>
  </React.StrictMode>
);
