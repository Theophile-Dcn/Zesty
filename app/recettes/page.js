'use client';
import { useState } from 'react';

export default function Recettes() {
  const [count, setCount] = useState(5);

  const getRecipes = async () => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/random?number=${count}`,
        {
          headers: {
            'x-api-key': apiKey
          }
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 p-4">
      <h1>Bonjour Théo !</h1>
      <p>Combien de recettes voulez-vous préparer ?</p>
      <div className="flex flex-col border-2 border-red-400 rounded-md ">
        <div className="flex p-1 justify-center gap-4 text-xl rounded-md">
          <button
            className="text-red-400 w-full"
            onClick={() => setCount(count - 1)}
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
    </section>
  );
}
