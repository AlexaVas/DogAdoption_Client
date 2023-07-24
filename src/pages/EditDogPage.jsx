/** @format */
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5008";

function EditDogPage(props) {
 
 const [name, setName] = useState("");
 const [breed, setBreed] = useState("");
 const [age, setAge] = useState("");
 const [phone, setPhone] = useState("");
 const [image, setImage] = useState("");
 const [description, setDescription] = useState("");

  const { dogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

        const storedToken = localStorage.getItem("authToken");
        console.log(storedToken);
    axios
      .get(`${API_URL}/shelter/listings/${dogId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })

      .then((response) => {
        const oneDog = response.data;
        setName(oneDog.name);
        setBreed(oneDog.breed);
        setAge(oneDog.age);
        setPhone(oneDog.phone);
        setImage(oneDog.image);
        setDescription(oneDog.description);
      })
      .catch((error) => console.log(error));
  }, [dogId]);

    const handleImage = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
          console.log(image); // This will log the base64 representation of the image
        };
        reader.readAsDataURL(file);
      }
    };

  const handleFormSubmit = (e) => {
    // <== ADD
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { name, breed, age, phone, image,  description };
        const storedToken = localStorage.getItem("authToken");
        console.log(storedToken);
    // Make a PUT request to update the project
    axios
      .put(`${API_URL}/shelter/listings/${dogId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/shelter/profile`);
      });
  };

  
  return (
    <div className="EditProjectPage">
      <h3>Edit the Profile</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Alfie"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Breed:</label>
        <input
          type="text"
          name="breed"
          placeholder="English Bulldog"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
        <label>Age:</label>
        <input
          type="Number"
          name="age"
          placeholder="5"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label>Phone:</label>
        <input
          type="phone"
          name="phone"
          placeholder="+44 3460 97343"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default EditDogPage;
