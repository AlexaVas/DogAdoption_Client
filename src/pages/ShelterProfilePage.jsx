//** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5008";

function ShelterProfile (props) {

const { user } = useContext(AuthContext);


 const [name, setName] = useState("");
 const [breed, setBreed] = useState("");
 const [age, setAge] = useState("");
 const [phone, setPhone] = useState("");
 const [image, setImage] = useState("");
 const [description, setDescription] = useState("");

 const [errorMessage, setErrorMessage] = useState(undefined);

 const navigate = useNavigate();

 const handleName = (e) => setName(e.target.value);
 const handleBreed = (e) => setBreed(e.target.value);
 const handleAge = (e) => setAge(e.target.value);
 const handlePhone = (e) => setPhone(e.target.value);
 const handleImage = (e) => setImage(e.target.value);
 const handleDescription = (e) => setDescription(e.target.value);

 const handleDogSubmit = (e) => {
   e.preventDefault();
   // Create an object representing the request body
   const requestBody = {name, breed, age, phone, image, description};

   // Make an axios request to the API
   // If the POST request is a successful redirect to the login page
   // If the request resolves with an error, set the error message in the state
   axios
     .post(`${API_URL}/shelter/profile`, requestBody)
     .then((response) => {
       navigate("/my-listings");
     })
     .catch((error) => {
       const errorDescription = error.response.data.message;
       setErrorMessage(errorDescription);
     });

     setName("");
     setBreed("");
     setAge("");
     setPhone("");
     setImage("");
     setDescription("");

 };
  

return (
  <div>
    <h1>Welcome to your profile! </h1>

    <h2>Shelter: {user.name}</h2>

    <h2>Add a new listing:</h2>

    <form onSubmit={handleDogSubmit}>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        placeholder="Alfie"
        value={name}
        onChange={handleName}
      />
      <label>Breed:</label>
      <input
        type="text"
        name="breed"
        placeholder="English Bulldog"
        value={breed}
        onChange={handleBreed}
      />
      <label>Age:</label>
      <input
        type="Number"
        name="age"
        placeholder="5"
        value={age}
        onChange={handleAge}
      />
      <label>Phone:</label>
      <input
        type="phone"
        name="phone"
        placeholder="+44 3460 97343"
        value={phone}
        onChange={handlePhone}
      />
      <label>Image:</label>
      <input
        type="text"
        name="image"
        value={image}
        onChange={handleImage}
      />
      <label>Description:</label>
      <input
        type="text"
        name="description"
        placeholder="Good Boy!"
        value={description}
        onChange={handleDescription}
      />

      <button type="submit">Create</button>
    </form>
  </div>
);


}


export default ShelterProfile;