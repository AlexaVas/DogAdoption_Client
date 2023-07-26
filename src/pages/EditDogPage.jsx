/** @format */
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5008";

function EditDogPage(props) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const { dogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    console.log(storedToken);
    axios
      .get(`${API_URL}/shelter/listings/${dogId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })

      .then((response) => {
        const oneDog = response.data;
        setName(oneDog.name);
        setBreed(oneDog.breed);
        setAge(oneDog.age);
        setPhone(oneDog.phone);
        setImage(oneDog.image);
        setDescription(oneDog.description);
      })
      .catch((error) => console.log(error));
  }, [dogId]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        console.log(image); // This will log the base64 representation of the image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    // <== ADD
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { name, breed, age, phone, image, description };
    const storedToken = localStorage.getItem("authToken");
    console.log(storedToken);
    // Make a PUT request to update the project
    axios
      .put(`${API_URL}/shelter/listings/${dogId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/shelter/profile`);
      });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="my-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Edit this listing
        </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                placeholder="Alfie"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"

              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Breed
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="breed"
                placeholder="English Bulldog"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Age
            </label>
            <div className="mt-2">
              <input
                type="Number"
                name="age"
                placeholder="5"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Phone
            </label>
            <div className="mt-2">
              <input
                type="phone"
                name="phone"
                placeholder="44 3460 97343"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Image
            </label>
            <div className="mt-2">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImage}
                className="block"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-2">
              <textarea
                type="text"
                name="description"
                placeholder="Good Boy!"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <input                 className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
 type="submit" value="Save Changes" />
        </form>
        </div>
      </div>
    </div>
  );
}

export default EditDogPage;
