/** @format */

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


const API_URL = "http://localhost:5008";

function ViewPage() {
  const { user } = useContext(AuthContext);  
  const [dog, setDog] = useState();

  const { dogId } = useParams();

  console.log(dogId);

  useEffect(() => {

    const storedToken = localStorage.getItem("authToken");
    console.log(storedToken);
    axios
      .get(`${API_URL}/shelter/listings/${dogId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const selectedDog = response.data;
        setDog(selectedDog);
        console.log(selectedDog);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {dog ? (
        <div>
          <article>
            <h1>Get to know {dog.name}</h1>
            <p>Breed: {dog.breed}</p>

            <p>Age: {dog.age}</p>
            <img src={dog.image}></img>
            <p>
              A little bit about {dog.name}: {dog.description}
            </p>

            <p>
              {" "}
              {dog.name} is currently based at {dog.shelterName}. Call or text{" "}
              {dog.phone} to get an appointment and meet {dog.name} in person!
            </p>

            {dog.user.length > 1 ? (
              <p>
                {dog.user.length} people are already interested in {dog.name} !
                Get in touch with {dog.shelterName} to not miss your chance!
              </p>
            ) : (
              <p></p>
            )}
          </article>
          {user.userType === "user" ? (<p></p>):(<p></p>)}
        </div>
      ) : (
        <h1>Lodaing...</h1>
      )}
    </div>
  );
}

export default ViewPage;
