import React, { useState } from 'react';
import { Skills } from '../models/Character';

interface Props {
  onSkillAllocationComplete: (skills: Skills) => void;
}

const initialSkills: Skills = {
  health: 5,
  mana: 5,
  stamina: 5,
  initiative: 5,
  intelligence: 5,
  strength: 5,
  agility: 5,
};

function SkillAllocation({ onSkillAllocationComplete }: Props) {
  const [skills, setSkills] = useState<Skills>(initialSkills);
  const [remainingPoints, setRemainingPoints] = useState(10);

  const handleSkillChange = (skillName: keyof Skills, value: number) => {
    const currentValue = skills[skillName];
    const pointDifference = value - currentValue;

    if (remainingPoints - pointDifference >= 0) {
      setSkills({ ...skills, [skillName]: value });
      setRemainingPoints(remainingPoints - pointDifference);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSkillAllocationComplete(skills);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Allocate Skill Points</h2>
      <p>Remaining Points: {remainingPoints}</p>
      {Object.entries(skills).map(([skillName, value]) => (
        <div key={skillName}>
          <label htmlFor={skillName}>{skillName.charAt(0).toUpperCase() + skillName.slice(1)}:</label>
          <input
            type="number"
            id={skillName}
            value={value}
            min={5}
            max={15}
            onChange={(e) => handleSkillChange(skillName as keyof Skills, parseInt(e.target.value))}
          />
        </div>
      ))}
      <button type="submit" disabled={remainingPoints > 0}>
        Create Character
      </button>
    </form>
  );
}

export default SkillAllocation;