/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DogHomeCard from "../components/DogHomeCard";
import HeroSection from "../components/HeroSection";
import FooterSection from "../components/FooterSection";

const API_URL = "http://localhost:5008";

function HomePage() {
  const [dogs, setDogs] = useState([]);

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
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <HeroSection />

      {/* DogHomeCards section */}
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-x-10 lg:px-8 ">
          <div className="w-full">
            <h3 className="text-2xl font-medium text-gray-900">
              Dogs available near you
            </h3>
            <br></br>
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
            >
              {dogs.map((dog) => (
                <DogHomeCard key={dog.id} {...dog} />
              ))}
            </ul>
          </div>
        </div>

      {/* End DogHomeCards section */}

      <FooterSection />
    </div>
  );
}

export default HomePage;
