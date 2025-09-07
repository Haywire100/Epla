
import React from 'react';
import { Product } from '../types';
import InventoryCard from './InventoryCard';

interface InventoryGridProps {
  products: Product[];
  onStockUpdate: (productId: number, newStock: number) => void;
  onPriceUpdate: (productId: number, newPrice: number) => void;
}

const InventoryGrid: React.FC<InventoryGridProps> = ({ products, onStockUpdate, onPriceUpdate }) => {
  return (
    <div>
        {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(product => (
                <InventoryCard 
                  key={product.id} 
                  product={product} 
                  onStockUpdate={onStockUpdate} 
                  onPriceUpdate={onPriceUpdate}
                />
            ))}
            </div>
        ) : (
             <div className="text-center bg-white p-12 rounded-lg shadow">
              <h3 className="text-xl font-medium text-gray-900">No Products Found</h3>
              <p className="mt-2 text-gray-500">You haven't added any products yet. Click "Add Product" to get started!</p>
            </div>
        )}
    </div>
  );
};

export default InventoryGrid;