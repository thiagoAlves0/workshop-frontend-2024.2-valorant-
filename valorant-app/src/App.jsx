import React, { useState, useEffect } from "react";
import CharacterCard from "./components/CharacterCard";
import "./styles/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    fetch("https://valorant-api.com/v1/agents")
      .then((response) => response.json())
      .then((data) => {
        const playableAgents = data.data.filter(
          (agent) => agent.isPlayableCharacter
        );
        setCharacters(playableAgents);
      })
      .catch((error) => console.error("Erro ao buscar personagens:", error));
  }, []);

  const filteredCharacters = characters.filter((character) =>
    character.displayName.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Valorant Agents</h1>
      </header>
      
      <div className={`floating-search ${searchVisible ? "active" : ""}`}>
        <input
          type="text"
          placeholder="Buscar personagem..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="search-icon"
          onClick={toggleSearch}
        />
      </div>

      <main id="personagens">
        {filteredCharacters.map((character) => (
          <CharacterCard key={character.uuid} character={character} />
        ))}
      </main>
    </div>
  );
}

export default App;
