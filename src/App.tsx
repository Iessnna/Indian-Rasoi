import React, { useState } from 'react';
import { ChefHat, Sparkles, UtensilsCrossed, MessageSquareText, BookOpen, Calendar, Crown, Settings2, Lock, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IngredientInput } from './components/IngredientInput';
import { RecipeDisplay } from './components/RecipeDisplay';
import { ChefAssistant } from './components/ChefAssistant';
import { MealPlanner } from './components/MealPlanner';
import { SavedRecipes } from './components/SavedRecipes';
import { SubscriptionModal } from './components/SubscriptionModal';
import { LegalModal } from './components/LegalModal';
import { generateRecipeFromIngredients, Recipe } from './services/gemini';
import { useSavedRecipes } from './hooks/useSavedRecipes';

type Tab = 'discover' | 'assistant' | 'mealplan' | 'collection';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('discover');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy'>('terms');
  const [dietaryPreference, setDietaryPreference] = useState('None');
  const { savedRecipes, saveRecipe, removeRecipe, isSaved } = useSavedRecipes();

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) return;
    
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    
    try {
      const generatedRecipe = await generateRecipeFromIngredients(ingredients, dietaryPreference);
      setRecipe(generatedRecipe);
    } catch (err) {
      console.error(err);
      setError('Failed to generate recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-ink selection:bg-brand-olive/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-olive/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-saffron flex items-center justify-center text-white shadow-lg shadow-brand-saffron/20">
              <ChefHat size={24} />
            </div>
            <h1 className="text-2xl font-serif font-bold tracking-tight">Indian Rasoi</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setActiveTab('discover')}
              className={`text-sm font-semibold uppercase tracking-widest transition-all ${activeTab === 'discover' ? 'text-brand-saffron border-b-2 border-brand-saffron pb-1' : 'text-brand-ink/40 hover:text-brand-ink/60'}`}
            >
              Recipe Discovery
            </button>
            <button 
              onClick={() => setActiveTab('mealplan')}
              className={`text-sm font-semibold uppercase tracking-widest transition-all ${activeTab === 'mealplan' ? 'text-brand-emerald border-b-2 border-brand-emerald pb-1' : 'text-brand-ink/40 hover:text-brand-ink/60'}`}
            >
              Meal Plans
            </button>
            <button 
              onClick={() => setActiveTab('assistant')}
              className={`text-sm font-semibold uppercase tracking-widest transition-all ${activeTab === 'assistant' ? 'text-brand-magenta border-b-2 border-brand-magenta pb-1' : 'text-brand-ink/40 hover:text-brand-ink/60'}`}
            >
              Chef Assistant
            </button>
            <button 
              onClick={() => setActiveTab('collection')}
              className={`text-sm font-semibold uppercase tracking-widest transition-all ${activeTab === 'collection' ? 'text-brand-saffron border-b-2 border-brand-saffron pb-1' : 'text-brand-ink/40 hover:text-brand-ink/60'}`}
            >
              My Collection
            </button>
          </nav>

          <div className="flex items-center gap-4">
            {isPro ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-brand-saffron text-white rounded-full shadow-lg shadow-brand-saffron/20">
                <Crown size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Pro Member</span>
              </div>
            ) : (
              <button
                onClick={() => setIsSubscriptionModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-brand-chili text-white rounded-full hover:bg-brand-chili/90 transition-all shadow-lg"
              >
                <Crown size={16} className="text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-widest">Go Pro</span>
              </button>
            )}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-brand-saffron/5 rounded-full border border-brand-saffron/10">
              <Sparkles size={16} className="text-brand-saffron" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-saffron">AI Powered</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] ${
              activeTab === 'discover' ? 'bg-brand-saffron/10 text-brand-saffron' :
              activeTab === 'mealplan' ? 'bg-brand-emerald/10 text-brand-emerald' :
              'bg-brand-magenta/10 text-brand-magenta'
            }`}
          >
            <UtensilsCrossed size={14} />
            <span>Authentic Indian Flavors</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-5xl md:text-7xl font-serif font-semibold leading-[1.1] tracking-tight ${
              activeTab === 'discover' ? 'text-brand-saffron' :
              activeTab === 'mealplan' ? 'text-brand-emerald' :
              'text-brand-magenta'
            }`}
          >
            {activeTab === 'discover' 
              ? 'Turn your ingredients into masterpieces.' 
              : activeTab === 'assistant' 
                ? 'Your professional chef, always on call.'
                : 'Budget-friendly meals for your home.'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-brand-ink/60 serif italic"
          >
            {activeTab === 'discover' 
              ? 'Tell us what you have in your pantry, and our AI will craft a personalized, gourmet recipe just for you.'
              : activeTab === 'assistant'
                ? 'Ask about techniques, substitutions, or cooking science. Get expert advice in seconds.'
                : 'Daily and weekly Indian household meal plans curated for taste and economy.'}
          </motion.p>
        </section>

        {/* Tab Content */}
        <div className="space-y-12">
          <AnimatePresence mode="wait">
            {activeTab === 'discover' ? (
              <motion.div
                key="discover"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-16"
              >
                <div className="space-y-8">
                  <IngredientInput 
                    ingredients={ingredients}
                    setIngredients={setIngredients}
                    onGenerate={handleGenerateRecipe}
                    isLoading={isLoading}
                  />

                  {/* Customization Feature (Pro Only) */}
                  <div className="max-w-2xl mx-auto p-6 bg-white rounded-3xl border border-brand-saffron/10 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-cream flex items-center justify-center text-brand-saffron">
                        <Settings2 size={20} />
                      </div>
                      <div>
                        <h4 className="font-serif font-semibold">Dietary Preference</h4>
                        <p className="text-xs text-brand-ink/40">Customize your recipe results</p>
                      </div>
                    </div>

                    {isPro ? (
                      <select 
                        value={dietaryPreference}
                        onChange={(e) => setDietaryPreference(e.target.value)}
                        className="bg-brand-cream border border-brand-saffron/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-saffron/20"
                      >
                        <option>None</option>
                        <option>Vegetarian</option>
                        <option>Vegan</option>
                        <option>Gluten-Free</option>
                        <option>Keto</option>
                      </select>
                    ) : (
                      <button 
                        onClick={() => setIsSubscriptionModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-cream text-brand-ink/40 rounded-xl border border-dashed border-brand-saffron/20 hover:border-brand-saffron/40 transition-all group"
                      >
                        <Lock size={14} />
                        <span className="text-xs font-bold uppercase tracking-widest group-hover:text-brand-ink">Unlock Pro</span>
                      </button>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-center">
                    {error}
                  </div>
                )}

                {recipe && (
                  <RecipeDisplay 
                    recipe={recipe} 
                    onSave={saveRecipe}
                    onRemove={removeRecipe}
                    isSaved={isSaved(recipe.name)}
                  />
                )}
                
                {!recipe && !isLoading && !error && (
                  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
                    {[
                      { icon: <BookOpen />, title: "Authentic", desc: "Recipes rooted in traditional Indian flavors.", color: "brand-saffron" },
                      { icon: <Sparkles />, title: "Smart", desc: "Discover unique Indian fusion ideas.", color: "brand-emerald" },
                      { icon: <UtensilsCrossed />, title: "Detailed", desc: "Step-by-step guides for every household.", color: "brand-magenta" }
                    ].map((feature, i) => (
                      <div key={i} className={`p-8 bg-white rounded-3xl border shadow-sm space-y-4 border-${feature.color}/10`}>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${feature.color}/5 text-${feature.color}`}>
                          {feature.icon}
                        </div>
                        <h4 className={`text-xl font-serif font-semibold text-${feature.color}`}>{feature.title}</h4>
                        <p className="text-brand-ink/50 text-sm leading-relaxed">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : activeTab === 'assistant' ? (
              <motion.div
                key="assistant"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ChefAssistant />
              </motion.div>
            ) : activeTab === 'mealplan' ? (
              <motion.div
                key="mealplan"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <MealPlanner 
                  onSaveRecipe={saveRecipe}
                  onRemoveRecipe={removeRecipe}
                  isRecipeSaved={isSaved}
                />
              </motion.div>
            ) : (
              <motion.div
                key="collection"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <SavedRecipes 
                  savedRecipes={savedRecipes}
                  onRemove={removeRecipe}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-saffron/10 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-50">
            <ChefHat size={20} />
            <span className="font-serif font-semibold">Indian Rasoi</span>
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-brand-ink/40">
            <button 
              onClick={() => {
                setLegalModalType('privacy');
                setIsLegalModalOpen(true);
              }}
              className="hover:text-brand-saffron transition-colors"
            >
              Privacy
            </button>
            <button 
              onClick={() => {
                setLegalModalType('terms');
                setIsLegalModalOpen(true);
              }}
              className="hover:text-brand-saffron transition-colors"
            >
              Terms
            </button>
            <a href="mailto:kumaravinash34880@gmail.com" className="hover:text-brand-saffron transition-colors">Contact</a>
          </div>
          <p className="text-xs text-brand-ink/30 font-medium">
            © {new Date().getFullYear()} Indian Rasoi. Celebrating Indian Cuisine.
          </p>
        </div>
      </footer>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 bg-brand-ink text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-8 z-50">
        <button 
          onClick={() => setActiveTab('discover')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'discover' ? 'text-white' : 'text-white/40'}`}
        >
          <BookOpen size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Discover</span>
        </button>
        <button 
          onClick={() => setActiveTab('mealplan')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'mealplan' ? 'text-white' : 'text-white/40'}`}
        >
          <Calendar size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Meals</span>
        </button>
        <button 
          onClick={() => setActiveTab('assistant')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'assistant' ? 'text-white' : 'text-white/40'}`}
        >
          <MessageSquareText size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Assistant</span>
        </button>
        <button 
          onClick={() => setActiveTab('collection')}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'collection' ? 'text-white' : 'text-white/40'}`}
        >
          <Bookmark size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Saved</span>
        </button>
      </div>

      <SubscriptionModal 
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        onSuccess={() => setIsPro(true)}
      />

      <LegalModal 
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        type={legalModalType}
      />
    </div>
  );
}
