/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5008";

function HomePage() {

  


  const [dogs, setDogs] = useState();
  
  useEffect(() => {
    



    axios
      .get(`${API_URL}/`)
      .then((response) => {
        const listDogs = response.data;
        setDogs(listDogs);
        console.log(listDogs);
      })
      .catch((error) => console.log(error));


      


     
  }, []);
 
  



  return (
    <div>
      <h1>Home Page</h1>
      <h2>Dogs waiting for adoption.</h2>
      {dogs ? (
        dogs.map((profile) => (
          <div>
            <article key={profile._id}>
              <h3>Name: {profile.name}</h3>
              <p>Breed: {profile.breed}</p>
              <p>Age: {profile.age}</p>
              <img src={profile.image}></img>
              <p>
                A little bit about {profile.name}: {profile.description}
              </p>
            </article>
            <Link to={`/view/${profile._id}`}>
              <button>View</button>
            </Link>
          </div>
        ))
      ) : (
        <h1>Lodaing...</h1>
      )}
    </div>
  );

}






export default HomePage;


