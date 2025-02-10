import React, { useState } from 'react';
import { signIn } from '../lib/auth';

export function Login({ setIsLoggedIn }: { setIsLoggedIn: (isLoggedIn: boolean) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const success = await signIn(username, password);
      if (success) {
        setIsLoggedIn(true);
      } else {
        setError('Usuário ou senha inválidos.');
      }
    } catch (error) {
      setError('Erro de autenticação. Por favor, tente novamente.');
      console.error('Authentication error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xs mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-200 text-sm font-bold mb-2">
          Usuário
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-200 text-sm font-bold mb-2">
          Senha
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-magenta-600 hover:bg-magenta-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Entrar
        </button>
      </div>
    </form>
  );
}
