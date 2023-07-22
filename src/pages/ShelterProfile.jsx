/** @format */

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5008";

function ShelterProfile() {
  const [myDogs, setMyDogs] = useState([]);

     const [shelterData, setShelterData] = useState([]);
     console.log(shelterData);

  
  ///////////////////////////////Delete Dog//////////////////////////////////////

  const deleteDog = (idToDelete) => {
    const storedToken = localStorage.getItem("authToken");
    console.log(storedToken);

    axios
      .delete(`${API_URL}/shelter/listings/${idToDelete}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(()=> {

        setMyDogs((prevMyDogs) => prevMyDogs.filter((dog) => dog._id !== idToDelete));

      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (idToDelete) => {
    deleteDog(idToDelete);
  };

  ///////////////////////////////Get Dogs//////////////////////////////////////

 
  

  useEffect(() => {
   

 const getListedDogs = () => {
    const storedToken = localStorage.getItem("authToken");
    console.log(storedToken);

    axios
      .get(`${API_URL}/shelter/listings`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {

        const shelterData = response.data;
        setShelterData(shelterData);

        const listDogs = response.data.dogs;
        setMyDogs(listDogs);
        console.log(listDogs);
      })
      .catch((error) => console.log(error));

    }

    getListedDogs();


    }, []);

  //   useEffect(() => {
  //     axios
  //       .delete(`${API_URL}/`)
  //       .then((response) => {
  //         const listDogs = response.data;
  //         setDogs(listDogs);
  //         console.log(listDogs);
  //       })
  //       .catch((error) => console.log(error));
  //   }, []);

  //   axios
  //     .put(`${API_URL}/shelter/listings/:dogId`)
  //     .then((response) => {
  //       const listDogs = response.data;
  //       setDogs(listDogs);
  //       console.log(listDogs);
  //     })
  //     .catch((error) => console.log(error));

  return (
    <div>
      <h1>{shelterData.name}'s Profile Page</h1>
      <h3>Number of listed dogs: {myDogs.length}</h3>
      <h3>{shelterData.location}</h3>
      <h1>Your Listings:</h1>

      {myDogs ? (
        myDogs.map((dog) => (
          <div>
            <article key={dog._id}>
              <h3>Name: {dog.name}</h3>
              <p>Breed: {dog.breed}</p>
              <p>Age: {dog.age}</p>
              <img src={dog.image}></img>
              <p>
                A little bit about {dog.name}: {dog.description}
              </p>
            </article>

            <Link to={`/profile/edit/${dog._id}`}>
              <button>Edit</button>
            </Link>

            <button onClick={() => handleDelete(dog._id)}>Delete</button>
          </div>
        ))
      ) : (
        <h1>Loading Profile...</h1>
      )}
    </div>
  );
}

export default ShelterProfile;
