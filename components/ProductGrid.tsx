
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../types';
// FIX: Updated PageState import path after refactoring.
import { PageState } from '../types';

interface ProductGridProps {
  products: Product[];
  onNavigate: (state: PageState) => void;
  title?: string;
  subtitle?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  onNavigate,
  title = "Today's Harvest",
  subtitle = "Explore a collection of fresh produce, handpicked for your family."
}) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {title && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="mt-2 text-lg text-text-secondary">{subtitle}</p>}
        </div>
      )}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onNavigate={onNavigate} gridTitle={title} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found in this category.</p>
      )}
    </div>
  );
};

export default ProductGrid;