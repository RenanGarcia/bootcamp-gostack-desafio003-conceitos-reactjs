import React, { useState, useEffect } from "react";

import api from "./services/api";
import Repository from "./Repository";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      try {
        const { data } = await api.get("/repositories");
        setRepositories(data);
      } catch (err) {
        console.log(err);
      }
    }

    getRepositories();
  }, []);

  async function handleAddRepository() {
    try {
      const { data } = await api.post("/repositories", {
        url: "https://github.com/josepholiveira",
        title: `Desafio ${Math.random()}`,
        techs: ["React", "Node.js"],
      });
      setRepositories([...repositories, data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <Repository
            key={`repository-list_${id}`}
            title={title}
            onRemove={() => handleRemoveRepository(id)}
          />
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
