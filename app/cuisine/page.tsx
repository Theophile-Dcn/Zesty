import { auth } from '@/src/lib/auth';

export default async function Cuisine() {
  const session = await auth();
  return (
    <main>
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-8 text-center">
        <h1>Prêt pour la cuisine {session?.user?.name} ?</h1>
        <p>Voici la liste de vos recettes !</p>
      </div>
    </main>
  );
}
