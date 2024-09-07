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

export interface Accessory {
  name: string;
  effect: string;
  value: number;
}

export interface Equipment {
  helmet: Armor | null;
  necklace: Accessory | null;
  armor: Armor | null;
  legs: Armor | null;
  boots: Armor | null;
  weapon: Weapon | null;
  shield: Armor | null;
  trinket: Accessory | null;
  ring1: Accessory | null;
  ring2: Accessory | null;
}

export type EquipmentSlot = keyof Equipment;

export interface InventoryItem {
  type: 'weapon' | 'armor' | 'accessory';
  item: Weapon | Armor | Accessory;
  quantity: number;
}

export type Inventory = InventoryItem[];