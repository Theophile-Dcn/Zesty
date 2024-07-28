// /app/api/getRecipes/route.ts
import { PrismaClient } from '@prisma/client';
import { log } from 'console';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany();
    log('Fetched recipes from the database:', recipes);
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes from the database:', error);
    return NextResponse.error();
  }
}
