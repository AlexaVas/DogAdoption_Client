/** @format */

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5008";

function FavoritesPage() {


  const [myDogs, setMyDogs] = useState();

  
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    console.log(storedToken);
    axios
      .get(`${API_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const myDogs = response.data;
        setMyDogs(myDogs);
        console.log(myDogs);
      })
      .catch((error) => console.log(error));
  }, []);

  
///////////////////////////////Remove/////////////////////////////////
const navigate = useNavigate();

  const handleRemove = (idToRemove) => {
     const storedToken = localStorage.getItem("authToken");

     axios
      .delete(`${API_URL}/user/profile/${idToRemove}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setMyDogs((prevMyDogs) =>
          prevMyDogs.filter((dog) => dog._id !== idToRemove))
        
      })
      .catch((error) => console.log(error));

console.log(idToRemove);

  };

    


  
/////////////////////////////////////////////////////////////////////

 
  return (
    <div>
      {myDogs ? (
        myDogs.map((profile) => (
          <div>
            <article key={profile._id}>
              <h3>Name: {profile.name}</h3>
              <p>Breed: {profile.breed}</p>
              <img src={profile.image}></img>
              <span>
                <p>Located at</p> <h3>{profile.shelterName}</h3>
              </span>

              <p>Call or text +{profile.phone} to meet {profile.name}. </p>
            </article>
            
              <button onClick={() => handleRemove(profile._id)}>Remove from Favorites</button>
           
          </div>
        ))
      ) : (
        <h1>Lodaing...</h1>
      )}
    </div>
  );
}

export default FavoritesPage;
