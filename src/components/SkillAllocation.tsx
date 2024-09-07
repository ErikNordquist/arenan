import React, { useState } from 'react';
import { Skills, Attributes } from '../models/Character';

interface Props {
  onSkillAllocationComplete: (skills: Skills, attributes: Attributes) => void;
}

const initialAttributes: Attributes = {
  health: 5,
  mana: 5,
};

const initialSkills: Skills = {
  stamina: 5,
  initiative: 5,
  intelligence: 5,
  strength: 5,
  agility: 5,
};

function SkillAllocation({ onSkillAllocationComplete }: Props) {
  const [attributes, setAttributes] = useState<Attributes>(initialAttributes);
  const [skills, setSkills] = useState<Skills>(initialSkills);
  const [remainingPoints, setRemainingPoints] = useState(10);

  const handleAttributeChange = (attributeName: keyof Attributes, value: number) => {
    const currentValue = attributes[attributeName];
    const pointDifference = value - currentValue;

    if (remainingPoints - pointDifference >= 0) {
      setAttributes({ ...attributes, [attributeName]: value });
      setRemainingPoints(remainingPoints - pointDifference);
    }
  };

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
    onSkillAllocationComplete(skills, attributes);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Allocate Skill Points</h2>
      <p>Remaining Points: {remainingPoints}</p>
      
      <h3>Attributes</h3>
      {Object.entries(attributes).map(([attrName, value]) => (
        <div key={attrName}>
          <label htmlFor={attrName}>{attrName.charAt(0).toUpperCase() + attrName.slice(1)}:</label>
          <input
            type="number"
            id={attrName}
            value={value}
            min={5}
            max={15}
            onChange={(e) => handleAttributeChange(attrName as keyof Attributes, parseInt(e.target.value))}
          />
        </div>
      ))}

      <h3>Skills</h3>
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