'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import RecipeCard from '../../src/component/RecipeCard';
import {
  deleteRecipe,
  postRecipes,
  Recipe,
  updateRecipe
} from '../../src/utils/recipeUtils';

const RecettePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [count, setCount] = useState<number>(5);
  const [hasRecipes, setHasRecipes] = useState<boolean>(false);

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

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`/api/recipes?number=${count}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setRecipes(data);
        setHasRecipes(true);
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleFetchRecipes = () => {
    fetchRecipes();
  };

  return (
    <>
      {!hasRecipes ? (
        <div className="flex flex-col items-center justify-center h-screen mt-32">
          <h1 className="p-8">Recettes</h1>
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setCount(count > 1 ? count - 1 : 1)}
              className="p-2 border rounded-md"
            >
              -
            </button>
            <span className="text-xl">{count}</span>
            <button
              onClick={() => setCount(count + 1)}
              className="p-2 border rounded-md"
            >
              +
            </button>
          </div>
          <button
            onClick={handleFetchRecipes}
            className="mb-4 p-2 border bg-green-400 text-white rounded-md"
          >
            Afficher les recettes
          </button>
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
          <button
            onClick={() => postRecipes(recipes, setRecipes)}
            className="mt-4 p-2 border bg-blue-400 text-white rounded-md"
          >
            <Link href="/cuisine">Aller à Cuisine</Link>
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen mt-32">
          <p>Vous avez déjà créé des recettes !</p>

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
          <button
            onClick={() => postRecipes(recipes, setRecipes)}
            className="mt-4 p-2 border bg-blue-400 text-white rounded-md"
          >
            <Link href="/cuisine">Aller à Cuisine</Link>
          </button>
        </div>
      )}
    </>
  );
};

export default RecettePage;
