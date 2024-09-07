import React from 'react';
import { Character } from '../models/Character';

interface Props {
  characters: Character[];
  onSelectCharacter: (character: Character) => void;
  onCreateNewCharacter: () => void;
}

function MyCharacters({ characters, onSelectCharacter, onCreateNewCharacter }: Props) {
  return (
    <div>
      <h2>My Characters</h2>
      {characters.map((character, index) => (
        <div key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h3>{character.name}</h3>
          <p>Race: {character.race}</p>
          <p>Level: {character.level}</p>
          <button onClick={() => onSelectCharacter(character)}>Select Character</button>
        </div>
      ))}
      {characters.length < 3 && (
        <button onClick={onCreateNewCharacter}>Create New Character</button>
      )}
      {characters.length >= 3 && (
        <p>Maximum number of characters reached (3).</p>
      )}
    </div>
  );
}

export default MyCharacters;