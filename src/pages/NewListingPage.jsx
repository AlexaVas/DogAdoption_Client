//** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Alert } from "@material-tailwind/react";

const API_URL = "https://clear-bee-dress.cyclic.app";

function NewListing(props) {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState("");
  const [profileId, setProfileId] = useState("");
  const [shelterName, setShelterName] = useState("");
  const [shelterLocation, setShelterLocation] = useState("");
 
  

  useEffect(() => {
    setProfileId(user._id);
    setShelterName(user.name);
    setShelterLocation(user.location);
  }, [name]);

  console.log(user.location);

  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isSent, setIsSent] = useState(false);

  const navigate = useNavigate();

  const handleName = (e) => setName(e.target.value);
  const handleBreed = (e) => setBreed(e.target.value);
  const handleAge = (e) => setAge(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const handleImage = (e) => {
   
    const  selectedImages = Array.from(e.target.files);
    setImage(selectedImages);

  };

  const handleDescription = (e) => setDescription(e.target.value);

  const handleDogSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
     const formData = new FormData();

     // Append the fields to the formData
     formData.append("name", name);
     formData.append("breed", breed);
     formData.append("age", age);
     formData.append("phone", phone);
     formData.append("description", description);
     formData.append("profileId", profileId);
     formData.append("shelterName", shelterName);
     formData.append("shelterLocation", shelterLocation);

     // Append the image file to the formData
     image.forEach((item)=>formData.append("image", item));

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state

    
    axios
      .post(`${API_URL}/shelter/profile`, formData)
      .then((response) => {
        console.log(response);
        setIsSent(true);

        return true
        
      })
      .then((result)=>{

        console.log(result);
        if (result){
          setTimeout(() => {
            setIsSent(false);
          }, 5000);}


      })
      .catch((error) => {

        if(error.response.data.message.startsWith("Inter"))
        
        {const errorDescription =
          " Only up to 5 pictures are allowed and jpg and png formats. Try to submit the listing again!";
        setErrorMessage(errorDescription);}
        else {
          const errorDescription =
            error.response.data.message;
          setErrorMessage(errorDescription);


        }
        
        
      });

    setName("");
    setBreed("");
    setAge("");
    setPhone("");
    setImage([]);
    setDescription("");
    setProfileId("");

    console.log("is sent:" + isSent);
    
    console.log("is sent:" + isSent);
    

  };

  console.log(image);
  console.log(errorMessage);
  console.log("is sent:" + isSent);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add a new listing
        </h2>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleDogSubmit}
            encType="multipart/form-data">
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
                  onChange={handleName}
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
                  onChange={handleBreed}
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
                  onChange={handleAge}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Phone
                </label>
                <input
                  type="phone"
                  name="phone"
                  placeholder="+44 3460 97343"
                  value={phone}
                  onChange={handlePhone}
                  className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  multiple
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Images
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/png, image/jpeg"
                  multiple
                  onChange={handleImage}
                  className="block"
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  placeholder="Good Boy!"
                  value={description}
                  onChange={handleDescription}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <button
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              type="submit">
              Add Listing
            </button>
          </form>
          {errorMessage && (
            <div className="flex flex-col gap-2 m-3">
              <Alert color="orange" variant="ghost">
                <span>{errorMessage}</span>
              </Alert>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 m-3">
        {isSent && (
          <Alert color="green">
            Your Listing has been processed successfully!
          </Alert>
        )}</div>
        
      </div>
    </div>
  );
}

export default NewListing;
