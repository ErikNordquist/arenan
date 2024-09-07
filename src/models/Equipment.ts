export interface Weapon {
  name: string;
  damage: number;
  value: number;
}

export interface Armor {
  name: string;
  defense: number;
  value: number;
}

export interface Equipment {
  weapon: Weapon | null;
  armor: Armor | null;
}

export interface InventoryItem {
  type: 'weapon' | 'armor';
  item: Weapon | Armor;
  quantity: number;
}

export type Inventory = InventoryItem[];