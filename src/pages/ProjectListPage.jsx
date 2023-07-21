/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddProject from "../components/AddProject";
import ProjectCard from "../components/ProjectCard";

const API_URL = "http://localhost:5008";

function ProjectListPage() {
  const [projects, setProjects] = useState([]);

  const getAllProjects = () => {

    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="ProjectListPage">
      {projects.map((project) => {
        return (
          <div className="ProjectListPage">
            <AddProject refreshProjects={getAllProjects} />
            {projects.map((project) => (
              <ProjectCard key={project._id} {...project} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default ProjectListPage;
