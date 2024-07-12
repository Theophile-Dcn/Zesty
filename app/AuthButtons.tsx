'use client';

import { signIn, signOut } from 'next-auth/react';

export const LoginButton = () => {
  return (
    <button
      onClick={() => signIn()}
      className="bg-red-400 rounded-sm p-2 text-white font-semibold"
    >
      Se connecter
    </button>
  );
};

export const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="bg-red-400 rounded-sm p-2 text-white font-semibold"
    >
      Se déconnecter
    </button>
  );
};
