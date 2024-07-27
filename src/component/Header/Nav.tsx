import { auth } from '@/src/lib/auth';
import Link from 'next/link';
import { LoginButton, LogoutButton } from '../Button/AuthButtons';

export default async function Nav() {
  const session = await auth();
  return (
    <nav>
      <ul className="flex justify-between items-center gap-4 text-sm">
        {session?.user ? <LogoutButton /> : <LoginButton />}
        {session?.user && (
          <>
            <li>
              <Link href="/recettes">Faire une liste</Link>
            </li>
            <li>
              <Link href="/cuisine">Passer en cuisine</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
