import type { NextApiRequest, NextApiResponse } from 'next';

interface Recipe {
  id: number;
  title: string;
  image: string;
  healthScore: number;
  servings: string;
  readyInMinutes: number;
  pricePerServing: number;
}

let recipes: Recipe[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(recipes);
  } else if (req.method === 'POST') {
    const newRecipe = req.body;
    recipes.push(newRecipe);
    res.status(201).json(newRecipe);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
