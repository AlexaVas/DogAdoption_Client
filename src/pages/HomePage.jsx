/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5008";

function HomePage() {




  const [dogs, setDogs] = useState([]);
  const [filteredDogs, setFilteredDogs] = useState([]);
  console.log(dogs);

  useEffect(() => {




    axios
      .get(`${API_URL}/`)
      .then((response) => {
        const listDogs = response.data;
        setDogs(listDogs);
        setFilteredDogs(listDogs);
        console.log(listDogs);
      })
      .catch((error) => console.log(error));






  }, []);


 const [search, setSearch] = useState();

 const handleSearchSubmit = (e) => {
  e.preventDefault();

  if(!search){
    setFilteredDogs(dogs);
  } else {

    const searchL = search.toLowerCase();

  const filteredDogs = dogs.filter((dog) => dog.location == searchL);
  setFilteredDogs(filteredDogs);

  }



 }

 const handleSearch = (e) => { setSearch(e.target.value);};



console.log(search);

  return (
    <div>
      <h1>Home Page</h1>
      <h2>Dogs waiting for adoption.</h2>

      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>

      <form onSubmit={handleSearchSubmit}>
        <input
          placeholder="Berlin"
          type="search"
          onChange={handleSearch}></input>
        <button type="submit">Search</button>
      </form>

      {dogs.length === 0 && <h1>Loading...</h1>}

      {filteredDogs.length > 0 && dogs.length > 0 && (
        filteredDogs.map((profile) => (
          <div>
            <article key={profile._id}>
              <h3>Name: {profile.name}</h3>
              <p>Breed: {profile.breed}</p>
              <img src={profile.image}></img>
            </article>
            <Link to={`/view/${profile._id}`}>
              <button>View</button>
            </Link>
          </div>
        ))
      )}

      {filteredDogs.length === 0 && dogs.length > 0 && (
        <h3>0 dogs available in this city.</h3>
      )}
    </div>
  );

}


export default HomePage;
