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
  const [forfeitPercentage, setForfeitPercentage] = useState(0);

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

  const calculateHealth = (entity: Character | Monster) => {
    return entity.attributes.health * 10;
  };

  const fight = () => {
    if (!selectedMonster) return;

    let monsterHealth = calculateHealth(selectedMonster);
    let characterHealth = calculateHealth(character);
    const forfeitThreshold = characterHealth * (forfeitPercentage / 100);
    let characterStamina = character.skills.stamina * 2;
    let monsterStamina = selectedMonster.skills.stamina * 2;
    let log: string[] = [];
    let round = 1;

    log.push(`The battle between ${character.name} and ${selectedMonster.name} begins in the grand arena!`);
    log.push(`${character.name} will forfeit if their health falls below ${forfeitThreshold.toFixed(0)} (${forfeitPercentage}% of max health).`);

    while (true) {
      log.push(`\nRound ${round}:`);

      // Check for exhaustion
      if (characterStamina <= 0) {
        log.push(`${character.name} becomes exhausted and can no longer fight!`);
        break;
      }
      if (monsterStamina <= 0) {
        log.push(`${selectedMonster.name} becomes exhausted and can no longer fight!`);
        break;
      }

      // Determine who acts first based on initiative
      const characterInitiativeRoll = Math.random() * character.skills.initiative;
      const monsterInitiativeRoll = Math.random() * selectedMonster.skills.initiative;

      if (characterInitiativeRoll >= monsterInitiativeRoll) {
        // Character attacks
        const hitChance = 0.5 + (character.skills.agility - selectedMonster.skills.agility) * 0.05;
        if (Math.random() < hitChance) {
          const characterDamage = Math.max(1, character.skills.strength - selectedMonster.skills.strength);
          monsterHealth -= characterDamage;
          log.push(generateCommentary(character.name, selectedMonster.name, characterDamage, Math.max(0, monsterHealth)));
        } else {
          log.push(`${character.name}'s attack misses!`);
        }

        // Monster attacks if still alive
        if (monsterHealth > 0) {
          const monsterHitChance = 0.5 + (selectedMonster.skills.agility - character.skills.agility) * 0.05;
          if (Math.random() < monsterHitChance) {
            const monsterDamage = Math.max(1, selectedMonster.skills.strength - character.skills.strength);
            characterHealth -= monsterDamage;
            log.push(generateCommentary(selectedMonster.name, character.name, monsterDamage, Math.max(0, characterHealth)));
          } else {
            log.push(`${selectedMonster.name}'s attack misses!`);
          }
        }
      } else {
        // Monster attacks first
        const monsterHitChance = 0.5 + (selectedMonster.skills.agility - character.skills.agility) * 0.05;
        if (Math.random() < monsterHitChance) {
          const monsterDamage = Math.max(1, selectedMonster.skills.strength - character.skills.strength);
          characterHealth -= monsterDamage;
          log.push(generateCommentary(selectedMonster.name, character.name, monsterDamage, Math.max(0, characterHealth)));
        } else {
          log.push(`${selectedMonster.name}'s attack misses!`);
        }

        // Character attacks if still alive
        if (characterHealth > 0) {
          const hitChance = 0.5 + (character.skills.agility - selectedMonster.skills.agility) * 0.05;
          if (Math.random() < hitChance) {
            const characterDamage = Math.max(1, character.skills.strength - selectedMonster.skills.strength);
            monsterHealth -= characterDamage;
            log.push(generateCommentary(character.name, selectedMonster.name, characterDamage, Math.max(0, monsterHealth)));
          } else {
            log.push(`${character.name}'s attack misses!`);
          }
        }
      }

      // Reduce stamina
      characterStamina--;
      monsterStamina--;

      // Check for fight end conditions
      if (monsterHealth <= 0) {
        log.push(`\n${selectedMonster.name} has been defeated!`);
        break;
      }
      if (characterHealth <= 0) {
        log.push(`\n${character.name} has been defeated!`);
        break;
      }
      if (characterHealth <= forfeitThreshold) {
        log.push(`\n${character.name}'s health has fallen below the forfeit threshold of ${forfeitThreshold.toFixed(0)}!`);
        break;
      }

      round++;
    }

    // Determine fight outcome
    if (monsterHealth <= 0 || monsterStamina <= 0) {
      log.push(`\nWith a final, decisive blow, ${character.name} emerges victorious over ${selectedMonster.name}! The crowd erupts in cheers as ${character.name} stands triumphant in the arena.`);
      onFightEnd(selectedMonster.experience);
    } else if (characterHealth <= 0 || characterHealth <= forfeitThreshold || characterStamina <= 0) {
      if (characterHealth <= forfeitThreshold) {
        log.push(`\n${character.name} forfeits the fight as their health has fallen below ${forfeitThreshold.toFixed(0)}. ${selectedMonster.name} is declared the winner.`);
      } else if (characterStamina <= 0) {
        log.push(`\n${character.name} is too exhausted to continue. ${selectedMonster.name} is declared the winner.`);
      } else {
        log.push(`\nDespite a valiant effort, ${character.name} falls to the mighty ${selectedMonster.name}. The arena grows silent as the battle concludes.`);
      }
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
              <p>Health: {calculateHealth(selectedMonster)}</p>
              <p>Attributes:</p>
              <ul>
                {Object.entries(selectedMonster.attributes).map(([key, value]) => (
                  <li key={key}>{key}: {value}</li>
                ))}
              </ul>
              <p>Skills:</p>
              <ul>
                {Object.entries(selectedMonster.skills).map(([key, value]) => (
                  <li key={key}>{key}: {value}</li>
                ))}
              </ul>
              <p>Challenge Level Range: {selectedMonster.minLevel}-{selectedMonster.maxLevel}</p>
              <div>
                <label htmlFor="forfeitPercentage">Forfeit Threshold: </label>
                <select
                  id="forfeitPercentage"
                  value={forfeitPercentage}
                  onChange={(e) => setForfeitPercentage(Number(e.target.value))}
                >
                  <option value={0}>No forfeit</option>
                  {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((percent) => (
                    <option key={percent} value={percent}>
                      {percent}% of max health
                    </option>
                  ))}
                </select>
              </div>
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