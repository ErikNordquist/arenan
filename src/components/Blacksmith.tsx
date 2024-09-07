import React from 'react';
import { Character } from '../models/Character';
import { Weapon, Armor, InventoryItem } from '../models/Equipment';

interface Props {
  character: Character;
  onPurchase: (item: Weapon | Armor) => void;
}

const availableItems: (Weapon | Armor)[] = [
  { name: 'Iron Sword', damage: 10, value: 50 },
  { name: 'Steel Sword', damage: 15, value: 100 },
  { name: 'Leather Armor', defense: 5, value: 50 },
  { name: 'Chain Mail', defense: 10, value: 100 },
];

function Blacksmith({ character, onPurchase }: Props) {
  const handlePurchase = (item: Weapon | Armor) => {
    if (character.gold >= item.value) {
      onPurchase(item);
    } else {
      alert("Not enough gold!");
    }
  };

  return (
    <div>
      <h2>Blacksmith</h2>
      <p>Your Gold: {character.gold}</p>
      <h3>Available Items:</h3>
      <ul>
        {availableItems.map((item, index) => (
          <li key={index}>
            {item.name} - {
              'damage' in item ? `Damage: ${item.damage}` : `Defense: ${item.defense}`
            } - Value: {item.value} gold
            <button onClick={() => handlePurchase(item)}>Buy</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Blacksmith;