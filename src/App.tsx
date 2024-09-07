import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import CharacterCreation from './components/CharacterCreation';
import SkillAllocation from './components/SkillAllocation';
import Home from './components/Home';
import { Character, Skills, calculateLevel } from './models/Character';

const GOOGLE_CLIENT_ID = '484170023639-g2unv8c40i5005irg7g9ppv9ukchls0f.apps.googleusercontent.com';

function App() {
  const [user, setUser] = useState<any>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const [gameStage, setGameStage] = useState<'login' | 'creation' | 'skillAllocation' | 'home'>('login');
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      loadCharacter(JSON.parse(savedUser).email);
    }
  }, []);

  useEffect(() => {
    if (character) {
      saveCharacter();
    }
  }, [character]);

  const loadCharacter = async (email: string) => {
    // Here you would typically fetch the character from your backend
    // For now, we'll use localStorage as a placeholder
    const savedCharacter = localStorage.getItem(`character_${email}`);
    if (savedCharacter) {
      setCharacter(JSON.parse(savedCharacter));
      setGameStage('home');
    } else {
      setGameStage('creation');
    }
  };

  const saveCharacter = () => {
    if (user && character) {
      localStorage.setItem(`character_${user.email}`, JSON.stringify(character));
    }
  };

  const handleLogin = (credentialResponse: any) => {
    const userData = { email: credentialResponse.email }; // You might want to decode the JWT to get more user info
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    loadCharacter(userData.email);
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
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="App">
        <h1>React Role-Playing Game</h1>
        {gameStage === 'login' && (
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => console.log('Login Failed')}
          />
        )}
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
    </GoogleOAuthProvider>
  );
}

export default App;