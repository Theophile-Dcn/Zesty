'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Recettes() {
  const [count, setCount] = useState(5); // Par défaut à 3 recettes
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const getRecipes = async () => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/random?number=${count}&tags=main%20cours`,
        {
          headers: new Headers({
            'x-api-key': apiKey || ''
          })
        }
      );
      const data = await res.json();
      setRecipes(data.recipes);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  interface Recipe {
    id: number;
    title: string;
    image: string;
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 p-4">
      <h1>Bonjour Théo !</h1>
      <p>Combien de recettes voulez-vous préparer ?</p>
      <div className="flex flex-col border-2 border-red-400 rounded-md ">
        <div className="flex p-1 justify-center gap-4 text-xl rounded-md">
          <button
            className="text-red-400 w-full"
            onClick={() => setCount(Math.max(count - 1, 1))} // Minimum 1 recette
          >
            -
          </button>
          <span className="text-black">{count}</span>
          <button
            className="text-red-400 w-full"
            onClick={() => setCount(count + 1)}
          >
            +
          </button>
        </div>
        <button
          className="bg-red-400 rounded-sm p-2 text-white font-semibold"
          onClick={getRecipes}
        >
          c&apos;est parti !
        </button>
      </div>

      {recipes.length > 0 && (
        <div className="mt-4 w-full gap-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="mb-8 p-4 border-2 border-green-400 rounded-md"
            >
              <h2 className="text-sm font-bold">{recipe.title}</h2>
              <Image
                src={recipe.image}
                alt={recipe.title}
                className="w-[150px] h-auto rounded-md"
                width={150}
                height={150}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
