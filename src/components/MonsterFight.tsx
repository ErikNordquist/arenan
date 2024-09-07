import React, { useState, useEffect } from 'react';
import { Character } from '../models/Character';
import { Monster, monsters } from '../models/Monsters';

interface Props {
  character: Character;
  onFightEnd: (experienceGained: number) => void;
  onReturnHome: () => void;
}

// Add descriptions for each monster
const monsterDescriptions: { [key: string]: string } = {
  "Cave Rat": "A large, vicious rodent that dwells in dark caverns. Its beady eyes gleam with malice.",
  "Goblin": "A small, green-skinned creature known for its mischievous nature and surprising strength.",
  "Giant Spider": "A terrifying arachnid of enormous size, its web sticky and strong enough to trap the unwary.",
  "Troll": "A lumbering beast with regenerative abilities, known for its brute strength and low intelligence.",
  "Cyclops": "A one-eyed giant of Greek mythology, powerful but with poor depth perception.",
  "Troll Champion": "The mightiest of trolls, battle-hardened and far more cunning than its lesser kin.",
  "Dragon": "A majestic and terrifying creature of legend, breathing fire and possessing ancient wisdom.",
  "Dragon Lord": "The most powerful of dragons, commanding respect and fear from all who behold it."
};

function MonsterFight({ character, onFightEnd, onReturnHome }: Props) {
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  const [fightLog, setFightLog] = useState<string[]>([]);
  const [isFighting, setIsFighting] = useState(false);
  const [fightEnded, setFightEnded] = useState(false);
  const [availableMonsters, setAvailableMonsters] = useState<Monster[]>([]);

  useEffect(() => {
    // Filter monsters based on character level
    const filtered = monsters.filter(monster => 
      character.level >= monster.minLevel - 1 && character.level <= monster.maxLevel + 1
    );
    setAvailableMonsters(filtered);
  }, [character.level]);

  const selectMonster = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const monster = monsters.find(m => m.name === event.target.value);
    setSelectedMonster(monster || null);
    setFightLog([]);
    setIsFighting(false);
  };

  const generateCommentary = (attacker: string, defender: string, damage: number, remainingHealth: number): string => {
    const actions = [
      `${attacker} lunges forward with a powerful strike`,
      `${attacker} executes a swift maneuver`,
      `${attacker} unleashes a flurry of attacks`,
      `${attacker} finds an opening in ${defender}'s defense`,
    ];
    const impacts = [
      `landing a solid hit`,
      `connecting with precision`,
      `striking true`,
      `dealing a significant blow`,
    ];
    const reactions = [
      `${defender} staggers back`,
      `${defender} winces in pain`,
      `${defender} barely maintains their footing`,
      `${defender} reels from the impact`,
    ];

    const action = actions[Math.floor(Math.random() * actions.length)];
    const impact = impacts[Math.floor(Math.random() * impacts.length)];
    const reaction = reactions[Math.floor(Math.random() * reactions.length)];

    return `${action}, ${impact}. ${reaction}. ${defender} takes ${damage} damage and has ${remainingHealth} health remaining.`;
  };

  const calculateCharacterHealth = (healthAttribute: number) => {
    return healthAttribute * 10;
  };

  const fight = () => {
    if (!selectedMonster) return;

    let monsterHealth = selectedMonster.health;
    let characterHealth = calculateCharacterHealth(character.attributes.health);
    let log: string[] = [];
    let round = 1;

    log.push(`The battle between ${character.name} and ${selectedMonster.name} begins in the grand arena!`);

    while (monsterHealth > 0 && characterHealth > 0) {
      log.push(`\nRound ${round}:`);

      // Character attacks
      const characterDamage = Math.max(0, character.skills.strength - selectedMonster.defense);
      monsterHealth -= characterDamage;
      log.push(generateCommentary(character.name, selectedMonster.name, characterDamage, Math.max(0, monsterHealth)));

      if (monsterHealth <= 0) break;

      // Monster attacks
      const monsterDamage = Math.max(0, selectedMonster.attack - character.skills.agility);
      characterHealth -= monsterDamage;
      log.push(generateCommentary(selectedMonster.name, character.name, monsterDamage, Math.max(0, characterHealth)));

      round++;
    }

    if (characterHealth > 0) {
      log.push(`\nWith a final, decisive blow, ${character.name} emerges victorious over ${selectedMonster.name}! The crowd erupts in cheers as ${character.name} stands triumphant in the arena.`);
      onFightEnd(selectedMonster.experience);
    } else {
      log.push(`\nDespite a valiant effort, ${character.name} falls to the mighty ${selectedMonster.name}. The arena grows silent as the battle concludes.`);
      onFightEnd(0);
    }

    setFightLog(log);
    setIsFighting(true);
    setFightEnded(true);
  };

  return (
    <div>
      <h2>Monster Fight</h2>
      {!isFighting ? (
        <div>
          <select onChange={selectMonster} value={selectedMonster?.name || ''}>
            <option value="">Select a monster</option>
            {availableMonsters.map((monster) => (
              <option key={monster.name} value={monster.name}>
                {monster.name} (Level {monster.level}, Challenge: {monster.minLevel}-{monster.maxLevel})
              </option>
            ))}
          </select>
          {selectedMonster && (
            <div>
              <h3>Selected Monster: {selectedMonster.name}</h3>
              <p>{monsterDescriptions[selectedMonster.name]}</p>
              <p>Level: {selectedMonster.level}</p>
              <p>Health: {selectedMonster.health}</p>
              <p>Attack: {selectedMonster.attack}</p>
              <p>Defense: {selectedMonster.defense}</p>
              <p>Challenge Level Range: {selectedMonster.minLevel}-{selectedMonster.maxLevel}</p>
              <button onClick={fight}>Start Fight</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h3>Battle Results</h3>
          <div style={{ whiteSpace: 'pre-line', marginTop: '20px', maxHeight: '400px', overflowY: 'auto' }}>
            {fightLog.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
          </div>
          {fightEnded && <button onClick={onReturnHome}>Return Home</button>}
        </div>
      )}
    </div>
  );
}

export default MonsterFight;