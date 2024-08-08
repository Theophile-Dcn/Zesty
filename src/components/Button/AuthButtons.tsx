'use client';
import { signIn, signOut } from 'next-auth/react';

import { FiLogIn, FiLogOut } from 'react-icons/fi';
import Button from './Button';

export const LoginButton = () => {
  return (
    <Button
      className=" rounded-sm p-2 flex items-center gap-2"
      onClick={() => signIn('github', { callbackUrl: '/recettes' })}
    >
      <FiLogIn />
      Se connecter
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className=" rounded-sm p-2 flex items-center gap-2"
    >
      <FiLogOut />
      Se déconnecter
    </button>
  );
};
