// /app/cuisine/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Recipe {
  id: number;
  name: string;
  ingredients: string;
}

const CuisinePage = () => {
  const searchParams = useSearchParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const recipeParam = searchParams.get('recipe');
    if (recipeParam) {
      try {
        const parsedRecipe = JSON.parse(decodeURIComponent(recipeParam));
        setRecipe(parsedRecipe);
      } catch (error) {
        console.error('Error parsing recipe:', error);
      }
    }
  }, [searchParams]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Cuisine</h1>
      <h2>{recipe.name}</h2>
      <p>{recipe.ingredients}</p>
    </div>
  );
};

export default CuisinePage;
