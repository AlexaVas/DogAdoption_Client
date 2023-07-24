/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5008";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  const storeToken = (token) => {
    //  <==  ADD
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    //  <==  ADD
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // If the server verifies that the JWT token is valid
          const user = response.data;
          // Update state variables
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
          
        })
        .catch((error) => {
          // If the server sends an error response (invalid token)
          // Update state variables
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      // If the token is not available (or is removed)
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };


    const authenticateShelter = () => {
      //  <==  ADD
      // Get the stored token from the localStorage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        // We must send the JWT token in the request's "Authorization" Headers
        axios
          .get(`${API_URL}/auth/verify`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            // If the server verifies that the JWT token is valid
            const user = response.data;
            
            console.log(user);
            // Update state variables
            setIsLoggedIn(true);
            setIsLoading(false);
            setUser(user);
          })
          .catch((error) => {
            // If the server sends an error response (invalid token)
            // Update state variables
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
           
          });
      } else {
        // If the token is not available (or is removed)
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      }
    };


  const removeToken = () => {
    // <== ADD
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    // <== ADD
    // To log out the user, remove the token
    removeToken();
    // and update the state variables
    authenticateUser();
  };  

  const logOutShelter = () => {
    // <== ADD
    // To log out the user, remove the token
    removeToken();
    // and update the state variables
    authenticateShelter();
  };  

  /* 
    Functions for handling the authentication status (isLoggedIn, isLoading, user)
    will be added here later in the next step
  */

      useEffect(() => {
        authenticateUser();  
       authenticateShelter();
       
      // to be updated in the next step
    }, []);  

     

    useEffect(() => {
      console.log(isLoggedIn);
      
    }, [isLoggedIn]);


     
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        authenticateShelter,
        logOutUser,
        logOutShelter
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
