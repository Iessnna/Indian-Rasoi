import React from 'react';
import { Clock, Flame, ChefHat, Info, IndianRupee, Bookmark, BookmarkCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Recipe } from '../services/gemini';

interface RecipeDisplayProps {
  recipe: Recipe;
  onSave?: (recipe: Recipe) => void;
  onRemove?: (name: string) => void;
  isSaved?: boolean;
}

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, onSave, onRemove, isSaved }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto bg-white rounded-[32px] shadow-xl overflow-hidden border border-brand-saffron/10"
    >
      <div className="p-8 md:p-12 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-brand-chili font-medium uppercase tracking-wider text-sm">
              <ChefHat size={18} />
              <span>Chef's Recommendation</span>
            </div>
            
            {onSave && (
              <button
                onClick={() => isSaved ? onRemove?.(recipe.name) : onSave(recipe)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  isSaved 
                    ? 'bg-brand-saffron text-white shadow-lg shadow-brand-saffron/20' 
                    : 'bg-brand-saffron/5 text-brand-saffron border border-brand-saffron/20 hover:bg-brand-saffron/10'
                }`}
              >
                {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                <span className="text-xs font-bold uppercase tracking-widest">
                  {isSaved ? 'Saved' : 'Save Recipe'}
                </span>
              </button>
            )}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-brand-ink leading-tight">
            {recipe.name}
          </h2>
          <p className="text-lg text-brand-ink/70 italic serif">
            {recipe.description}
          </p>
        </div>

        <div className={`grid grid-cols-2 ${recipe.estimatedCost ? 'md:grid-cols-5' : 'md:grid-cols-4'} gap-4 py-6 border-y border-brand-saffron/10`}>
          <div className="flex flex-col items-center gap-1">
            <Clock size={20} className="text-brand-saffron" />
            <span className="text-xs uppercase tracking-widest text-brand-ink/50 font-semibold">Prep</span>
            <span className="font-medium">{recipe.prepTime}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Flame size={20} className="text-brand-chili" />
            <span className="text-xs uppercase tracking-widest text-brand-ink/50 font-semibold">Cook</span>
            <span className="font-medium">{recipe.cookTime}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ChefHat size={20} className="text-brand-emerald" />
            <span className="text-xs uppercase tracking-widest text-brand-ink/50 font-semibold">Difficulty</span>
            <span className="font-medium">{recipe.difficulty}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Info size={20} className="text-brand-indigo" />
            <span className="text-xs uppercase tracking-widest text-brand-ink/50 font-semibold">Calories</span>
            <span className="font-medium">{recipe.calories} kcal</span>
          </div>
          {recipe.estimatedCost && (
            <div className="flex flex-col items-center gap-1">
              <IndianRupee size={20} className="text-brand-emerald" />
              <span className="text-xs uppercase tracking-widest text-brand-ink/50 font-semibold">Est. Cost</span>
              <span className="font-medium">{recipe.estimatedCost}</span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-semibold border-b border-brand-emerald/10 pb-2 text-brand-emerald">Ingredients</h3>
            <ul className="space-y-3">
              {recipe.ingredients.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-brand-ink/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-semibold border-b border-brand-magenta/10 pb-2 text-brand-magenta">Instructions</h3>
            <ol className="space-y-6">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-magenta/10 text-brand-magenta font-bold shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-brand-ink/80 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
