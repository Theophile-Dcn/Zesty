// /app/api/getRecipes/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const recipes = await request.json();
  console.log('Received recipes:', recipes);

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

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany();
    if (recipes.length === 0) {
      return NextResponse.json(
        { message: 'No recipes found' },
        { status: 404 }
      );
    }
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes from the database:', error);
    return NextResponse.error();
  }
}
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    console.log('Received recipe ID:', id);

    await prisma.recipe.delete({
      where: {
        id: id.toString()
      }
    });

    return NextResponse.json({ success: true, message: 'Recipe deleted' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting recipe' },
      { status: 500 }
    );
  }
}
