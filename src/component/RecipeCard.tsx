import Image from 'next/image';
import Button from './Button';

interface Recipe {
  id: number;
  title: string;
  image: string;
  healthScore: number;
  servings: number;
  readyInMinutes: number;
  pricePerServing: number;
}

interface RecipeCardProps {
  recipe: Recipe;
  onUpdate: () => void; // Fonction à appeler pour mettre à jour la recette
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onUpdate }) => {
  return (
    <div className="p-4 border-2 border-green-400 rounded-md w-full flex flex-col items-center justify-center gap-4">
      <h2 className="text-sm font-bold">{recipe.title}</h2>
      <Image
        src={recipe.image}
        alt={recipe.title}
        width={300}
        height={300}
        className="rounded-md"
      />
      <Button onClick={onUpdate} className="border-green-400">
        Remplacer
      </Button>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <p className="text-sm">Health Score : {recipe.healthScore}</p>
          <p className="text-sm">Ready in {recipe.readyInMinutes} minutes</p>
        </div>
        <div className="flex flex-row gap-2">
          <p className="text-sm">Servings : {recipe.servings}</p>
          <p className="text-sm">
            Price/serving : ${recipe.pricePerServing / 100}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
