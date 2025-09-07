import React, { useState } from 'react';
import { PageState, AuthState } from '../types';
import ProductGrid from './ProductGrid';
import { PRODUCTS } from '../constants';
import { ShoppingBagIcon } from './icons/ShoppingBagIcon';
import { ClipboardDocumentListIcon } from './icons/ClipboardDocumentListIcon';
import { useOrders } from '../context/OrderContext';
import OrderHistoryCard from './OrderHistoryCard';
import { EnvelopeIcon } from './icons/EnvelopeIcon';
import { useMessages } from '../context/MessageContext';
import ConversationList from './ConversationList';

interface BuyerDashboardProps {
  onNavigate: (page: PageState) => void;
  authState: AuthState;
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ onNavigate, authState }) => {
  const [activeTab, setActiveTab] = useState('products');
  const { orders } = useOrders();
  const { getConversationsForUser } = useMessages();

  if (authState?.type !== 'buyer') {
    // This should ideally be handled by the router in App.tsx
    return <div className="p-8 text-center">Please sign in as a buyer to view this page.</div>;
  }
  const buyerId = authState.id;
  const conversations = getConversationsForUser(buyerId, 'buyer');
  const unreadCount = conversations.reduce((sum, conv) => sum + conv.unreadByBuyer, 0);


  return (
    <div className="flex-grow bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to your Dashboard</h1>
          <p className="mt-1 text-gray-600">Browse products, view your orders, and more.</p>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('products')}
              className={`${
                activeTab === 'products'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <ShoppingBagIcon className="mr-2" />
              All Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`${
                activeTab === 'orders'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
               <ClipboardDocumentListIcon className="mr-2" />
              My Orders
            </button>
             <button
              onClick={() => setActiveTab('inbox')}
              className={`${
                activeTab === 'inbox'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center relative`}
            >
               <EnvelopeIcon className="mr-2" />
              Inbox
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-secondary rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === 'products' && (
            <ProductGrid 
                products={PRODUCTS} 
                onNavigate={onNavigate}
                title="Find Your Favorites"
                subtitle="A fresh selection from our community of farmers."
            />
          )}
          {activeTab === 'orders' && (
            <div>
              {orders.length > 0 ? (
                <div className="space-y-8">
                  {orders.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(order => (
                    <OrderHistoryCard key={order.id} order={order} onNavigate={onNavigate} />
                  ))}
                </div>
              ) : (
                <div className="text-center bg-white p-12 rounded-lg shadow">
                  <h3 className="text-xl font-medium text-gray-900">Your Order History is Empty</h3>
                  <p className="mt-2 text-gray-500">You haven't placed any orders yet. Start shopping to see your orders here!</p>
                </div>
              )}
            </div>
          )}
           {activeTab === 'inbox' && (
            <ConversationList authState={authState} onNavigate={onNavigate} />
           )}
        </div>
      </main>
    </div>
  );
};

export default BuyerDashboard;