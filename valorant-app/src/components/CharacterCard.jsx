import React from 'react';
import './CharacterCard.css';

function CharacterCard({ character }) {
  return (
    <div className="character">
      <h2 className="character-name">{character.displayName}</h2>
      <div className="character-image">
        <img src={character.displayIcon} alt={character.displayName} />
      </div>
      <div className="character-description">
        <p>
          <strong>Description:</strong> {character.description || 'Descrição não disponível'}
        </p>
      </div>
    </div>
  );
}

export default CharacterCard;
