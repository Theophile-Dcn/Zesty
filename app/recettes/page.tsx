'use client';
import Image from 'next/image';
import { useState } from 'react';

interface Recipe {
  id: number;
  title: string;
  image: string;
}

export default function Recettes() {
  const [count, setCount] = useState(5); // Par défaut à 5 recettes
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const getRecipes = async () => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    console.log('API Key:', apiKey); // Vérifiez si la clé API est bien définie
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/random?number=${count}&tags=main%20course`,
        {
          headers: new Headers({
            'x-api-key': apiKey || ''
          })
        }
      );
      const data = await res.json();
      setRecipes(data.recipes);
      console.log('Fetched recipes:', data.recipes); // Ajoutez un console.log pour vérifier les données reçues
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 p-4 text-center">
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
        <div className="mt-4 gap-4 flex flex-row border-2 border-red-900">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className=" p-4 border-2 border-green-400 rounded-md"
            >
              <h2 className="text-sm font-bold">{recipe.title}</h2>
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={300} // Spécifiez la largeur
                height={300} // Spécifiez la hauteur
                className="h-auto rounded-md"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
