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

  // Fonction pour générer les recettes
  const fetchRecipes = async () => {
    try {
      const response = await fetch(`/api/recipes?number=${count}`);
      const data = await response.json();
      console.log('Fetched Recipes:', data);
      if (Array.isArray(data)) {
        setRecipes(data);
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  // Fonction pour mettre à jour une recette avec son index
  const updateRecipe = async (index: number) => {
    try {
      const response = await fetch(`/api/recipes?number=1`); // Récupérer une seule recette
      const data = await response.json();
      const newRecipe = data[0]; // Supposons que l'API retourne une liste avec une recette
      console.log('Updated Recipe:', newRecipe);

      setRecipes((prevRecipes) => {
        const updatedRecipes = [...prevRecipes];
        updatedRecipes[index] = newRecipe; // Remplacer la recette à l'index spécifié
        return updatedRecipes;
      });
    } catch (error) {
      console.error('Error updating recipe:', error);
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
              onUpdate={() => updateRecipe(index)} // Passer l'index de la recette
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

      <button className="mt-4 p-2 border bg-blue-400 text-white rounded-md">
        Aller à Cuisine
      </button>
    </div>
  );
};

export default RecettePage;
