import React from 'react';
import { Character, experienceForNextLevel } from '../models/Character';

interface Props {
  character: Character;
  onMenuSelect: (menu: string) => void;
}

function Home({ character, onMenuSelect }: Props) {
  const nextLevelExperience = experienceForNextLevel(character.level);
  const experienceToNextLevel = nextLevelExperience - character.experience;

  const calculateCharacterHealth = (healthAttribute: number) => {
    return healthAttribute * 10;
  };

  return (
    <div>
      <h2>Welcome Home, {character.name}!</h2>
      <img src={character.profilePicture} alt={`${character.name}'s profile`} style={{ width: '200px', height: '200px' }} />
      <p>Race: {character.race}</p>
      <p>Level: {character.level}</p>
      <p>Experience: {character.experience}</p>
      <p>Experience to next level: {experienceToNextLevel}</p>
      
      <h3>Attributes:</h3>
      <ul>
        {Object.entries(character.attributes).map(([attrName, value]) => (
          <li key={attrName}>
            {attrName.charAt(0).toUpperCase() + attrName.slice(1)}: {value}
            {attrName === 'health' && ` (Total HP: ${calculateCharacterHealth(value)})`}
          </li>
        ))}
      </ul>

      <h3>Skills:</h3>
      <ul>
        {Object.entries(character.skills).map(([skillName, value]) => (
          <li key={skillName}>{skillName.charAt(0).toUpperCase() + skillName.slice(1)}: {value}</li>
        ))}
      </ul>
      
      <h3>Menu</h3>
      <div>
        <button onClick={() => onMenuSelect('fight')}>Fight Monsters</button>
        <button onClick={() => onMenuSelect('duel')}>Duel</button>
        <button onClick={() => onMenuSelect('challenges')}>Challenges</button>
        <button onClick={() => onMenuSelect('competitors')}>Find Competitors</button>
        <button onClick={() => onMenuSelect('craft')}>Craft</button>
        <button onClick={() => onMenuSelect('tavern')}>Tavern</button>
      </div>
    </div>
  );
}

export default Home;