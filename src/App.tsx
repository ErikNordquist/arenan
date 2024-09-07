import React, { useState, useEffect } from 'react';
// Comment out the Google OAuth import for now
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import CharacterCreation from './components/CharacterCreation';
import SkillAllocation from './components/SkillAllocation';
import Home from './components/Home';
import { Character, Skills, calculateLevel } from './models/Character';

// Comment out the Google Client ID for now
// const GOOGLE_CLIENT_ID = '484170023639-g2unv8c40i5005irg7g9ppv9ukchls0f.apps.googleusercontent.com';

function App() {
  // const [user, setUser] = useState<any>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const [gameStage, setGameStage] = useState<'creation' | 'skillAllocation' | 'home'>('creation');
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

  const handleSkillAllocation = (skills: Skills) => {
    if (character) {
      const fullCharacter: Character = {
        ...character,
        skills,
        experience: 0,
        level: 1,
      };
      setCharacter(fullCharacter);
      setGameStage('home');
    }
  };

  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu);
    console.log(`Selected menu: ${menu}`);
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
    // Remove GoogleOAuthProvider wrapper
    <div className="App">
      <h1>React Role-Playing Game</h1>
      {gameStage === 'creation' && <CharacterCreation onBasicInfoComplete={handleBasicInfo} />}
      {gameStage === 'skillAllocation' && character && (
        <SkillAllocation onSkillAllocationComplete={handleSkillAllocation} />
      )}
      {gameStage === 'home' && character && (
        <Home character={character} onMenuSelect={handleMenuSelect} />
      )}
      {selectedMenu && <p>You selected: {selectedMenu}</p>}
      {gameStage === 'home' && (
        <button onClick={() => addExperience(100)}>Gain 100 Experience</button>
      )}
    </div>
  );
}

export default App;