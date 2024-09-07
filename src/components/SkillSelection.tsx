import React from 'react';
import { Character } from '../models/Character';

interface Props {
  character: Character;
  onSelectSkills: (character: Character) => void;
}

function SkillSelection({ character, onSelectSkills }: Props) {
  // Implement skill selection logic here
  return <div>Skill Selection Component</div>;
}

export default SkillSelection;