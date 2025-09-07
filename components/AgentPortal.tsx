import React, { useState } from 'react';
import { PageState, Product } from '../types';
import { PRODUCTS } from '../constants';

const AgentPortal: React.FC<{ onNavigate: (page: PageState) => void }> = ({ onNavigate }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderItems, setOrderItems] = useState<{ product: Product, quantity: number }[]>([]);
  
  const handleAddProduct = (productId: string) => {
    const product = PRODUCTS.find(p => p.id === parseInt(productId));
    if (product) {
      const existingItem = orderItems.find(item => item.product.id === product.id);
      if (existingItem) {
        setOrderItems(orderItems.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      } else {
        setOrderItems([...orderItems, { product, quantity: 1 }]);
      }
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || orderItems.length === 0) {
      alert('Please fill in customer details and add at least one product.');
      return;
    }
    const total = orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    // In a real app, this would submit the order through the backend.
    alert(`Order placed successfully for ${customerName}!\nTotal: ₦${total.toLocaleString()}\nAn SMS confirmation has been sent.`);
    // Reset form
    setCustomerName('');
    setCustomerPhone('');
    setOrderItems([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Community Agent Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Place orders on behalf of community members.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Order Form */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-gray-800 mb-4">New Order Form</h3>
            <form className="space-y-6" onSubmit={handlePlaceOrder}>
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
                  Customer's Full Name
                </label>
                <div className="mt-1">
                  <input id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} type="text" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                </div>
              </div>

               <div>
                <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700">
                  Customer's Phone Number (for SMS)
                </label>
                <div className="mt-1">
                  <input id="customerPhone" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} type="tel" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                </div>
              </div>
              
              <div>
                 <label htmlFor="productSelect" className="block text-sm font-medium text-gray-700">Add Product to Order</label>
                 <div className="mt-1 flex">
                    <select id="productSelect" name="product" className="block w-full rounded-md rounded-r-none border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm">
                        <option value="">-- Select a product --</option>
                        {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name} - ₦{p.price}/{p.unit}</option>)}
                    </select>
                    <button type="button" onClick={() => handleAddProduct((document.getElementById('productSelect') as HTMLSelectElement).value)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-300 font-semibold text-sm">Add</button>
                 </div>
              </div>

              {orderItems.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-800">Current Order:</h4>
                  <ul className="divide-y mt-2">
                    {orderItems.map(item => (
                      <li key={item.product.id} className="py-2 flex justify-between items-center">
                        <span>{item.product.name} (x{item.quantity})</span>
                        <span className="font-medium">₦{(item.product.price * item.quantity).toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-right font-bold mt-2">Total: ₦{orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toLocaleString()}</p>
                </div>
              )}

              <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  Place Order & Send SMS
                </button>
              </div>
            </form>
          </div>
          
          {/* Commission Tracking */}
          <div className="md:col-span-1 border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Your Dashboard</h3>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-800">Total Referrals</p>
                <p className="text-2xl font-bold text-green-900">12</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">Pending Commission</p>
                <p className="text-2xl font-bold text-yellow-900">₦4,500</p>
              </div>
               <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-800">Total Earned</p>
                <p className="text-2xl font-bold text-gray-900">₦28,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPortal;
