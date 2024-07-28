import { LoginButton } from '@/src/component/Button/AuthButtons';
import { auth } from '@/src/lib/auth';

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Zesty, l&apos;application pour créer et gérer vos recettes</h1>
      <p>Pour commencer, connectez-vous avec votre compte GitHub</p>
      {session?.user ? <p></p> : <LoginButton />}
    </div>
  );
}
