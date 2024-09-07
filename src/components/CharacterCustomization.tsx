import React from 'react';
import { Character } from '../models/Character';

interface Props {
  character: Character;
  onCustomizeCharacter: (character: Character) => void;
}

function CharacterCustomization({ character, onCustomizeCharacter }: Props) {
  // Implement character customization logic here
  return <div>Character Customization Component</div>;
}

export default CharacterCustomization;