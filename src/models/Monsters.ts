export interface Monster {
  name: string;
  level: number;
  health: number;
  attack: number;
  defense: number;
  experience: number;
  minLevel: number;
  maxLevel: number;
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
    maxLevel: 3
  },
  {
    name: "Goblin",
    level: 3,
    health: 50,
    attack: 12,
    defense: 5,
    experience: 40,
    minLevel: 3,
    maxLevel: 6
  },
  {
    name: "Troll",
    level: 4,
    health: 70,
    attack: 15,
    defense: 8,
    experience: 60,
    minLevel: 2,
    maxLevel: 5
  },
  {
    name: "Troll Champion",
    level: 6,
    health: 100,
    attack: 20,
    defense: 12,
    experience: 100,
    minLevel: 4,
    maxLevel: 7
  },
  {
    name: "Cyclops",
    level: 8,
    health: 150,
    attack: 25,
    defense: 15,
    experience: 150,
    minLevel: 6,
    maxLevel: 9
  },
  {
    name: "Giant Spider",
    level: 10,
    health: 200,
    attack: 30,
    defense: 20,
    experience: 200,
    minLevel: 8,
    maxLevel: 11
  },
  {
    name: "Dragon",
    level: 16,
    health: 300,
    attack: 40,
    defense: 25,
    experience: 300,
    minLevel: 16,
    maxLevel: 19
  },
  {
    name: "Dragon Lord",
    level: 20,
    health: 500,
    attack: 50,
    defense: 30,
    experience: 500,
    minLevel: 20,
    maxLevel: 25
  }
];