import { auth } from '@/src/lib/auth';
import { LoginButton, LogoutButton } from './AuthButtons';

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <h1>
        {session?.user
          ? 'authenticated' + ' ' + session?.user.email
          : 'not authenticated'}
      </h1>
      <div>{session?.user ? <LogoutButton /> : <LoginButton />}</div>
    </div>
  );
}
