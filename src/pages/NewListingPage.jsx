//** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5008";

function NewListing (props) {

const { user } = useContext(AuthContext);





 const [name, setName] = useState("");
 const [breed, setBreed] = useState("");
 const [age, setAge] = useState("");
 const [phone, setPhone] = useState("");
 const [image, setImage] = useState("");
 const [description, setDescription] = useState("");
const [profileId, setProfileId] = useState("");
const [shelterName, setShelterName] = useState("");
const [shelterLocation, setShelterLocation] = useState("");

  useEffect(() => {

    setProfileId(user._id);
    setShelterName(user.name);
    setShelterLocation(user.location);

  }, [name]);

    console.log(user.location);

 const [errorMessage, setErrorMessage] = useState(undefined);

 const navigate = useNavigate();

 const handleName = (e) => setName(e.target.value);
 const handleBreed = (e) => setBreed(e.target.value);
 const handleAge = (e) => setAge(e.target.value);
 const handlePhone = (e) => setPhone(e.target.value);
 const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        console.log(image)
      };
      reader.readAsDataURL(file);
    }
  };

 const handleDescription = (e) => setDescription(e.target.value);

 const handleDogSubmit = (e) => {
   e.preventDefault();
   // Create an object representing the request body
   const requestBody = {name, breed, age, phone, image, description, profileId, shelterName, shelterLocation};

   // Make an axios request to the API
   // If the POST request is a successful redirect to the login page
   // If the request resolves with an error, set the error message in the state
   axios
     .post(`${API_URL}/shelter/profile`, requestBody)
     .then((response) => {
        console.log(response);
       
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
     setProfileId("");
 };
  
  console.log(image);

return (
  <div>
    

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
        type="file"
        name="image"
        accept="image/*"
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


export default NewListing;