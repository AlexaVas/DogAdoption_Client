/** @format */

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "https://clear-bee-dress.cyclic.app";

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
          prevMyDogs.filter((dog) => dog._id !== idToRemove)
        );
      })
      .catch((error) => console.log(error));

    console.log(idToRemove);
  };

  /////////////////////////////////////////////////////////////////////

  return (
    <div className="relative isolate pt-14">
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
        <ul role="list" className="divide-y divide-gray-100 w-full">
        <h1 className="text-lg font-semibold leading-6 text-gray-900 mb-8">My Favorites</h1>
          {myDogs ? (
            myDogs.map((profile) => (
              <div>
                <li
                  key={profile._id}
                  className="relative flex justify-between py-5"
                >
                  <div className="flex gap-x-4 pr-6 sm:w-1/2 sm:flex-none">
                    <img
                      className="h-16 w-16 flex-none rounded-full bg-gray-50 my-2 object-cover"
                      src={profile.image}
                    ></img>
                    <div className="min-w-0 flex-auto my-4">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {profile.name}
                      </p>
                      <p className="flex-none text-xs text-gray-600">
                        {profile.breed}
                      </p>

                    </div>
                    <div className="my-4">
                    <h3 className="text-sm font-semibold leading-6 text-gray-900">{profile.shelterName}</h3>
                      <p className="flex-none text-xs text-gray-600">+{profile.phone}</p>
                      </div>
                  </div>

                  <button
                    className="my-4 py-1 px-3 bg-transparent hover:bg-gray-200 text-gray-500 text-sm font-semibold hover:text-gray-700 border border-gray-500 hover:border-transparent rounded"
                    onClick={() => handleRemove(profile._id)}
                  >
                    Remove from Favorites
                  </button>
                </li>
              </div>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </ul>
      </div>
    </div>
  );
}

export default FavoritesPage;
