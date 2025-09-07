import React from 'react';
import { PageState, AuthState } from '../types';
import { UserIcon } from './icons/UserIcon';
import { BuildingStorefrontIcon } from './icons/BuildingStorefrontIcon';

interface SignInProps {
  onNavigate: (page: PageState) => void;
  onSignIn: (user: AuthState) => void;
}

const SignIn: React.FC<SignInProps> = ({ onNavigate, onSignIn }) => {
  
  const handleBuyerSignIn = () => {
    // In a real app, you would validate credentials.
    onSignIn({ type: 'buyer', id: 1 });
    onNavigate({ name: 'buyerDashboard' });
  };

  const handleVendorSignIn = (vendorId: number) => {
    onSignIn({ type: 'vendor', id: vendorId });
    onNavigate({ name: 'vendorDashboard', vendorId: vendorId });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign In
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Choose your role to continue your farm-to-table journey.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-gray-200">
            
            {/* Buyer Sign In */}
            <div className="flex flex-col items-center text-center px-4 md:pr-8">
              <BuildingStorefrontIcon className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-2xl font-bold text-gray-800">I am a Buyer</h3>
              <p className="mt-2 text-gray-500 min-h-[40px]">
                Sign in to track orders and enjoy a faster checkout.
              </p>
              <form className="w-full max-w-sm space-y-4 mt-6" onSubmit={(e) => { e.preventDefault(); handleBuyerSignIn(); }}>
                <div>
                    <label htmlFor="buyer-email" className="sr-only">Email address</label>
                    <input id="buyer-email" name="email" type="email" autoComplete="email" required defaultValue="buyer@epla.com" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Email address" />
                </div>
                <div>
                    <label htmlFor="buyer-password" className="sr-only">Password</label>
                    <input id="buyer-password" name="password" type="password" required defaultValue="password" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Password" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input id="remember-me-buyer" name="remember-me-buyer" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                    <label htmlFor="remember-me-buyer" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Password reset feature coming soon!'); }} className="font-medium text-secondary hover:text-secondary-dark">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  Sign In as Buyer
                </button>
              </form>
              <div className="mt-4 text-sm">
                <p className="text-gray-600">
                  New to Epla?{' '}
                  <button onClick={() => onNavigate({ name: 'buyerSignUp' })} className="font-medium text-secondary hover:text-secondary-dark">
                    Create an account
                  </button>
                </p>
              </div>
            </div>

            {/* Vendor Sign In */}
            <div className="flex flex-col items-center text-center px-4 md:pl-8 mt-12 md:mt-0">
              <UserIcon className="h-12 w-12 text-secondary" />
              <h3 className="mt-4 text-2xl font-bold text-gray-800">I am a Vendor</h3>
              <p className="mt-2 text-gray-500 min-h-[40px]">
                Sign in to manage your inventory and orders.
              </p>
              <form className="w-full max-w-sm space-y-4 mt-6" onSubmit={(e) => { e.preventDefault(); handleVendorSignIn(1); /* Simulate login for first vendor */ }}>
                <div>
                    <label htmlFor="vendor-email" className="sr-only">Email address</label>
                    <input id="vendor-email" name="email" type="email" autoComplete="email" required defaultValue="vendor@epla.com" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Email address" />
                </div>
                <div>
                    <label htmlFor="vendor-password" className="sr-only">Password</label>
                    <input id="vendor-password" name="password" type="password" required defaultValue="password" className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="Password" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input id="remember-me-vendor" name="remember-me-vendor" type="checkbox" className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded" />
                    <label htmlFor="remember-me-vendor" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Password reset feature coming soon!'); }} className="font-medium text-secondary hover:text-secondary-dark">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary">
                  Sign In as Vendor
                </button>
              </form>
               <div className="mt-4 text-sm">
                <p className="text-gray-600">
                  Want to sell on Epla?{' '}
                  <button onClick={() => onNavigate({ name: 'vendorSignUp' })} className="font-medium text-secondary hover:text-secondary-dark">
                    Become a Vendor
                  </button>
                </p>
              </div>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button onClick={() => onNavigate({ name: 'home' })} className="font-medium text-gray-500 hover:text-gray-700">
                &larr; Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;