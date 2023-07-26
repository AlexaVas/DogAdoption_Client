/** @format */

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Gpt from "../components/Gpt";

const API_URL = "http://localhost:5008";

function ViewPage() {
  const { user } = useContext(AuthContext);

  console.log(user.userType);
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

  const navigate = useNavigate();

  const handleFavorites = () => {
    const storedToken = localStorage.getItem("authToken");
    console.log(storedToken);

    axios
      .post(
        `${API_URL}/user/dog-list/${dogId}`,
        {},
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        const selectedDog = response.data;
        console.log(selectedDog);
      })
      .then(() => navigate("/"))
      .catch((error) => console.log(error));
  };

  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        {dog ? (
          <div className="flex flex-col lg:flex-row">
            <div className="aspect-w-4 aspect-h-2 w-full lg:w-1/2">
              <img
                className="object-cover rounded-lg"
                src={dog.image}
                alt={dog.name}
              />
            </div>
            <div className="py-4 px-6 lg:mt-0 lg:w-1/2 lg:pl-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {dog.name}
              </h1>
              <h2 className="text-lg leading-8 text-gray-700">
                Breed: {dog.breed}
              </h2>
              <p className="text-md block text-gray-600">Age: {dog.age}</p>
              <h4 className="text-sm font-semibold leading-8 text-gray-800 pt-5">
                Description
              </h4>
              <p className="text-gray-600">{dog.description}</p>
              <h4 className="text-sm font-semibold leading-8 text-gray-800 pt-5">
                How to adopt
              </h4>
              <p className="pb-2 text-gray-600">
                {dog.shelterName}
                </p>
                <p className="text-sm text-gray-600">
                +{dog.phone}
              </p>
              {dog.user.length > 1 ? (
                <p className="my-4 text-sm text-blue-600">
                  {dog.user.length} people are already interested in {dog.name}!
                  Get in touch with {dog.shelterName} to not miss your chance!
                </p>
              ) : null}
              {user.userType === "user" ? (
                <button
                  onClick={handleFavorites}
                  className="flex mt-8 max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Add to favorites
                </button>
              ) : null}
            </div>
            <div className="p-6 rounded-md bg-gray-100 lg:max-w-[320px] sm:w-full">

<Gpt breed={dog.breed} name={dog.name}></Gpt>

</div>

          </div>
        ) : (
          <h1>Loading...</h1>
        )}

      </div>

    </div>
  );
}

export default ViewPage;
