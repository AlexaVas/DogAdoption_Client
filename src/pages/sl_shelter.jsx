/** @format */

import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "https://clear-bee-dress.cyclic.app";

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
    const locationL = location.toLowerCase();
    const requestBody = { email, password, name, location:locationL, phone, description };

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup/shelter`, requestBody)
      .then((response) => {

           setEmail("");
           setPassword("");
           setName("");
           setLocation("");
           setPhone("");
           setDescription("");

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

      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });

    }



  return (
    <div className="relative isolate pt-14">
    <div className="flex flex-col lg:flex-row">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log in</h1>
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLoginSubmit}>
          <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <input
            type="email"
            name="logInEmail"
            placeholder="pawsomeadoptions@gmail.com"
            value={logInEmail}
            onChange={handleLogInEmail}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"

          />

          <label className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
          <input
            type="password"
            name="logInp
            Password"
            value={logInPassword}
            onChange={handleLogInPassword}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"

          />

          <button                 className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
 type="submit">Log in</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      </div>

      <div className="mt-10 mb-32 sm:mx-auto sm:w-full sm:max-w-md bg-gray-100 rounded-lg p-12">

      <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up</h1>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSignupSubmit}>
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">Name:</label>
        <div className="mt-2">
        <input
          type="text"
          name="name"
          placeholder="Pawsome Adoptions"
          value={name}
          onChange={handleName}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"

        />
        </div>
</div>
<div>
        <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
        <div className="mt-2">
        <input
          type="email"
          name="email"
          placeholder="pawsomeadoptions@gmail.com"
          value={email}
          onChange={handleEmail}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"

        />
        </div>
        </div>
<div>
        <label className="block text-sm font-medium leading-6 text-gray-900">Password:</label>
        <div className="mt-2">
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"

        />
        </div>
        </div>

<div>
        <label className="block text-sm font-medium leading-6 text-gray-900">Location of your Shelter:</label>
        <div className="mt-2">
        <input
          type="text"
          name="location"
          placeholder="Berlin"
          value={location}
          onChange={handleLocation}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"

        />
        </div>
        </div>
<div>
        <label className="block text-sm font-medium leading-6 text-gray-900">Phone:</label>
        <div className="mt-2">
        <input
          type="phone"
          name="phone"
          placeholder="   +49 178 4916825"
          value={phone}
          onChange={handlePhone}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"

        />
        </div>
        </div>
        <div>

        <label className="block text-sm font-medium leading-6 text-gray-900">Share some details about your shelter:</label>
        <div className="mt-2">
        <textarea
          type="text"
          name="description"
          placeholder="We are dedicated to rescuing all stray dogs found in Moabit."
          value={description}
          onChange={handleDescription}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"

        />
        </div>
        </div>

        <button className="my-4 py-1 px-3 bg-transparent hover:bg-gray-200 text-gray-500 font-semibold hover:text-gray-700 border border-gray-500 hover:border-transparent rounded w-full"
 type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
    </div>
    </div>
    </div>
  );


}

export default SignUpLogInShelter;
