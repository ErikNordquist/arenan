import React, { useState } from 'react';
import { Character } from '../models/Character';
import { Monster, monsters } from '../models/Monsters';

interface Props {
  character: Character;
  onFightEnd: (experienceGained: number) => void;
}

function MonsterFight({ character, onFightEnd }: Props) {
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  const [fightLog, setFightLog] = useState<string[]>([]);

  const selectMonster = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const monster = monsters.find(m => m.name === event.target.value);
    setSelectedMonster(monster || null);
    setFightLog([]);
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

  const fight = () => {
    if (!selectedMonster) return;

    let monsterHealth = selectedMonster.health;
    let characterHealth = character.skills.health * 10;
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
  };

  return (
    <div>
      <h2>Monster Fight</h2>
      <div>
        <select onChange={selectMonster} value={selectedMonster?.name || ''}>
          <option value="">Select a monster</option>
          {monsters.map((monster) => (
            <option key={monster.name} value={monster.name}>
              {monster.name} (Level {monster.level})
            </option>
          ))}
        </select>
      </div>
      {selectedMonster && (
        <div>
          <h3>Selected Monster: {selectedMonster.name}</h3>
          <p>Level: {selectedMonster.level}</p>
          <p>Health: {selectedMonster.health}</p>
          <p>Attack: {selectedMonster.attack}</p>
          <p>Defense: {selectedMonster.defense}</p>
          <button onClick={fight}>Start Fight</button>
        </div>
      )}
      <div style={{ whiteSpace: 'pre-line', marginTop: '20px' }}>
        {fightLog.join('\n')}
      </div>
    </div>
  );
}

export default MonsterFight;