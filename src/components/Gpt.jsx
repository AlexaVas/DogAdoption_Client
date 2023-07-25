import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5008";

const Gpt = ({ breed, name }) => {
  const [state, setState] = useState({
    apartment: "",
    active: "",
    exp: "",
    advice: "",
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleGptSubmit = (event) => {
    event.preventDefault();

    const { apartment, active, exp } = state;

    if (apartment || exp || active) {
      const requestLogInBody = {
        breed,
        active,
        apartment,
        exp,
      };

      axios
        .post(`${API_URL}/gpt/`, requestLogInBody)
        .then((response) => {
          const advice = response.data.text;
          setState((prevState) => ({
            ...prevState,
            advice,
            apartment: "",
            active: "",
            exp: "",
          }));
        })
        .catch((error) => {
          console.error("Error while making the POST request:", error);
        });
    }
  };
  
  return (
    <div>
      <p className="text-base font-semibold leading-7 text-blue-600">AI Bud</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Find out if {name} is a good fit for you:
      </h1>
      <form className="mt-2 space-y-4">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            What type of place do you have?
          </label>
          <select
            className="rounded-md"
            name="apartment"
            value={state.apartment}
            onChange={handleChange}
          >
            <option></option>
            <option value="apartment">Apartment</option>
            <option value="house with garden">House with backyard</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Are you active?
          </label>
          <select
            className="rounded-md"
            name="active"
            value={state.active}
            onChange={handleChange}
          >
            <option></option>
            <option value="active">Active</option>
            <option value="Not active">Not Active</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Have you had a dog before?
          </label>
          <select
            className="rounded-md"
            name="exp"
            value={state.exp}
            onChange={handleChange}
          >
            <option></option>
            <option value="not experienced">First time dog owner</option>
            <option value="experienced">Experienced dog owner</option>
          </select>
        </div>
      </form>
      <button
        onClick={handleGptSubmit}
        className="py-1 px-3 bg-transparent hover:bg-gray-200 text-gray-500 font-semibold hover:text-gray-700 border border-gray-500 hover:border-transparent rounded"
      >
        Check
      </button>

      {state.advice && (
        <div>
          <h3>Your Result:</h3>
          <div className="mt-10 gap-8 text-base leading-7 text-gray-700">
            <p>{state.advice}</p>
          </div>
        </div>
      )}
    </div>
  );
}
