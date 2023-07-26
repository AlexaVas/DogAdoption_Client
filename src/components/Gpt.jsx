import { useState } from "react";
import axios from "axios";
const API_URL = "http://localhost:5008";
function Gpt(props) {
  const breed = props.breed;
  const name = props.name;
  const [apartment, setApartment] = useState("");
  const [active, setActive] = useState("");
  const [exp, setExp] = useState("");
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(apartment, active, exp);
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
        })
    }
  };
  console.log(advice);
  if(isLoading) return <div>loading...</div>;
  return (
    <div>
      <h3>Check if your lifestyle matches {name}´s needs!</h3>
      <form>
        <label>You live at </label>
        <select value={apartment} onChange={handleLivingSituationChange}>
          <option></option>
          <option value="apartment">Apartment</option>
          <option value="house with garden">House with garden</option>
        </select>
        <label>You are </label>
        <select value={active} onChange={handleActivityLevelChange}>
          <option></option>
          <option value="active">Active</option>
          <option value="Not active">Not Active</option>
        </select>
        <label>You are</label>
        <select value={exp} onChange={handleDogExperienceChange}>
          <option></option>
          <option value="not experienced">First time dog owner</option>
          <option value="experienced">Experienced dog owner</option>
        </select>
      </form>
      <button onClick={handleGptSubmit}>Check</button>
      {advice && (
        <div>
          <h3>Your Answers</h3>
          <p>{advice}</p>
        </div>
      )}
    </div>
  );
}
export default Gpt;
