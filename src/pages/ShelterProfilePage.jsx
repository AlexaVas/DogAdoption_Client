/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:5008";

function ShelterProfile (props) {

const { user } = useContext(AuthContext);

console.log("in profile");
return (
  <div>
    <h1>Welcome to your profile! </h1>

    <h2>Shelter: {user.name}</h2>

    <h2>Add a new listing:</h2>
    <form>
        <input type={"text"}></input>


        <button>Create</button>







    </form>

  </div>
);


}


export default ShelterProfile;