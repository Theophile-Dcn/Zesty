// src/utils/recipeUtils.ts

export interface Recipe {
  id: number;
  title: string;
  image: string;
  healthScore: number;
  servings: number;
  readyInMinutes: number;
  pricePerServing: number;
}

export const updateRecipe = async (
  _recipes: Recipe[],
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>,
  index: number
) => {
  try {
    const response = await fetch(`/api/recipes?number=1`);
    const data = await response.json();
    const newRecipe = data[0];
    setRecipes((prevRecipes) => {
      const updatedRecipes = [...prevRecipes];
      updatedRecipes[index] = newRecipe;
      return updatedRecipes;
    });
  } catch (error) {
    console.error('Error updating recipe:', error);
  }
};

export const deleteRecipe = async (
  recipes: Recipe[],
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>,
  index: number
) => {
  try {
    const response = await fetch(`/api/recipes/userRecipes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: recipes[index].id })
    });
    if (response.ok) {
      console.log('Recipe deleted');

      setRecipes((prevRecipes) => {
        const updatedRecipes = [...prevRecipes];
        updatedRecipes.splice(index, 1);
        return updatedRecipes;
      });
    } else {
      console.error('Error deleting recipe');
    }
  } catch (error) {
    console.error('Error deleting recipe:', error);
  }
};

export const postRecipes = async (
  recipes: Recipe[],
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
) => {
  try {
    const response = await fetch('/api/recipes/userRecipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipes)
    });
    const data = await response.json();
    console.log('Posted Recipes:', data);
    setRecipes(recipes);
  } catch (error) {
    console.error('Error posting recipes:', error);
  }
};
