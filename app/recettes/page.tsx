'use client';

import Button from '@/component/Button';
import RecipeCard from '@/component/RecipeCard';
import useRecipes from '@/hooks/useRecipes';
import Link from 'next/link';

export default function Recettes() {
  const { count, setCount, recipes, getRecipes, updateRecipes } = useRecipes(5);

  return (
    <section className="flex flex-col items-center justify-center gap-4 px-4 py-8 text-center">
      <h1>Bonjour Théo !</h1>
      <p>Combien de recettes voulez-vous préparer ?</p>
      <div className="flex flex-col border-2 border-red-400 rounded-md ">
        <div className="flex p-1 justify-center gap-4 text-xl rounded-md">
          <Button
            className="w-full"
            onClick={() => setCount(Math.max(count - 1, 1))} // Minimum 1 recette
          >
            -
          </Button>
          <span className="">{count}</span>
          <button className="w-full" onClick={() => setCount(count + 1)}>
            +
          </button>
        </div>
        <Button className="bg-red-400 rounded-sm" onClick={getRecipes}>
          c&apos;est parti !
        </Button>
      </div>

      {recipes.length > 0 && (
        <div className="mt-4 gap-4 flex flex-row flex-wrap p-4 w-full">
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onUpdate={() => updateRecipes(index)}
            />
          ))}
        </div>
      )}
      <Link href="/cuisine">Générer une liste</Link>
    </section>
  );
}
