import React, { useState } from 'react';

interface Props {
  onLogin: (username: string) => void;
}

function AccountManager({ onLogin }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const accounts = JSON.parse(localStorage.getItem('accounts') || '{}');

    if (isRegistering) {
      if (accounts[username]) {
        alert('Username already exists');
        return;
      }
      accounts[username] = { password, characters: [] };
      localStorage.setItem('accounts', JSON.stringify(accounts));
      alert('Account created successfully');
      setIsRegistering(false);
    } else {
      if (!accounts[username] || accounts[username].password !== password) {
        alert('Invalid username or password');
        return;
      }
      onLogin(username);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isRegistering ? 'Create Account' : 'Login'}</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Switch to Login' : 'Switch to Register'}
      </button>
    </form>
  );
}

export default AccountManager;