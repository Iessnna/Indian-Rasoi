import { useState, useEffect } from 'react';
import { Recipe } from '../services/gemini';

export const useSavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('indian_rasoi_saved_recipes');
    if (stored) {
      try {
        setSavedRecipes(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse saved recipes", e);
      }
    }
  }, []);

  // Save to localStorage whenever savedRecipes changes
  useEffect(() => {
    localStorage.setItem('indian_rasoi_saved_recipes', JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  const saveRecipe = (recipe: Recipe) => {
    setSavedRecipes(prev => {
      // Check if already saved
      if (prev.some(r => r.name === recipe.name)) return prev;
      return [...prev, recipe];
    });
  };

  const removeRecipe = (recipeName: string) => {
    setSavedRecipes(prev => prev.filter(r => r.name !== recipeName));
  };

  const isSaved = (recipeName: string) => {
    return savedRecipes.some(r => r.name === recipeName);
  }

  return {
    savedRecipes,
    saveRecipe,
    removeRecipe,
    isSaved
  };
};
