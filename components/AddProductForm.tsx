
import React, { useState } from 'react';
import { NewProductData } from '../types';

interface AddProductFormProps {
  onAddProduct: (productData: NewProductData) => void;
  onCancel: () => void;
}

// FIX: Add a list of product categories for the new product form.
const productCategories = [
  'Grains & Rice',
  'Yams & Tubers',
  'Oils & Spices',
  'Vegetables',
  'Fruits',
];

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct, onCancel }) => {
  // FIX: Initialize 'category' in the form state to align with the updated NewProductData type.
  const [formData, setFormData] = useState<NewProductData>({
    name: '',
    price: 0,
    unit: '',
    stock: 0,
    imageUrl: '',
    category: '',
  });
  
  // FIX: Update handleChange to support both input and select elements.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseInt(value, 10) || 0 : value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    // FIX: Add 'category' to the form submission validation.
    if (formData.name && formData.category && formData.price > 0 && formData.unit && formData.stock >= 0 && formData.imageUrl) {
        onAddProduct(formData);
    } else {
        alert('Please fill out all fields correctly.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add a New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
             <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <div className="mt-1">
                <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
              </div>
            </div>
            
            {/* FIX: Add a category selection dropdown to the form. */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <div className="mt-1">
                <select id="category" name="category" value={formData.category} onChange={handleChange} required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                    <option value="" disabled>Select a category</option>
                    {productCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price (₦)
                  </label>
                  <div className="mt-1">
                    <input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                  </div>
                </div>
                 <div>
                  <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                    Unit (e.g., kg, bunch, tuber)
                  </label>
                  <div className="mt-1">
                    <input id="unit" name="unit" type="text" value={formData.unit} onChange={handleChange} required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                  </div>
                </div>
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                Initial Stock Quantity
              </label>
              <div className="mt-1">
                <input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
              </div>
            </div>
            
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                Product Image URL
              </label>
              <div className="mt-1">
                <input id="imageUrl" name="imageUrl" type="url" value={formData.imageUrl} onChange={handleChange} required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={onCancel} className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Cancel
                </button>
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Add Product
                </button>
            </div>

        </form>
    </div>
  );
};

export default AddProductForm;
