import React, { useState, useEffect } from "react";

import api from "./services/api";

import RepositoryList from "./components/RepositoryList";
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
        alert(err);
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
        url: "https://github.com/renangarcia",
        title: inputText,
        techs: [],
      });
      setRepositories([...repositories, data]);
      setInputText("");
    } catch (err) {
      alert(err);
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
      <RepositoryList
        repositories={repositories}
        onRemoveItem={handleRemoveRepository}
      />

      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
