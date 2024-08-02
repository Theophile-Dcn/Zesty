import { LoginButton } from '@/components/Button/AuthButtons';
import { auth } from '@/src/lib/auth';
import Link from 'next/link';

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex flex-col items-center mt-32 h-screen mx-10 gap-10">
      <h1 className="text-center text-lg">
        Zesty, l&apos;application pour créer et gérer vos recettes et vos listes
        de courses
      </h1>
      {session?.user ? (
        <>
          <div className="text-center flex flex-col items-center gap-4">
            <p>Bonjour, {session.user.name}!👋</p>
            <p>Vous pouvez accéder à vos recettes et listes de courses</p>
          </div>
          <div className="flex gap-12">
            <Link href="/recettes">
              <button className=" p-2 border bg-green-400 text-white rounded-md">
                Recettes
              </button>
            </Link>
            <Link href="/cuisine">
              <button className=" p-2 border bg-green-400 text-white rounded-md">
                Cuisine
              </button>
            </Link>
          </div>
        </>
      ) : (
        <button className="mt-4 p-2 border bg-green-400 text-white rounded-md">
          <LoginButton />
        </button>
      )}
    </div>
  );
}
