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
    <div>
      <h1>Recettes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
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
