import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const SPOONACULAR_API_URL = process.env.NEXT_PUBLIC_SPOONACULAR_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const number = url.searchParams.get('number') || '5';
  const id = url.searchParams.get('id'); // ID pour mettre à jour une recette spécifique

  try {
    let apiUrl = `${SPOONACULAR_API_URL}?apiKey=${API_KEY}&number=${number}`;

    if (id) {
      apiUrl = `${SPOONACULAR_API_URL}/${id}/information?apiKey=${API_KEY}`;
    }

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Fetched data from API:', data); // Ajouter des logs pour vérifier les données

    if (id) {
      const recipe = {
        id: data.id,
        title: data.title,
        image: data.image,
        healthScore: data.healthScore,
        servings: data.servings,
        readyInMinutes: data.readyInMinutes,
        pricePerServing: data.pricePerServing
      };

      return NextResponse.json(recipe);
    } else {
      const recipes = data.recipes.map((recipe: any) => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        healthScore: recipe.healthScore,
        servings: recipe.servings,
        readyInMinutes: recipe.readyInMinutes,
        pricePerServing: recipe.pricePerServing
      }));

      for (const recipe of recipes) {
        await prisma.recipe.create({
          data: {
            id: recipe.id.toString(),
            title: recipe.title,
            image: recipe.image,
            instructions: recipe.instructions || '',
            healthScore: recipe.healthScore || 0,
            servings: recipe.servings || 0,
            readyInMinutes: recipe.readyInMinutes || 0,
            pricePerServing: recipe.pricePerServing || 0
          }
        });
      }

      return NextResponse.json(recipes);
    }
  } catch (error) {
    console.error('Error fetching data from Spoonacular API:', error);
    return NextResponse.error();
  }
}
