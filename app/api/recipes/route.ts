// /app/api/recipes/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const recipes = [
    { id: 1, name: 'Recette 1', ingredients: 'Ingrédients 1' },
    { id: 2, name: 'Recette 2', ingredients: 'Ingrédients 2' }
  ];

  return NextResponse.json(recipes);
}
