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

  const selectMonster = (monster: Monster) => {
    setSelectedMonster(monster);
    setFightLog([]);
  };

  const fight = () => {
    if (!selectedMonster) return;

    let monsterHealth = selectedMonster.health;
    let characterHealth = character.skills.health * 10; // Assuming each health point gives 10 HP
    let log: string[] = [];

    while (monsterHealth > 0 && characterHealth > 0) {
      // Character attacks
      const characterDamage = Math.max(0, character.skills.strength - selectedMonster.defense);
      monsterHealth -= characterDamage;
      log.push(`${character.name} deals ${characterDamage} damage to ${selectedMonster.name}`);

      if (monsterHealth <= 0) break;

      // Monster attacks
      const monsterDamage = Math.max(0, selectedMonster.attack - character.skills.agility);
      characterHealth -= monsterDamage;
      log.push(`${selectedMonster.name} deals ${monsterDamage} damage to ${character.name}`);
    }

    if (characterHealth > 0) {
      log.push(`${character.name} defeats ${selectedMonster.name}!`);
      onFightEnd(selectedMonster.experience);
    } else {
      log.push(`${character.name} was defeated by ${selectedMonster.name}.`);
      onFightEnd(0);
    }

    setFightLog(log);
  };

  return (
    <div>
      <h2>Monster Fight</h2>
      <div>
        {monsters.map((monster) => (
          <button key={monster.name} onClick={() => selectMonster(monster)}>
            Fight {monster.name} (Level {monster.level})
          </button>
        ))}
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
      <div>
        {fightLog.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
}

export default MonsterFight;