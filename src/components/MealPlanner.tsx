import React, { useState, useEffect } from 'react';
import { Calendar, Clock, IndianRupee, ChevronRight, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateMealPlan, MealPlan, Recipe } from '../services/gemini';
import { RecipeDisplay } from './RecipeDisplay';

interface MealPlannerProps {
  onSaveRecipe: (recipe: Recipe) => void;
  onRemoveRecipe: (name: string) => void;
  isRecipeSaved: (name: string) => boolean;
}

export const MealPlanner: React.FC<MealPlannerProps> = ({ onSaveRecipe, onRemoveRecipe, isRecipeSaved }) => {
  const [planType, setPlanType] = useState<'daily' | 'weekly'>('daily');
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  const fetchPlan = async (type: 'daily' | 'weekly') => {
    setIsLoading(true);
    setMealPlan(null);
    setSelectedRecipe(null);
    try {
      const plan = await generateMealPlan(type);
      setMealPlan(plan);
      if (type === 'weekly' && plan.weekly?.length > 0) {
        setExpandedDay(plan.weekly[0].day);
      }
    } catch (error) {
      console.error("Failed to fetch meal plan", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan(planType);
  }, [planType]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-[32px] shadow-sm border border-brand-emerald/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-emerald/10 flex items-center justify-center text-brand-emerald shadow-lg shadow-brand-emerald/10">
            <Calendar size={24} />
          </div>
          <div>
            <h3 className="text-xl font-serif font-semibold text-brand-emerald">Indian Household Meal Planner</h3>
            <p className="text-sm text-brand-ink/50">Budget-friendly daily & weekly suggestions</p>
          </div>
        </div>

        <div className="flex bg-brand-cream p-1.5 rounded-2xl border border-brand-emerald/10">
          <button
            onClick={() => setPlanType('daily')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${planType === 'daily' ? 'bg-brand-emerald text-white shadow-md' : 'text-brand-ink/40 hover:text-brand-ink/60'}`}
          >
            Daily
          </button>
          <button
            onClick={() => setPlanType('weekly')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${planType === 'weekly' ? 'bg-brand-emerald text-white shadow-md' : 'text-brand-ink/40 hover:text-brand-ink/60'}`}
          >
            Weekly
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-12 h-12 border-4 border-brand-emerald/20 border-t-brand-emerald rounded-full animate-spin" />
          <p className="text-brand-ink/50 font-serif italic">Curating your budget-friendly Indian menu...</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <AnimatePresence mode="wait">
              {planType === 'daily' && mealPlan?.daily && (
                <motion.div
                  key="daily-list"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {mealPlan.daily.map((recipe, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedRecipe(recipe)}
                      className={`w-full text-left p-6 rounded-3xl border transition-all flex items-center justify-between group ${selectedRecipe?.name === recipe.name ? 'bg-brand-emerald border-brand-emerald text-white shadow-lg' : 'bg-white border-brand-emerald/10 hover:border-brand-emerald/30'}`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${selectedRecipe?.name === recipe.name ? 'bg-white/20 text-white' : 'bg-brand-emerald/10 text-brand-emerald'}`}>
                            {idx === 0 ? 'Breakfast' : idx === 1 ? 'Lunch' : 'Dinner'}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest opacity-60">
                            <IndianRupee size={10} /> {recipe.estimatedCost || 'Budget'}
                          </span>
                        </div>
                        <h4 className="text-lg font-serif font-semibold">{recipe.name}</h4>
                        <div className="flex items-center gap-3 text-xs opacity-60">
                          <span className="flex items-center gap-1"><Clock size={12} /> {recipe.cookTime}</span>
                        </div>
                      </div>
                      <ChevronRight className={`transition-transform ${selectedRecipe?.name === recipe.name ? 'translate-x-1' : 'group-hover:translate-x-1 opacity-20'}`} />
                    </button>
                  ))}
                </motion.div>
              )}

              {planType === 'weekly' && mealPlan?.weekly && (
                <motion.div
                  key="weekly-list"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-3"
                >
                  {mealPlan.weekly.map((dayPlan, idx) => (
                    <div key={idx} className="space-y-2">
                      <button
                        onClick={() => setExpandedDay(expandedDay === dayPlan.day ? null : dayPlan.day)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${expandedDay === dayPlan.day ? 'bg-brand-emerald/5 border-brand-emerald/20' : 'bg-white border-brand-emerald/10'}`}
                      >
                        <span className="font-serif font-semibold text-lg text-brand-emerald">{dayPlan.day}</span>
                        {expandedDay === dayPlan.day ? <ChevronDown size={20} className="text-brand-emerald" /> : <ChevronRight size={20} />}
                      </button>
                      <AnimatePresence>
                        {expandedDay === dayPlan.day && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden space-y-2 pl-4"
                          >
                            {dayPlan.recipes.map((recipe, rIdx) => (
                              <button
                                key={rIdx}
                                onClick={() => setSelectedRecipe(recipe)}
                                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${selectedRecipe?.name === recipe.name ? 'bg-brand-emerald text-white' : 'bg-white border-brand-emerald/5 hover:border-brand-emerald/20'}`}
                              >
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{rIdx === 0 ? 'Lunch' : 'Dinner'}</span>
                                  </div>
                                  <h5 className="font-serif font-medium">{recipe.name}</h5>
                                </div>
                                <ChevronRight size={16} className="opacity-20" />
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-7">
            {selectedRecipe ? (
              <RecipeDisplay 
                recipe={selectedRecipe} 
                onSave={onSaveRecipe}
                onRemove={onRemoveRecipe}
                isSaved={isRecipeSaved(selectedRecipe.name)}
              />
            ) : (
              <div className="h-full min-h-[400px] bg-white rounded-[32px] border border-dashed border-brand-emerald/20 flex flex-col items-center justify-center p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center text-brand-emerald/30">
                  <Sparkles size={32} />
                </div>
                <h4 className="text-xl font-serif font-semibold text-brand-ink/40">Select a meal to view details</h4>
                <p className="text-brand-ink/30 text-sm max-w-xs">Explore our AI-curated budget-friendly Indian meal suggestions for your household.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
