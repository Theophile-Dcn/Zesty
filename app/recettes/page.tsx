'use client';

import { useState } from 'react';
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

const RecettePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [count, setCount] = useState<number>(5); // Compteur initialisé à 5

  // Fonction pour récupérer les recettes
  const fetchRecipes = async () => {
    try {
      const response = await fetch(`/api/recipes?number=${count}`);
      const data = await response.json();
      console.log('Fetched Recipes:', data); // Ajouter cette ligne pour inspecter les données
      if (Array.isArray(data)) {
        setRecipes(data);
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  // Fonction pour remplacer une recette spécifique
  const updateRecipe = async (index: number) => {
    try {
      const response = await fetch(`/api/recipes?number=1`);
      const data = await response.json();
      console.log('Fetched new Recipe:', data); // Ajouter cette ligne pour inspecter les données
      if (Array.isArray(data) && data.length > 0) {
        setRecipes((prevRecipes) => {
          const newRecipes = [...prevRecipes];
          newRecipes[index] = data[0];
          return newRecipes;
        });
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Error fetching new recipe:', error);
    }
  };

  // Fonction pour gérer le clic du bouton de soumission
  const handleFetchRecipes = () => {
    fetchRecipes();
  };

  return (
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
              onUpdate={() => updateRecipe(index)}
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

export default RecettePage;
