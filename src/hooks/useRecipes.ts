import { useState } from 'react';

interface Recipe {
  id: number;
  title: string;
  image: string;
  healthScore: number;
  servings: string;
  readyInMinutes: number;
  pricePerServing: number;
}

const useRecipes = (initialCount: number) => {
  const [count, setCount] = useState(initialCount);
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

  const updateRecipes = async (index: number) => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    console.log('API Key:', apiKey); // Vérifiez si la clé API est bien définie
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/random?number=1&tags=main%20course`,
        {
          headers: new Headers({
            'x-api-key': apiKey || ''
          })
        }
      );
      const data = await res.json();
      const newRecipes = data.recipes[0];
      setRecipes((prevRecipes) => {
        const updateRecipes = [...prevRecipes];
        updateRecipes[index] = newRecipes;
        return updateRecipes;
      });

      console.log('Fetched recipes:', data.recipes); // Ajoutez un console.log pour vérifier les données reçues
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
  return { count, setCount, recipes, getRecipes, updateRecipes };
};

export default useRecipes;
