import React, { useState, KeyboardEvent } from 'react';
import { X, Plus, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface IngredientInputProps {
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({
  ingredients,
  setIngredients,
  onGenerate,
  isLoading,
}) => {
  const [inputValue, setInputValue] = useState('');

  const addIngredient = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add an ingredient (e.g., Tomato, Basil, Chicken)..."
          className="w-full px-6 py-4 bg-white border border-brand-olive/20 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-olive/30 transition-all text-lg"
        />
        <button
          onClick={addIngredient}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-brand-saffron text-white rounded-xl hover:bg-brand-chili transition-colors shadow-lg"
        >
          <Plus size={24} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 min-h-[40px]">
        <AnimatePresence>
          {ingredients.map((ingredient, index) => (
            <motion.span
              key={ingredient}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex items-center gap-1 px-4 py-2 bg-brand-saffron/10 text-brand-saffron rounded-full text-sm font-medium border border-brand-saffron/20 shadow-sm"
            >
              {ingredient}
              <button
                onClick={() => removeIngredient(index)}
                className="hover:text-brand-chili transition-colors"
              >
                <X size={14} />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || ingredients.length === 0}
        className="w-full py-4 bg-brand-saffron text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-brand-chili disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Utensils size={20} />
            Generate Recipe
          </>
        )}
      </button>
    </div>
  );
};
