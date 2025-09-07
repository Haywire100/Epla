import React from 'react';
import { PageState, AuthState } from '../types';

interface VendorSignUpProps {
  onNavigate: (page: PageState) => void;
  onSignIn: (user: AuthState) => void;
}

const VendorSignUp: React.FC<VendorSignUpProps> = ({ onNavigate, onSignIn }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a new vendor and return their ID.
    // For this demo, we'll simulate signing up and navigating to a pre-existing "new" vendor's dashboard.
    const newVendorId = 6; // From constants.ts
    onSignIn({ type: 'vendor', id: newVendorId });
    onNavigate({ name: 'vendorDashboard', vendorId: newVendorId });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Become a Vendor
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join our network of local farmers and sellers.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name / Farm Name
              </label>
              <div className="mt-1">
                <input id="name" name="name" type="text" autoComplete="name" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input id="password" name="password" type="password" autoComplete="new-password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="mt-1">
                <input id="location" name="location" type="text" autoComplete="street-address" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="product" className="block text-sm font-medium text-gray-700">
                Products you sell (e.g., Yams, Rice)
              </label>
              <div className="mt-1">
                <input id="product" name="product" type="text" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
              </div>
            </div>

             <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1">
                <input id="phone" name="phone" type="tel" autoComplete="tel" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
              </div>
            </div>

            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Sign Up & Go to Dashboard
              </button>
            </div>
          </form>
           <div className="mt-6 text-center">
            <button onClick={() => onNavigate({ name: 'home' })} className="font-medium text-secondary hover:text-secondary-dark">
                &larr; Back to Home
            </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSignUp;