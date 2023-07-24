import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5008';

function SheltersListPage() {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/shelters`)
      .then((response) => {
        const sheltersData = response.data;
        setShelters(sheltersData);
        console.log(sheltersData);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>List of Shelters</h1>
      <ul>
        {shelters.map((shelter) => (
          <li key={shelter._id}>{shelter.name} - {shelter.location}</li>
        ))}
      </ul>
    </div>
  );
}

export default SheltersListPage;
