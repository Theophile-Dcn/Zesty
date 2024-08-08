'use client';
import { useEffect, useState } from 'react';
import RecipeCard from '../src/component/RecipeCard';
import { deleteRecipe, Recipe, updateRecipe } from '../src/utils/recipeUtils';

export default function Home() {
  const [hasRecipes, setHasRecipes] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    const checkRecipesInDB = async () => {
      try {
        const response = await fetch('/api/recipes/userRecipes');
        if (response.status === 404) {
          setHasRecipes(false);
          console.log('No recipes found in DB');
        } else {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setHasRecipes(true);
            setRecipes(data);
          } else {
            setHasRecipes(false);
          }
        }
      } catch (error) {
        console.error('Error checking recipes in DB:', error);
      }
    };

    checkRecipesInDB();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center mt-32 h-screen mx-10 gap-10">
        <h1 className="text-center text-lg">
          Zesty, l&apos;application pour créer et gérer vos recettes et vos
          listes de courses
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe, index) =>
            recipe && recipe.id ? (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onUpdate={() => updateRecipe(recipes, setRecipes, index)}
                onDelete={() => deleteRecipe(recipes, setRecipes, index)}
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
    </>
  );
}
