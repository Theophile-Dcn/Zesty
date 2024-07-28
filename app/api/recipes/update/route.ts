import { NextResponse } from 'next/server';

const SPOONACULAR_API_URL = process.env.NEXT_PUBLIC_SPOONACULAR_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function GET() {
  try {
    const response = await fetch(
      `${SPOONACULAR_API_URL}?apiKey=${API_KEY}&number=1`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const newRecipe = data.recipes[0];

    return NextResponse.json(newRecipe);
  } catch (error) {
    console.error('Error fetching data from Spoonacular API:', error);
    return NextResponse.error();
  }
}
