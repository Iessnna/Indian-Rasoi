import React, { useState } from 'react';
import { BookOpen, Trash2, ChevronRight, ChefHat, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Recipe } from '../services/gemini';
import { RecipeDisplay } from './RecipeDisplay';

interface SavedRecipesProps {
  savedRecipes: Recipe[];
  onRemove: (name: string) => void;
}

export const SavedRecipes: React.FC<SavedRecipesProps> = ({ savedRecipes, onRemove }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  if (savedRecipes.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-brand-saffron/5 flex items-center justify-center text-brand-saffron/20 mx-auto">
          <BookOpen size={40} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-serif font-semibold text-brand-ink/40">Your collection is empty</h3>
          <p className="text-brand-ink/30 max-w-md mx-auto">Start exploring recipes and save your favorites to build your personal Indian cookbook.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12">
      <div className="grid lg:grid-cols-12 gap-8">
        {/* List of Saved Recipes */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-brand-saffron/10 flex items-center justify-center text-brand-saffron">
              <Utensils size={20} />
            </div>
            <h3 className="text-xl font-serif font-semibold">My Collection</h3>
          </div>
          
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {savedRecipes.map((recipe, idx) => (
              <div key={idx} className="group relative">
                <button
                  onClick={() => setSelectedRecipe(recipe)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center justify-between ${
                    selectedRecipe?.name === recipe.name 
                      ? 'bg-brand-saffron border-brand-saffron text-white shadow-lg' 
                      : 'bg-white border-brand-saffron/10 hover:border-brand-saffron/30'
                  }`}
                >
                  <div className="space-y-1 pr-8">
                    <h4 className="font-serif font-semibold leading-tight">{recipe.name}</h4>
                    <p className={`text-xs ${selectedRecipe?.name === recipe.name ? 'text-white/70' : 'text-brand-ink/40'}`}>
                      {recipe.difficulty} • {recipe.cookTime}
                    </p>
                  </div>
                  <ChevronRight size={18} className={`shrink-0 transition-transform ${selectedRecipe?.name === recipe.name ? 'translate-x-1' : 'opacity-20 group-hover:translate-x-1'}`} />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(recipe.name);
                    if (selectedRecipe?.name === recipe.name) setSelectedRecipe(null);
                  }}
                  className={`absolute right-12 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
                    selectedRecipe?.name === recipe.name 
                      ? 'text-white/40 hover:text-white hover:bg-white/10' 
                      : 'text-brand-ink/20 hover:text-brand-chili hover:bg-brand-chili/5'
                  }`}
                  title="Remove from collection"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recipe Detail View */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {selectedRecipe ? (
              <motion.div
                key={selectedRecipe.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <RecipeDisplay recipe={selectedRecipe} />
              </motion.div>
            ) : (
              <div className="h-full min-h-[500px] bg-white rounded-[32px] border border-dashed border-brand-saffron/20 flex flex-col items-center justify-center p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center text-brand-saffron/30">
                  <ChefHat size={32} />
                </div>
                <h4 className="text-xl font-serif font-semibold text-brand-ink/40">Select a recipe to view</h4>
                <p className="text-brand-ink/30 text-sm max-w-xs">Your saved culinary treasures are waiting to be cooked again.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
