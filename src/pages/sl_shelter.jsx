/** @format */

import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5008";

function SignUpLogInShelter(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const { storeToken, authenticateShelter } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
///SignUp////
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleLocation = (e) => setLocation(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

///LogIn////

  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");


  const handleLogInEmail = (e) => setLogInEmail(e.target.value);
  const handleLogInPassword = (e) => setLogInPassword(e.target.value);

  //////////////////////////////SignUp///////////////////////////////

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name, location, phone, description };

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup/shelter`, requestBody)
      .then((response) => {

        navigate("/shelter");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

//////////////////////////////LogIn///////////////////////////////

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestLogInBody = {
      "email": logInEmail,
      "password": logInPassword,
    };

   
    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state

    
    axios
      .post(`${API_URL}/auth/login/shelter`, requestLogInBody)
      .then((response) => {
        console.log(response);

        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);

        authenticateShelter();
      })

      .then((res) => {
        console.log("This is the result " + res);
        // navigate("/shelter/profile");

      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });

    }
  


  return (
    <div>
      <div className="LoginPage">
        <h1>LogIn</h1>

        <form onSubmit={handleLoginSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="logInEmail"
            placeholder="pawsomeadoptions@gmail.com"
            value={logInEmail}
            onChange={handleLogInEmail}
          />

          <label>Password:</label>
          <input
            type="password"
            name="logInp
            Password"
            value={logInPassword}
            onChange={handleLogInPassword}
          />

          <button type="submit">LogIn</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      <h3>No account yet? Sign up below and join our shelter family today!</h3>

      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Pawsome Adoptions"
          value={name}
          onChange={handleName}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="pawsomeadoptions@gmail.com"
          value={email}
          onChange={handleEmail}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Location of your Shelter:</label>
        <input
          type="text"
          name="location"
          placeholder="Berlin-Moabit"
          value={location}
          onChange={handleLocation}
        />

        <label>Phone:</label>
        <input
          type="number"
          name="phone"
          placeholder="+49 178 4916825"
          value={phone}
          onChange={handlePhone}
        />

        <label>Share some details about your shelter:</label>
        <input
          type="text"
          name="description"
          placeholder="We are dedicated to rescuing all stray dogs found in Moabit."
          value={description}
          onChange={handleDescription}
        />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );

  
}

export default SignUpLogInShelter;
 