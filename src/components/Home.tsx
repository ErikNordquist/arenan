import React from 'react';
import { Character, experienceForNextLevel } from '../models/Character';
import { Equipment, EquipmentSlot } from '../models/Equipment';

interface Props {
  character: Character;
  onMenuSelect: (menu: string) => void;
}

function Home({ character, onMenuSelect }: Props) {
  const nextLevelExperience = experienceForNextLevel(character.level);
  const experienceToNextLevel = nextLevelExperience - character.experience;

  const renderEquipmentSlot = (slot: EquipmentSlot) => {
    const item = character.equipment[slot];
    return (
      <p>{slot.charAt(0).toUpperCase() + slot.slice(1)}: {item ? item.name : 'Empty'}</p>
    );
  };

  return (
    <div>
      <h2>Welcome Home, {character.name}!</h2>
      <img src={character.profilePicture} alt={`${character.name}'s profile`} style={{ width: '200px', height: '200px' }} />
      <p>Race: {character.race}</p>
      <p>Level: {character.level}</p>
      <p>Experience: {character.experience}</p>
      <p>Experience to next level: {experienceToNextLevel}</p>
      <p>Health: {character.currentHealth} / {character.maxHealth}</p>
      
      <h3>Attributes:</h3>
      <ul>
        {Object.entries(character.attributes).map(([attrName, value]) => (
          <li key={attrName}>
            {attrName.charAt(0).toUpperCase() + attrName.slice(1)}: {value}
          </li>
        ))}
      </ul>

      <h3>Skills:</h3>
      <ul>
        {Object.entries(character.skills).map(([skillName, value]) => (
          <li key={skillName}>{skillName.charAt(0).toUpperCase() + skillName.slice(1)}: {value}</li>
        ))}
      </ul>
      
      <h3>Equipment:</h3>
      {Object.keys(character.equipment).map((slot) => 
        renderEquipmentSlot(slot as EquipmentSlot)
      )}

      <h3>Inventory:</h3>
      {character.inventory.length === 0 ? (
        <p>Your inventory is empty.</p>
      ) : (
        <ul>
          {character.inventory.map((item, index) => (
            <li key={index}>
              {item.item.name} (Quantity: {item.quantity})
            </li>
          ))}
        </ul>
      )}

      <p>Gold: {character.gold}</p>

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