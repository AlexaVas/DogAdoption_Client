import { useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import animationData from "/src/assets/animation_lkjpco1p.json";
const API_URL = "http://localhost:5008";

function Gpt(props) {
  const breed = props.breed;
  const name = props.name;
  const [apartment, setApartment] = useState("");
  const [active, setActive] = useState("");
  const [exp, setExp] = useState("");
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [textGenerated, setTextGenerated] = useState(false); // State to track if text is generated

  const handleLivingSituationChange = (event) => {
    setApartment(event.target.value);
  };

  const handleActivityLevelChange = (event) => {
    setActive(event.target.value);
  };

  const handleDogExperienceChange = (event) => {
    setExp(event.target.value);
  };

  const handleGptSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const requestLogInBody = {
      breed: breed,
      active: active,
      apartment: apartment,
      exp: exp,
    };

    if (apartment !== "" || exp !== "" || active !== "") {
      axios
        .post(`${API_URL}/gpt/`, requestLogInBody)
        .then((response) => {
          const advice = response.data.text;
          setAdvice(advice);
          console.log(advice);
          setTextGenerated(true); // Set the state to indicate that text is generated
        })
        .then(() => {
          setApartment("");
          setActive("");
          setExp("");
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error while making the POST request:", error);
        });
    }
  };

  if (isLoading) return <div><Lottie animationData={animationData} style={{ width: 200, height: 200 }} /></div>;

  return (
    <div>
      <p className="text-base font-semibold leading-7 text-blue-600">AI Bud</p>

      {/* Hide the heading and form when text is generated */}
      {!textGenerated && (
        <>
          <h3 className="mt-2 text-lg font-bold tracking-tight text-gray-900 sm:text-xl">Find out if {name} is a good fit for you!</h3>

          <form className="mt-8 space-y-4">
            <label className="block text-sm font-medium leading-6 text-gray-700">What type of place do you have?</label>
            <select className="rounded-md w-full" value={apartment} onChange={handleLivingSituationChange}>
              <option></option>
              <option value="apartment">Apartment</option>
              <option value="house with garden">House with garden</option>
            </select>
            <label className="block text-sm font-medium leading-6 text-gray-700">How active are you?</label>
            <select className="rounded-md w-full" value={active} onChange={handleActivityLevelChange}>
              <option></option>
              <option value="active">Active</option>
              <option value="Not active">Not Active</option>
            </select>
            <label className="block text-sm font-medium leading-6 text-gray-700">What's your experience level with dogs?</label>
            <select className="rounded-md w-full" value={exp} onChange={handleDogExperienceChange}>
              <option></option>
              <option value="not experienced">First time dog owner</option>
              <option value="experienced">Experienced dog owner</option>
            </select>
          </form>

          <button
            className="my-4 py-1 px-3 bg-transparent hover:bg-gray-200 text-gray-500 font-semibold hover:text-gray-700 border border-gray-500 hover:border-transparent rounded"
            onClick={handleGptSubmit}
          >
            Get results
          </button>
        </>
      )}

      {advice && (
        <div>
          <h4 className="text-md font-semibold leading-8 text-gray-800 my-5">Our Recommendation:</h4>
          <p className="text-sm font-light">{advice}</p>
        </div>
      )}
    </div>
  );
}

export default Gpt;
