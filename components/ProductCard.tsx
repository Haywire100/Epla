
import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { PageState } from '../types';
import { MapPinIcon } from './icons/MapPinIcon';
import { CheckIcon } from './icons/CheckIcon';
import { VENDORS } from '../constants';

interface ProductCardProps {
  product: Product;
  onNavigate: (state: PageState) => void;
  gridTitle?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate, gridTitle }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const vendor = VENDORS.find(v => v.id === product.vendorId);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking the button
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => {
        setIsAdding(false);
    }, 1500);
  };
  
  const handleCardClick = () => {
    if (gridTitle === 'Featured Staples') {
      onNavigate({ name: 'buyerDashboard' });
    } else {
      // This function can be used later to navigate to a product detail page
      // For now, it does nothing to prevent interfering with vendor profile navigation
      console.log("Card clicked on a different grid:", product.name);
    }
  };
  
  return (
    <div onClick={handleCardClick} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer">
        <div className="relative block overflow-hidden">
            <img className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105" src={product.imageUrl} alt={product.name} />
        </div>
        <div className="p-3 sm:p-4 flex flex-col flex-grow">
            <h3 className="text-base font-semibold text-text-primary mb-1 truncate group-hover:text-primary transition-colors">{product.name}</h3>
            
            {vendor && (
              <p className="text-xs text-text-secondary mb-2 truncate">
                Sold by <a href="#" onClick={(e) => { e.stopPropagation(); onNavigate({ name: 'vendorProfile', vendorId: vendor.id }); }} className="font-medium hover:text-primary hover:underline">{vendor.name}</a>
              </p>
            )}

            {product.origin && (
              <p className="text-sm text-text-secondary mb-3 flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1.5 flex-shrink-0"/>
                  <span className="truncate">{product.origin}</span>
              </p>
            )}
            
            <p className="text-sm text-gray-600 mb-4 flex-grow min-h-[20px]">{product.description || ''}</p>

            <div className="mt-auto flex items-center justify-between">
                <div>
                    <p className="text-xl font-extrabold text-primary">
                        ₦{product.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-text-secondary">/ {product.unit}</p>
                </div>
                <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`h-10 w-10 flex items-center justify-center rounded-full transition-all duration-200 ${isAdding ? 'bg-primary text-white' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
                    aria-label={`Add ${product.name} to cart`}
                >
                    {isAdding ? <CheckIcon className="h-5 w-5"/> : <ShoppingCartIcon className="h-5 w-5" />}
                </button>
            </div>
        </div>
    </div>
  );
};

export default ProductCard;