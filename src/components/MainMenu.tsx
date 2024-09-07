import React from 'react';

interface Props {
  onMenuSelect: (menu: string) => void;
  currentPage: string;
  onResetGame: () => void;
}

function MainMenu({ onMenuSelect, currentPage, onResetGame }: Props) {
  const menuItems = ['Home', 'My Characters', 'Tavern', 'Blacksmith', 'Workshop'];

  return (
    <div style={{
      width: '200px',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <h2>Main Menu</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {menuItems.map((item) => (
          <li key={item} style={{ marginBottom: '10px' }}>
            <button
              onClick={() => onMenuSelect(item.toLowerCase().replace(' ', '-'))}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: currentPage === item.toLowerCase().replace(' ', '-') ? '#ddd' : 'white',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={onResetGame}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Reset Game
      </button>
    </div>
  );
}

export default MainMenu;