import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { PageState, AuthState } from '../types';
import { MagnifyingGlassIcon } from './icons/MagnifyingGlassIcon';

interface HeaderProps {
  onCartClick: () => void;
  onNavigate: (page: PageState) => void;
  pageState: PageState;
  authState: AuthState;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, onNavigate, pageState, authState, onSignOut }) => {
  const { itemCount } = useCart();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetState: PageState) => {
    e.preventDefault();
    onNavigate(targetState);
  };


  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" onClick={(e) => handleNavClick(e, {name: 'home'})} className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-primary">Epla</span>
            </a>
          </div>
          
          {/* Search Bar */}
           <div className="flex-1 flex justify-center min-w-0 px-2 lg:justify-center">
            <div className="max-w-xl w-full">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input id="search" name="search" className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-full leading-5 bg-background placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm" placeholder="Search for yams, rice, palm oil..." type="search" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-2 sm:space-x-4">
               {authState && authState.type !== 'agent' && (
                <a href="#" onClick={(e) => { 
                  e.preventDefault(); 
                  if (authState.type === 'buyer') {
                    onNavigate({ name: 'buyerDashboard' });
                  } else if (authState.type === 'vendor') {
                    onNavigate({ name: 'vendorDashboard', vendorId: authState.id });
                  }
                }} className="hidden sm:block font-semibold text-text-secondary hover:text-primary transition-colors duration-300">Dashboard</a>
              )}
               <button
                  onClick={() => onNavigate({ name: 'vendorSignUp' })}
                  className="hidden md:inline-block px-4 py-2 border border-transparent text-sm font-semibold rounded-md text-white bg-secondary hover:bg-secondary-dark transition duration-300"
                >
                  Sell on Epla
              </button>
              <button
                onClick={onCartClick}
                className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-primary focus:outline-none transition-colors duration-300"
                aria-label="Open cart"
              >
                <ShoppingCartIcon />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-secondary rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>

              {authState ? (
                <button
                  onClick={onSignOut}
                  className="px-4 py-2 border border-gray-300 text-sm font-semibold rounded-md text-text-primary bg-gray-50 hover:bg-gray-100 transition duration-300"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => onNavigate({ name: 'signIn' })}
                  className="px-4 py-2 border border-transparent text-sm font-semibold rounded-md text-white bg-primary hover:bg-primary-dark transition duration-300"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
