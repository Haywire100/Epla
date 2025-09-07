import React from 'react';
import { GrainIcon } from './icons/GrainIcon';
import { TuberIcon } from './icons/TuberIcon';
import { OilIcon } from './icons/OilIcon';
import { VegetableIcon } from './icons/VegetableIcon';
import { FruitsIcon } from './icons/FruitsIcon';
import { BoxIcon } from './icons/BoxIcon';
import { PageState } from '../types';

const categories = [
  { name: 'Grains & Rice', icon: GrainIcon },
  { name: 'Yams & Tubers', icon: TuberIcon },
  { name: 'Oils & Spices', icon: OilIcon },
  { name: 'Vegetables', icon: VegetableIcon },
  { name: 'Fruits', icon: FruitsIcon },
  { name: 'Bundles & Packs', icon: BoxIcon },
];

interface CategoriesProps {
  onNavigate: (page: PageState) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onNavigate }) => {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Browse by category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <a 
              href="#" 
              key={category.name} 
              onClick={(e) => {
                e.preventDefault();
                onNavigate({ name: 'buyerDashboard' });
              }}
              className="flex flex-col items-center justify-center text-center p-4 bg-background rounded-lg hover:shadow-md hover:-translate-y-1 transition-all duration-200 border border-transparent hover:border-primary/20">
              <category.icon className="h-10 w-10 text-primary mb-3" />
              <span className="text-sm font-semibold text-text-primary">{category.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;