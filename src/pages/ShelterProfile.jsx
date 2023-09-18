/** @format */

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { HomeIcon } from "@heroicons/react/24/outline";

const API_URL = "https://clear-bee-dress.cyclic.app";

function ShelterProfile() {
  const [myDogs, setMyDogs] = useState([]);

  const [shelterData, setShelterData] = useState([]);
  const [locationName, setLocationName] = useState("");
  console.log(shelterData);

   

  ///////////////////////////////Delete Dog//////////////////////////////////////

  const deleteDog = (idToDelete) => {
    const storedToken = localStorage.getItem("authToken");
    console.log(storedToken);

    axios
      .delete(`${API_URL}/shelter/listings/${idToDelete}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        console.log(res.data);
        setMyDogs((prevMyDogs) =>
          prevMyDogs.filter((dog) => dog._id !== idToDelete)
        );
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
    };

    getListedDogs();

 


  }, []);


  useEffect(()=>{

   const shelterLocation = shelterData.location;

    if (shelterLocation) {
      const locationName =
        shelterLocation.slice(0, 1).toUpperCase() + shelterLocation.slice(1);
      setLocationName(locationName);
    }

  },[shelterData])


  return (
    <>
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
        <div className="overflow-hidden rounded-lg bg-white shadow w-full">
          <h2 className="sr-only" id="profile-overview-title">
            Profile Overview
          </h2>
          <div className="bg-white p-6">
            <div className="flex mt-4 sm:mt-0 sm:pt-1 sm:text-left">
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto rounded-full bg-gray-100 sm:mx-0 sm:h-12 sm:w-12">
                <HomeIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="mx-4">
                <p className="text-sm font-medium text-gray-600">
                  Welcome back,
                </p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {shelterData.name}
                </p>

                <p className="text-sm font-regular text-gray-600">
                  {locationName && locationName}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <h3 className="px-6 py-5 text-sm font-regular text-gray-500">
              Number of listed dogs: {myDogs.length}
            </h3>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
        <ul className="divide-y divide-gray-100 w-full">
          {myDogs ? (
            myDogs.map((dog) => (
              <div className="px-8">
                <li
                  key={dog._id}
                  className="relative flex justify-between py-5">
                  <div className="flex gap-x-4 pr-6 sm:w-1/2 sm:flex-none">
                    <img
                      className="h-16 w-16 flex-none rounded-full bg-gray-50 my-2 object-cover"
                      src={dog.image[0]}></img>
                    <div className="min-w-0 flex-auto my-4">
                      <h3 className="text-sm font-semibold leading-6 text-gray-900">
                        {dog.name}
                      </h3>
                      <p className="flex-none text-xs text-gray-600">
                        {dog.breed}
                      </p>
                    </div>
                    <div className="my-4">
                      <p className="text-sm font-medium leading-6 text-gray-900">
                        {dog.age} years old
                      </p>

                      <p className="flex-none text-xs text-gray-600">
                        {dog.description}
                      </p>
                    </div>
                  </div>
                  <div className="space-x-4">
                    <Link to={`/profile/edit/${dog._id}`}>
                      <button className="my-4 py-1 px-3 bg-transparent hover:bg-gray-200 text-gray-500 text-sm font-semibold hover:text-gray-700 border border-gray-500 hover:border-transparent rounded">
                        Edit
                      </button>
                    </Link>

                    <button
                      className="my-4 py-1 px-3 bg-transparent hover:bg-gray-200 text-gray-500 text-sm font-semibold hover:text-gray-700 border border-gray-500 hover:border-transparent rounded"
                      onClick={() => handleDelete(dog._id)}>
                      Delete
                    </button>
                  </div>
                </li>
              </div>
            ))
          ) : (
            <h1>Loading Profile...</h1>
          )}
        </ul>
      </div>
    </>
  );
}

export default ShelterProfile;
