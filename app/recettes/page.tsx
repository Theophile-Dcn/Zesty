// /app/recette/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Recipe {
  id: number;
  name: string;
  ingredients: string;
}

const RecettePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('/api/recipes');
      const data = await response.json();
      setRecipes(data);
    };

    fetchRecipes();
  }, []);

  const handleCuisineClick = (recipe: Recipe) => {
    router.push(
      `/cuisine?recipe=${encodeURIComponent(JSON.stringify(recipe))}`
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="p-8">Recettes</h1>
      <ul className="flex gap-12">
        {recipes.map((recipe) => (
          <li className="flex flex-col gap-2" key={recipe.id}>
            {recipe.name}
            <button onClick={() => handleCuisineClick(recipe)}>
              Passer en Cuisine
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecettePage;
