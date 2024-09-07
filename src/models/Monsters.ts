export interface MonsterAttributes {
  health: number;
  mana: number;
}

export interface MonsterSkills {
  stamina: number;
  initiative: number;
  intelligence: number;
  strength: number;
  agility: number;
}

export interface Monster {
  name: string;
  level: number;
  health: number;
  attack: number;
  defense: number;
  experience: number;
  minLevel: number;
  maxLevel: number;
  attributes: MonsterAttributes;
  skills: MonsterSkills;
}

export const monsters: Monster[] = [
  {
    name: "Cave Rat",
    level: 1,
    health: 30,
    attack: 8,
    defense: 3,
    experience: 20,
    minLevel: 1,
    maxLevel: 3,
    attributes: { health: 3, mana: 1 },
    skills: { stamina: 3, initiative: 5, intelligence: 1, strength: 2, agility: 4 }
  },
  {
    name: "Goblin",
    level: 3,
    health: 50,
    attack: 12,
    defense: 5,
    experience: 40,
    minLevel: 3,
    maxLevel: 6,
    attributes: { health: 5, mana: 2 },
    skills: { stamina: 4, initiative: 6, intelligence: 2, strength: 3, agility: 5 }
  },
  {
    name: "Troll",
    level: 4,
    health: 70,
    attack: 15,
    defense: 8,
    experience: 60,
    minLevel: 2,
    maxLevel: 5,
    attributes: { health: 7, mana: 1 },
    skills: { stamina: 6, initiative: 3, intelligence: 1, strength: 7, agility: 2 }
  },
  {
    name: "Troll Champion",
    level: 6,
    health: 100,
    attack: 20,
    defense: 12,
    experience: 100,
    minLevel: 4,
    maxLevel: 7,
    attributes: { health: 10, mana: 2 },
    skills: { stamina: 8, initiative: 4, intelligence: 2, strength: 9, agility: 3 }
  },
  {
    name: "Cyclops",
    level: 8,
    health: 150,
    attack: 25,
    defense: 15,
    experience: 150,
    minLevel: 6,
    maxLevel: 9,
    attributes: { health: 15, mana: 3 },
    skills: { stamina: 10, initiative: 5, intelligence: 3, strength: 12, agility: 4 }
  },
  {
    name: "Giant Spider",
    level: 10,
    health: 200,
    attack: 30,
    defense: 20,
    experience: 200,
    minLevel: 8,
    maxLevel: 11,
    attributes: { health: 20, mana: 5 },
    skills: { stamina: 12, initiative: 8, intelligence: 4, strength: 10, agility: 10 }
  },
  {
    name: "Dragon",
    level: 16,
    health: 300,
    attack: 40,
    defense: 25,
    experience: 300,
    minLevel: 16,
    maxLevel: 19,
    attributes: { health: 30, mana: 20 },
    skills: { stamina: 20, initiative: 15, intelligence: 18, strength: 25, agility: 18 }
  },
  {
    name: "Dragon Lord",
    level: 20,
    health: 500,
    attack: 50,
    defense: 30,
    experience: 500,
    minLevel: 20,
    maxLevel: 25,
    attributes: { health: 50, mana: 30 },
    skills: { stamina: 30, initiative: 20, intelligence: 25, strength: 35, agility: 25 }
  }
];