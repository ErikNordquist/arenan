import React, { useState, useEffect } from 'react';
import CharacterCreation from './components/CharacterCreation';
import SkillAllocation from './components/SkillAllocation';
import Home from './components/Home';
import MonsterFight from './components/MonsterFight';
import MainMenu from './components/MainMenu';
import MyCharacters from './components/MyCharacters';
import Tavern from './components/Tavern';
import Blacksmith from './components/Blacksmith';
import Workshop from './components/Workshop';
import { Character, Skills, Attributes, calculateLevel, calculateMaxHealth } from './models/Character';
import { Weapon, Armor, Accessory, EquipmentSlot, InventoryItem } from './models/Equipment';

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [activeCharacter, setActiveCharacter] = useState<Character | null>(null);
  const [gameStage, setGameStage] = useState<'account' | 'creation' | 'skillAllocation' | 'home' | 'fight' | 'my-characters' | 'tavern' | 'blacksmith' | 'workshop'>('my-characters');
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [healthRegenerationInterval, setHealthRegenerationInterval] = useState<number | null>(null);

  useEffect(() => {
    loadGame();
  }, []);

  useEffect(() => {
    if (characters.length > 0) {
      saveGame();
    }
  }, [characters, activeCharacter]);

  useEffect(() => {
    if (activeCharacter) {
      const interval = window.setInterval(() => {
        regenerateHealth();
      }, 60000); // 60000 ms = 1 minute
      setHealthRegenerationInterval(interval);
    }
    return () => {
      if (healthRegenerationInterval) {
        window.clearInterval(healthRegenerationInterval);
      }
    };
  }, [activeCharacter]);

  const loadGame = () => {
    const savedCharacters = localStorage.getItem('characters');
    const savedActiveCharacter = localStorage.getItem('activeCharacter');
    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters));
    }
    if (savedActiveCharacter) {
      setActiveCharacter(JSON.parse(savedActiveCharacter));
      setGameStage('home');
    }
  };

  const saveGame = () => {
    localStorage.setItem('characters', JSON.stringify(characters));
    if (activeCharacter) {
      localStorage.setItem('activeCharacter', JSON.stringify(activeCharacter));
    }
  };

  const resetGame = () => {
    localStorage.removeItem('characters');
    localStorage.removeItem('activeCharacter');
    setCharacters([]);
    setActiveCharacter(null);
    setGameStage('my-characters');
    setSelectedMenu(null);
  };

  const handleBasicInfo = (basicInfo: Partial<Character>) => {
    setActiveCharacter(basicInfo as Character);
    setGameStage('skillAllocation');
  };

  const handleSkillAllocation = (skills: Skills, attributes: Attributes) => {
    if (activeCharacter) {
      const maxHealth = calculateMaxHealth(attributes.health);
      const newCharacter: Character = {
        ...activeCharacter,
        skills,
        attributes,
        maxHealth,
        currentHealth: maxHealth, // Set current health to max health
      };
      setActiveCharacter(newCharacter);
      setCharacters([...characters, newCharacter]);
      setGameStage('home');
    }
  };

  const handleSelectCharacter = (character: Character) => {
    setActiveCharacter(character);
    setGameStage('home');
  };

  const handleCreateNewCharacter = () => {
    setActiveCharacter(null);
    setGameStage('creation');
  };

  const handleMainMenuSelect = (menu: string) => {
    switch (menu) {
      case 'home':
        setGameStage('home');
        break;
      case 'my-characters':
      case 'tavern':
      case 'blacksmith':
      case 'workshop':
        setGameStage(menu);
        break;
      default:
        console.log(`Menu item ${menu} not implemented yet`);
    }
  };

  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu);
    if (menu === 'fight') {
      setGameStage('fight');
    }
  };

  const handleFightEnd = (experienceGained: number, remainingHealth: number) => {
    if (activeCharacter) {
      const newExperience = activeCharacter.experience + experienceGained;
      const newLevel = calculateLevel(newExperience);
      setActiveCharacter(prevCharacter => ({
        ...prevCharacter!,
        experience: newExperience,
        level: newLevel,
        currentHealth: remainingHealth
      }));
      // Remove or comment out the following line:
      // setGameStage('home');
    }
  };

  const regenerateHealth = () => {
    if (activeCharacter) {
      const regenerationAmount = Math.floor(activeCharacter.maxHealth * 0.2);
      const newHealth = Math.min(activeCharacter.maxHealth, activeCharacter.currentHealth + regenerationAmount);
      
      setActiveCharacter(prevCharacter => ({
        ...prevCharacter!,
        currentHealth: newHealth
      }));
    }
  };

  const handleReturnHome = () => {
    setGameStage('home');
  };

  const addExperience = (amount: number) => {
    if (activeCharacter) {
      const newExperience = activeCharacter.experience + amount;
      const newLevel = calculateLevel(newExperience);
      setActiveCharacter({
        ...activeCharacter,
        experience: newExperience,
        level: newLevel,
      });
    }
  };

  const handlePurchase = (item: Weapon | Armor | Accessory, slot: EquipmentSlot) => {
    if (activeCharacter) {
      const updatedCharacter = { ...activeCharacter };
      updatedCharacter.gold -= item.value;
      updatedCharacter.equipment[slot] = item as any; // Type assertion to avoid index error

      const inventoryItem: InventoryItem = {
        type: 'damage' in item ? 'weapon' : ('defense' in item ? 'armor' : 'accessory'),
        item,
        quantity: 1
      };

      const existingItemIndex = updatedCharacter.inventory.findIndex(
        (invItem) => invItem.item.name === item.name
      );

      if (existingItemIndex !== -1) {
        updatedCharacter.inventory[existingItemIndex].quantity += 1;
      } else {
        updatedCharacter.inventory.push(inventoryItem);
      }

      setActiveCharacter(updatedCharacter);
      setCharacters(characters.map(char => 
        char.name === updatedCharacter.name ? updatedCharacter : char
      ));
    }
  };

  return (
    <div className="App" style={{ display: 'flex' }}>
      <MainMenu onMenuSelect={handleMainMenuSelect} currentPage={gameStage} onResetGame={resetGame} />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>React Role-Playing Game</h1>
        {gameStage === 'my-characters' && (
          <MyCharacters 
            characters={characters}
            onSelectCharacter={handleSelectCharacter}
            onCreateNewCharacter={handleCreateNewCharacter}
          />
        )}
        {gameStage === 'creation' && <CharacterCreation onBasicInfoComplete={handleBasicInfo} />}
        {gameStage === 'skillAllocation' && activeCharacter && (
          <SkillAllocation onSkillAllocationComplete={handleSkillAllocation} />
        )}
        {gameStage === 'home' && activeCharacter && (
          <Home character={activeCharacter} onMenuSelect={handleMenuSelect} />
        )}
        {gameStage === 'fight' && activeCharacter && (
          <MonsterFight 
            character={activeCharacter} 
            onFightEnd={handleFightEnd} 
            onReturnHome={handleReturnHome}
          />
        )}
        {gameStage === 'tavern' && <Tavern />}
        {gameStage === 'blacksmith' && activeCharacter && (
          <Blacksmith character={activeCharacter} onPurchase={handlePurchase} />
        )}
        {gameStage === 'workshop' && <Workshop />}
        {selectedMenu && gameStage !== 'fight' && <p>You selected: {selectedMenu}</p>}
        {gameStage === 'home' && (
          <button onClick={() => addExperience(100)}>Gain 100 Experience</button>
        )}
      </div>
    </div>
  );
}

export default App;