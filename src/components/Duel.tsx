import React from 'react';
import { Character } from '../models/Character';

interface Props {
  character: Character;
}

function Duel({ character }: Props) {
  // Implement duel logic here
  return <div>Duel Component</div>;
}

export default Duel;