import React, { useState, useEffect } from "react";

import api from "./services/api";
import Repository from "./Repository";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [inputText, setInputText] = useState("");

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

  function handleInputChange(event) {
    setInputText(event.target.value);
  }

  async function handleAddRepository() {
    try {
      const { data } = await api.post("/repositories", {
        url: "https://github.com/josepholiveira",
        title: inputText,
        techs: ["React", "Node.js"],
      });
      setRepositories([...repositories, data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      setRepositories(repositories.filter((repo) => repo.id !== id));
    } catch (err) {
      console.log(err);
    }
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

      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
