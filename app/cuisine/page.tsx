'use client';
import RecipeCard from '@/components/RecipeCard';
import { useRecipeContext } from '@/context/RecipeContext';
import { useEffect } from 'react';

export default function Cuisine() {
  const { recipes, setRecipes } = useRecipeContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('/api/recipes');
      const data = await response.json();
      setRecipes(data);
    };
    fetchRecipes();
  }, [setRecipes]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 px-4 py-8 text-center">
      <h1>Liste des recettes</h1>
      <div className="mt-4 gap-4 flex flex-row flex-wrap p-4 w-full">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onUpdate={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        ))}
      </div>
    </section>
  );
}
