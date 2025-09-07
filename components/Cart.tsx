
import React from 'react';
import { useCart } from '../context/CartContext';
import { XMarkIcon } from './icons/XMarkIcon';
import { CartItem, PageState } from '../types';
import { VENDORS } from '../constants';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  onNavigate: (page: PageState) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, onCheckout, onNavigate }) => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, itemCount } = useCart();

  const handleQuantityChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value, 10);
    if (!isNaN(quantity)) {
      updateQuantity(id, quantity);
    }
  };

  return (
    <div
      className={`fixed inset-0 overflow-hidden z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75"></div>
      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div className={`transform transition ease-in-out duration-500 sm:duration-700 w-screen max-w-md ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                <div className="ml-3 h-7 flex items-center">
                  <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={onClose}>
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon />
                  </button>
                </div>
              </div>
              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cartItems.length > 0 ? (
                      cartItems.map((item: CartItem) => {
                        const vendor = VENDORS.find(v => v.id === item.vendorId);
                        return (
                          <li key={item.id} className="py-6 flex">
                            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-center object-cover" />
                            </div>
                            <div className="ml-4 flex-1 flex flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>{item.name}</h3>
                                  <p className="ml-4">₦{(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  Sold by:{' '}
                                  {vendor ? (
                                    <a
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        onNavigate({ name: 'vendorProfile', vendorId: vendor.id });
                                        onClose();
                                      }}
                                      className="font-medium text-primary hover:text-primary-dark hover:underline"
                                    >
                                      {vendor.name}
                                    </a>
                                  ) : (
                                    <span className="font-medium text-gray-600">Epla Curated</span>
                                  )}
                                </p>
                              </div>
                              <div className="flex-1 flex items-end justify-between text-sm">
                                <div className="flex items-center">
                                  <label htmlFor={`quantity-${item.id}`} className="mr-2 text-gray-500">Qty</label>
                                  <input id={`quantity-${item.id}`} type="number" value={item.quantity} onChange={(e) => handleQuantityChange(item.id, e)} className="w-16 text-center border-gray-300 rounded-md shadow-sm" min="1" />
                                </div>
                                <div className="flex">
                                  <button onClick={() => removeFromCart(item.id)} type="button" className="font-medium text-secondary hover:text-secondary-dark">Remove</button>
                                </div>
                              </div>
                            </div>
                          </li>
                        )
                      })
                    ) : (
                      <p className="text-center text-gray-500 py-10">Your cart is empty.</p>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            {itemCount > 0 && (
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>₦{totalPrice.toLocaleString()}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                  <button onClick={onCheckout} className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark">Checkout</button>
                </div>
                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                  <p>or <button type="button" className="text-secondary hover:text-secondary-dark font-medium" onClick={onClose}>Continue Shopping<span aria-hidden="true"> &rarr;</span></button></p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
