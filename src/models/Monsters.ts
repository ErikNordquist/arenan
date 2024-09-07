export interface Monster {
  name: string;
  level: number;
  health: number;
  attack: number;
  defense: number;
  experience: number;
}

export const monsters: Monster[] = [
  {
    name: "Cave Rat",
    level: 1,
    health: 20,
    attack: 5,
    defense: 2,
    experience: 10
  },
  {
    name: "Goblin",
    level: 2,
    health: 30,
    attack: 8,
    defense: 3,
    experience: 20
  },
  {
    name: "Giant Spider",
    level: 3,
    health: 40,
    attack: 10,
    defense: 5,
    experience: 30
  },
  {
    name: "Troll",
    level: 4,
    health: 60,
    attack: 15,
    defense: 8,
    experience: 50
  },
  {
    name: "Cyclops",
    level: 5,
    health: 80,
    attack: 20,
    defense: 10,
    experience: 80
  },
  {
    name: "Troll Champion",
    level: 6,
    health: 100,
    attack: 25,
    defense: 15,
    experience: 100
  },
  {
    name: "Dragon",
    level: 8,
    health: 150,
    attack: 35,
    defense: 20,
    experience: 200
  },
  {
    name: "Dragon Lord",
    level: 10,
    health: 200,
    attack: 50,
    defense: 30,
    experience: 500
  }
];