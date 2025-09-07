
import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';

interface InventoryCardProps {
  product: Product;
  onStockUpdate: (productId: number, newStock: number) => void;
  onPriceUpdate: (productId: number, newPrice: number) => void;
}

const InventoryCard: React.FC<InventoryCardProps> = ({ product, onStockUpdate, onPriceUpdate }) => {
  const [stock, setStock] = useState(product.stock);
  const [isEditingStock, setIsEditingStock] = useState(false);
  const stockInputRef = useRef<HTMLInputElement>(null);

  const [price, setPrice] = useState(product.price);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const priceInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingStock && stockInputRef.current) {
      stockInputRef.current.focus();
      stockInputRef.current.select();
    }
  }, [isEditingStock]);
  
  useEffect(() => {
    if (isEditingPrice && priceInputRef.current) {
      priceInputRef.current.focus();
      priceInputRef.current.select();
    }
  }, [isEditingPrice]);

  const handleSaveStock = () => {
    if (stock !== product.stock) {
        onStockUpdate(product.id, stock);
    }
    setIsEditingStock(false);
  };
  
  const handleStockKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSaveStock();
    if (e.key === 'Escape') {
        setStock(product.stock);
        setIsEditingStock(false);
    }
  };

  const handleSavePrice = () => {
    if (price !== product.price) {
        onPriceUpdate(product.id, price);
    }
    setIsEditingPrice(false);
  };

  const handlePriceKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSavePrice();
    if (e.key === 'Escape') {
        setPrice(product.price);
        setIsEditingPrice(false);
    }
  };


  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col border border-gray-100">
      <div className="relative">
        <img className="w-full h-40 object-cover" src={product.imageUrl} alt={product.name} />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-bold text-text-primary mb-1 truncate">{product.name}</h3>
        
        {isEditingPrice ? (
            <div className="flex items-center space-x-2 mb-3">
              <span className="font-bold text-primary">₦</span>
              <input
                ref={priceInputRef}
                type="number"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value, 10) || 0)}
                onBlur={handleSavePrice}
                onKeyDown={handlePriceKeyDown}
                className="w-20 px-2 py-1 border border-primary rounded-md shadow-sm text-lg font-bold"
              />
               <span className="text-sm text-text-secondary">/ {product.unit}</span>
            </div>
        ) : (
            <button onClick={() => setIsEditingPrice(true)} className="text-left py-1 rounded-md hover:bg-gray-100 group mb-3">
                 <div className="flex items-baseline justify-start space-x-1">
                    <p className="text-lg font-extrabold text-primary">
                        ₦{product.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-text-secondary">/ {product.unit}</p>
                </div>
                 <p className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">Click to edit price</p>
            </button>
        )}
        
        <div className="mt-auto pt-3 border-t border-gray-100">
          <label htmlFor={`stock-${product.id}`} className="block text-sm font-medium text-gray-700 mb-1">
            Stock Quantity
          </label>
          {isEditingStock ? (
            <div className="flex items-center space-x-2">
              <input
                ref={stockInputRef}
                id={`stock-${product.id}`}
                type="number"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value, 10) || 0)}
                onBlur={handleSaveStock}
                onKeyDown={handleStockKeyDown}
                className="w-full px-2 py-1 border border-primary rounded-md shadow-sm text-center text-lg font-bold"
              />
               <button 
                 onClick={handleSaveStock}
                 className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark"
               >
                 Save
               </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingStock(true)}
              className="w-full text-left px-2 py-1 border border-transparent rounded-md hover:bg-gray-100 group"
            >
              <p className="text-2xl font-extrabold text-primary">{stock}</p>
              <p className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">Click to edit stock</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;