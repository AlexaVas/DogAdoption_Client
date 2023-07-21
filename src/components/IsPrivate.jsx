/** @format */

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading
  if (isLoading) return <p>Loading ...</p>;
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    // If the user is not logged in
    console.log("Is not logged in");
    return <Navigate to="/login" />;
  } else {
    // If the user is logged in, allow to see the page
    console.log("Is logged in");
    return children;
  }
}

export default IsPrivate;
