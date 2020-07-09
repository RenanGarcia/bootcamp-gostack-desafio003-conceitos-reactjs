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
    // TODO
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
