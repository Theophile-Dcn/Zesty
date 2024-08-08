import { Carousel, CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';

interface Recipe {
  id: number;
  title: string;
  image: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="p-2 border-2 border-black rounded-md w-full flex items-center justify-center gap-3 md:flex-col ">
      <h2 className="text-sm font-bold md:text-center">{recipe.title}</h2>
      <Image
        src={recipe.image}
        alt={recipe.title}
        width={200}
        height={200}
        className="rounded-md"
      />
    </div>
  );
};

interface RecipeCarouselProps {
  recipes: Recipe[];
}

const RecipeCarousel: React.FC<RecipeCarouselProps> = ({ recipes }) => {
  return (
    <Carousel className="w-full">
      {recipes.map((recipe) => (
        <CarouselItem
          key={recipe.id}
          className="flex justify-center items-center"
        >
          <RecipeCard recipe={recipe} />
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default RecipeCarousel;
