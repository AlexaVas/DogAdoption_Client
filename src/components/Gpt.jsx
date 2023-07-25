import { useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5008";

const Gpt = ({ breed, name }) => {

    const [state, setState] = useState({
        apartment: '',
        active: '',
        exp: '',
        advice: '',
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

            axios.post(`${API_URL}/gpt/`, requestLogInBody)
                .then((response) => {
                    const advice = response.data.text;
                    setState((prevState) => ({
                        ...prevState,
                        advice,
                        apartment: '',
                        active: '',
                        exp: '',
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
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Find out if {name} is a good fit for you:</h1>
            <form className="flex mt-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">What type of place do you have?</label>
                <select name="apartment" value={state.apartment} onChange={handleChange}>
                    <option></option>
                    <option value="apartment">Apartment</option>
                    <option value="house with garden">House with backyard</option>
                </select>
                <label className="block text-sm font-medium leading-6 text-gray-900">Are you active?</label>
                <select name="active" value={state.active} onChange={handleChange}>
                    <option></option>
                    <option value="active">Active</option>
                    <option value="Not active">Not Active</option>
                </select>
                <label className="block text-sm font-medium leading-6 text-gray-900">Have you had a dog before?</label>
                <select name="exp" value={state.exp} onChange={handleChange}>
                    <option></option>
                    <option value="not experienced">First time dog owner</option>
                    <option value="experienced">Experienced dog owner</option>
                </select>
            </form>
            <button onClick={handleGptSubmit}>Check</button>

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

export default Gpt;
