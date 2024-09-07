import React, { useState, useEffect } from 'react';
import CharacterCreation from './components/CharacterCreation';
import SkillAllocation from './components/SkillAllocation';
import Home from './components/Home';
import MonsterFight from './components/MonsterFight';
import { Character, Skills, Attributes, calculateLevel } from './models/Character';

function App() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [gameStage, setGameStage] = useState<'creation' | 'skillAllocation' | 'home' | 'fight'>('creation');
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  useEffect(() => {
    // Load character from localStorage if it exists
    const savedCharacter = localStorage.getItem('character');
    if (savedCharacter) {
      setCharacter(JSON.parse(savedCharacter));
      setGameStage('home');
    }
  }, []);

  useEffect(() => {
    if (character) {
      saveCharacter();
    }
  }, [character]);

  const saveCharacter = () => {
    if (character) {
      localStorage.setItem('character', JSON.stringify(character));
    }
  };

  const handleBasicInfo = (basicInfo: Partial<Character>) => {
    setCharacter(basicInfo as Character);
    setGameStage('skillAllocation');
  };

  const handleSkillAllocation = (skills: Skills, attributes: Attributes) => {
    if (character) {
      const fullCharacter: Character = {
        ...character,
        skills,
        attributes,
        experience: 0,
        level: 1,
      };
      setCharacter(fullCharacter);
      setGameStage('home');
    }
  };

  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu);
    if (menu === 'fight') {
      setGameStage('fight');
    }
  };

  const handleFightEnd = (experienceGained: number) => {
    if (character) {
      const newExperience = character.experience + experienceGained;
      const newLevel = calculateLevel(newExperience);
      setCharacter({
        ...character,
        experience: newExperience,
        level: newLevel,
      });
      // Remove or comment out the following line:
      // setGameStage('home');
    }
  };

  const handleReturnHome = () => {
    setGameStage('home');
  };

  const addExperience = (amount: number) => {
    if (character) {
      const newExperience = character.experience + amount;
      const newLevel = calculateLevel(newExperience);
      setCharacter({
        ...character,
        experience: newExperience,
        level: newLevel,
      });
    }
  };

  return (
    <div className="App">
      <h1>React Role-Playing Game</h1>
      {gameStage === 'creation' && <CharacterCreation onBasicInfoComplete={handleBasicInfo} />}
      {gameStage === 'skillAllocation' && character && (
        <SkillAllocation onSkillAllocationComplete={handleSkillAllocation} />
      )}
      {gameStage === 'home' && character && (
        <Home character={character} onMenuSelect={handleMenuSelect} />
      )}
      {gameStage === 'fight' && character && (
        <MonsterFight 
          character={character} 
          onFightEnd={handleFightEnd} 
          onReturnHome={handleReturnHome}
        />
      )}
      {selectedMenu && gameStage !== 'fight' && <p>You selected: {selectedMenu}</p>}
      {gameStage === 'home' && (
        <button onClick={() => addExperience(100)}>Gain 100 Experience</button>
      )}
    </div>
  );
}

export default App;