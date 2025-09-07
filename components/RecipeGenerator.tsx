
import React, { useState, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { generateRecipe } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { XMarkIcon } from './icons/XMarkIcon';

const RecipeGenerator: React.FC = () => {
  const { cartItems } = useCart();
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerateRecipe = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setIsModalOpen(true);
    setRecipe('');
    
    const ingredients = cartItems.map(item => item.name);
    try {
      const result = await generateRecipe(ingredients);
      setRecipe(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [cartItems]);
  
  // A simple markdown to HTML converter
  const renderMarkdown = (text: string) => {
    return text
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/^- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
      .replace(/^\n/gm, '<br />');
  };

  return (
    <section id="recipe" className="bg-green-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SparklesIcon className="mx-auto h-12 w-12 text-secondary" />
        <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">Stuck for ideas?</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Let our AI chef whip up a delicious recipe based on the fresh ingredients in your cart!
        </p>
        <div className="mt-8">
          <button
            onClick={handleGenerateRecipe}
            disabled={cartItems.length === 0 || isLoading}
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300 transform hover:scale-105"
          >
            {isLoading ? 'Thinking...' : 'Generate Recipe'}
          </button>
          {cartItems.length === 0 && <p className="mt-4 text-sm text-gray-500">Add items to your cart to enable this feature.</p>}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center pb-3 border-b">
              <h3 className="text-2xl font-bold text-primary">Your Personal Recipe</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                <XMarkIcon />
              </button>
            </div>
            <div className="mt-3 max-h-[70vh] overflow-y-auto pr-4">
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                    <p className="mt-4 text-text-secondary">Our AI chef is crafting your recipe...</p>
                </div>
              )}
              {error && <p className="text-red-500">{error}</p>}
              {recipe && <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(recipe) }} />}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecipeGenerator;
