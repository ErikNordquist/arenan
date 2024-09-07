import React from 'react';
import { Character } from '../models/Character';

interface Props {
  character: Character;
}

function Combat({ character }: Props) {
  // Implement combat logic here
  return <div>Combat Component</div>;
}

export default Combat;