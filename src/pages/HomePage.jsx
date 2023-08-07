import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5008";

function HomePage() {
  // Define the LoadingSpinner component
  // const { isLoggedIn, user, logOutUser } = useContext(AuthContext);


  const LoadingSpinner = () => (
    <div className="spinner">
      <div className="dot1"></div>
      <div className="dot2"></div>
    </div>
  );

  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
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
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false)); // Set isLoading to false when the request is complete
  }, []);

  const [search, setSearch] = useState();

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (!search) {
      setFilteredDogs(dogs);
    } else {
      const searchL = search.toLowerCase();
      const filteredDogs = dogs.filter((dog) => dog.location === searchL);
      setFilteredDogs(filteredDogs);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  console.log(search);

  return (
    <div className="relative isolate pt-6">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-32">
        <div className="mx-auto lg:mx-0 lg:flex-auto">
          <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Find dogs at animal shelters near you
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600 mb-24">
            Search through our list of nearby shelters to see the dogs available
            for adoption in your area. Each one comes neutered, vaccinated and
            microchipped, and is covered by Petplan insurance for the first four
            weeks.
          </p>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div className="mx-auto lg:mx-0 lg:flex-auto">
              <h2 className="mt-6 text-lg leading-8 text-gray-600">
                Search by city:
              </h2>

              <form className="flex mb-4" onSubmit={handleSearchSubmit}>
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Berlin"
                      type="search"
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                <button
                  className="flex ml-4 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  type="submit"
                >
                  Search
                </button>
              </form>
              <br></br>

              <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">

              {/* Use isLoading to determine when to show the LoadingSpinner */}
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                {filteredDogs.length > 0 && dogs.length > 0 ? (
  filteredDogs.map((profile) => (
    <li className="flex flex-wrap justify-center" key={profile._id}>
      <div className="group w-full overflow-hidden rounded-lg shadow-md">
        <div className="aspect-h-5 aspect-w-6">
          <img className="pointer-events-none object-cover group-hover:opacity-75" src={profile.image[0]} alt={profile.name} />
        </div>
        <div className="px-4 pb-4">
        <h3 className="pointer-events-none mt-2 block truncate text-lg font-medium text-gray-900">{profile.name}</h3>
        <p className="pointer-events-none block text-md font-medium text-gray-500 mb-1">{profile.breed}</p>
        <p className="pointer-events-none block text-md font-medium text-gray-400 mb-3">{profile.shelterName}</p>
        <Link to={`/view/${profile._id}`}>
        <button className="py-1 px-3 bg-transparent hover:bg-gray-200 text-gray-500 font-semibold hover:text-gray-700 border border-gray-500 hover:border-transparent rounded">View</button>
        </Link>
        </div>
      </div>
    </li>
  ))
                  ) : (
                    <h3>No dogs available in this city.</h3>
                  )}
                </>
              )}

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
