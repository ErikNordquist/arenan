import React from 'react';
import { Character } from '../models/Character';
import { Weapon, Armor, Accessory, EquipmentSlot } from '../models/Equipment';

interface Props {
  character: Character;
  onPurchase: (item: Weapon | Armor | Accessory, slot: EquipmentSlot) => void;
}

const availableItems: (Weapon | Armor | Accessory)[] = [
  { name: 'Iron Sword', damage: 10, value: 50 },
  { name: 'Steel Sword', damage: 15, value: 100 },
  { name: 'Leather Armor', defense: 5, value: 50 },
  { name: 'Chain Mail', defense: 10, value: 100 },
  { name: 'Iron Helmet', defense: 3, value: 30 },
  { name: 'Leather Boots', defense: 2, value: 25 },
  { name: 'Wooden Shield', defense: 4, value: 40 },
  { name: 'Silver Necklace', effect: '+1 Strength', value: 75 },
  { name: 'Ruby Ring', effect: '+2 Health', value: 100 },
  { name: 'Lucky Charm', effect: '+1 Initiative', value: 50 },
];

function Blacksmith({ character, onPurchase }: Props) {
  const handlePurchase = (item: Weapon | Armor | Accessory) => {
    if (character.gold >= item.value) {
      let slot: EquipmentSlot;
      if ('damage' in item) slot = 'weapon';
      else if ('defense' in item) {
        if (item.name.toLowerCase().includes('helmet')) slot = 'helmet';
        else if (item.name.toLowerCase().includes('boots')) slot = 'boots';
        else if (item.name.toLowerCase().includes('shield')) slot = 'shield';
        else slot = 'armor';
      }
      else {
        if (item.name.toLowerCase().includes('necklace')) slot = 'necklace';
        else if (item.name.toLowerCase().includes('ring')) {
          slot = character.equipment.ring1 ? 'ring2' : 'ring1';
        }
        else slot = 'trinket';
      }
      onPurchase(item, slot);
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
              'damage' in item ? `Damage: ${item.damage}` : 
              'defense' in item ? `Defense: ${item.defense}` :
              `Effect: ${item.effect}`
            } - Value: {item.value} gold
            <button onClick={() => handlePurchase(item)}>Buy</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Blacksmith;