import React, { useState, useEffect } from 'react';
import { Character } from '../models/Character';
import { Equipment, Inventory } from '../models/Equipment';

interface Props {
  onBasicInfoComplete: (basicInfo: Partial<Character>) => void;
}

const raceProfiles = {
  Human: [
    'https://api.dicebear.com/6.x/personas/svg?seed=Felix',
    'https://api.dicebear.com/6.x/personas/svg?seed=Aneka',
    'https://api.dicebear.com/6.x/personas/svg?seed=Alex',
    'https://api.dicebear.com/6.x/personas/svg?seed=Liz',
    'https://api.dicebear.com/6.x/personas/svg?seed=Joe'
  ],
  Elf: [
    'https://api.dicebear.com/6.x/bottts/svg?seed=Dusty',
    'https://api.dicebear.com/6.x/bottts/svg?seed=Croodles',
    'https://api.dicebear.com/6.x/bottts/svg?seed=Bella',
    'https://api.dicebear.com/6.x/bottts/svg?seed=Zoe',
    'https://api.dicebear.com/6.x/bottts/svg?seed=Yasmin'
  ],
  Dwarf: [
    'https://api.dicebear.com/6.x/pixel-art/svg?seed=Felix',
    'https://api.dicebear.com/6.x/pixel-art/svg?seed=Aneka',
    'https://api.dicebear.com/6.x/pixel-art/svg?seed=Alex',
    'https://api.dicebear.com/6.x/pixel-art/svg?seed=Liz',
    'https://api.dicebear.com/6.x/pixel-art/svg?seed=Joe'
  ],
  Orc: [
    'https://api.dicebear.com/6.x/adventurer/svg?seed=Felix',
    'https://api.dicebear.com/6.x/adventurer/svg?seed=Aneka',
    'https://api.dicebear.com/6.x/adventurer/svg?seed=Alex',
    'https://api.dicebear.com/6.x/adventurer/svg?seed=Liz',
    'https://api.dicebear.com/6.x/adventurer/svg?seed=Joe'
  ],
};

function CharacterCreation({ onBasicInfoComplete }: Props) {
  const [name, setName] = useState('');
  const [race, setRace] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [availableProfiles, setAvailableProfiles] = useState<string[]>([]);

  useEffect(() => {
    if (race) {
      setAvailableProfiles(raceProfiles[race as keyof typeof raceProfiles]);
      setProfilePicture('');
    }
  }, [race]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !race || !profilePicture) return;

    const basicInfo: Partial<Character> = {
      name,
      race,
      profilePicture,
      equipment: { weapon: null, armor: null },
      inventory: [],
      gold: 100, // Starting gold
    };
    onBasicInfoComplete(basicInfo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Your Character</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="race">Race:</label>
        <select id="race" value={race} onChange={(e) => setRace(e.target.value)} required>
          <option value="">Select Race</option>
          <option value="Human">Human</option>
          <option value="Elf">Elf</option>
          <option value="Dwarf">Dwarf</option>
          <option value="Orc">Orc</option>
        </select>
      </div>
      {race && (
        <div>
          <h3>Select Profile Picture</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {availableProfiles.map((profile, index) => (
              <img
                key={index}
                src={profile}
                alt={`${race} profile ${index + 1}`}
                style={{
                  width: '100px',
                  height: '100px',
                  cursor: 'pointer',
                  border: profilePicture === profile ? '2px solid blue' : 'none',
                  backgroundColor: '#f0f0f0',
                }}
                onClick={() => setProfilePicture(profile)}
              />
            ))}
          </div>
        </div>
      )}
      <button type="submit" disabled={!name || !race || !profilePicture}>
        Next: Allocate Skills
      </button>
    </form>
  );
}

export default CharacterCreation;