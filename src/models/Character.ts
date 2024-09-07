export interface Skill {
  name: string;
  level: number;
}

export interface Attributes {
  health: number;
  mana: number;
}

export interface Skills {
  stamina: number;
  initiative: number;
  intelligence: number;
  strength: number;
  agility: number;
}

export interface Character {
  name: string;
  race: string;
  level: number;
  experience: number;
  profilePicture: string;
  attributes: Attributes;
  skills: Skills;
}

export function calculateLevel(experience: number): number {
  let level = 1;
  while (experienceForNextLevel(level) <= experience) {
    level++;
  }
  return level;
}

export function experienceForNextLevel(level: number): number {
  return Math.floor(50/3 * (Math.pow(level, 3) - 6 * Math.pow(level, 2) + 17 * level - 12));
}