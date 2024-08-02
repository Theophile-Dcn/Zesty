// /app/cuisine/page.tsx

'use client';

import { useEffect, useState } from 'react';
import RecipeCard from '../../src/component/RecipeCard';

interface Recipe {
  id: number;
  title: string;
  image: string;
  healthScore: number;
  servings: number;
  readyInMinutes: number;
  pricePerServing: number;
}

const CuisinePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await fetch('/api/recipes/userRecipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchUserRecipes();
  }, []);

  if (recipes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen mt-32">
      <h1 className="p-8">Cuisine</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) =>
          recipe && recipe.id ? (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onUpdate={() => {
                // Handle recipe update if needed
              }}
            />
          ) : (
            <div
              key={Math.random()}
              className="p-4 border-2 border-red-400 rounded-md"
            >
              <p>Recipe data is invalid</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CuisinePage;
