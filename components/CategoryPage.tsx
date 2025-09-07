import React from 'react';
import { PageState } from '../types';
import { PRODUCTS, BUNDLES } from '../constants';
import ProductGrid from './ProductGrid';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface CategoryPageProps {
  categoryName: string;
  onNavigate: (page: PageState) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categoryName, onNavigate }) => {
  const allProducts = [...PRODUCTS, ...BUNDLES];
  const categoryProducts = allProducts.filter(p => p.category === categoryName);

  return (
    <div className="flex-grow bg-background">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
            <button 
                onClick={() => onNavigate({ name: 'home' })} 
                className="flex items-center text-sm font-medium text-gray-600 hover:text-primary mb-4"
            >
                <ArrowLeftIcon className="mr-2"/>
                Back to Home
            </button>
            <h1 className="text-4xl font-extrabold text-gray-900">{categoryName}</h1>
            <p className="mt-2 text-lg text-text-secondary">
                {`Discover fresh ${categoryName.toLowerCase()} sourced directly from our trusted farmers.`}
            </p>
        </div>

        <ProductGrid 
          products={categoryProducts} 
          onNavigate={onNavigate}
          title=""
          subtitle=""
        />
      </main>
    </div>
  );
};

export default CategoryPage;