import React, { useState } from 'react';
import { PageState, Order, Product, NewProductData, AuthState } from '../types';
import { VENDORS, PRODUCTS } from '../constants';
import { useOrders } from '../context/OrderContext';
import VendorOrderCard from './VendorOrderCard';
import { ArchiveBoxIcon } from './icons/ArchiveBoxIcon';
import { InboxArrowDownIcon } from './icons/InboxArrowDownIcon';
import { TruckIcon } from './icons/TruckIcon';
import InventoryGrid from './InventoryGrid';
import AddProductForm from './AddProductForm';
import { PlusCircleIcon } from './icons/PlusCircleIcon';
import { CurrencyNairaIcon } from './icons/CurrencyNairaIcon';
import { CubeIcon } from './icons/CubeIcon';
import { WalletIcon } from './icons/WalletIcon';
import { ChatBubbleLeftRightIcon } from './icons/ChatBubbleLeftRightIcon';
import { useMessages } from '../context/MessageContext';
import ConversationList from './ConversationList';

interface VendorDashboardProps {
  vendorId: number;
  onNavigate: (page: PageState) => void;
  authState: AuthState;
}

const VendorDashboard: React.FC<VendorDashboardProps> = ({ vendorId, onNavigate, authState }) => {
  const [activeTab, setActiveTab] = useState('ordersReceived');
  const [inventoryView, setInventoryView] = useState<'view' | 'add'>('view');
  const { orders, updateOrderStatus } = useOrders();
  const { getConversationsForUser } = useMessages();

  const [inventory, setInventory] = useState<Product[]>(() => 
    PRODUCTS.filter(p => p.vendorId === vendorId)
  );
  
  const vendor = VENDORS.find(v => v.id === vendorId);

  if (authState?.type !== 'vendor' || authState.id !== vendorId) {
    return <div className="p-8 text-center">You are not authorized to view this page.</div>;
  }
  
  const conversations = getConversationsForUser(vendorId, 'vendor');
  const unreadCount = conversations.reduce((sum, conv) => sum + conv.unreadByVendor, 0);
  
  const vendorOrders = orders.filter(order => 
    order.items.some(item => item.vendorId === vendorId)
  );

  const receivedOrders = vendorOrders.filter(o => o.status === 'Placed').sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const sentOrders = vendorOrders.filter(o => o.status !== 'Placed').sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const totalEarnings = sentOrders.reduce((total, order) => {
    const orderPortion = order.items
      .filter(item => item.vendorId === vendorId)
      .reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return total + orderPortion;
  }, 0);


  if (!vendor) {
    return <div className="text-center py-20">Vendor not found.</div>;
  }
  
  const handleApproveOrder = (order: Order) => {
    updateOrderStatus(order.id, 'Processing');
  };

  const handleStockUpdate = (productId: number, newStock: number) => {
    setInventory(currentInventory =>
      currentInventory.map(product =>
        product.id === productId ? { ...product, stock: newStock } : product
      )
    );
  };
  
  const handlePriceUpdate = (productId: number, newPrice: number) => {
    setInventory(currentInventory =>
      currentInventory.map(product =>
        product.id === productId ? { ...product, price: newPrice } : product
      )
    );
  };
  
  const handleAddProduct = (newProductData: NewProductData) => {
    const newProduct: Product = {
      id: Math.max(0, ...PRODUCTS.map(p => p.id), ...inventory.map(p => p.id)) + 1, // Ensure unique ID
      vendorId: vendorId,
      ...newProductData,
    };
    setInventory(currentInventory => [...currentInventory, newProduct]);
    // Also add to global PRODUCTS for session persistence in this demo
    PRODUCTS.push(newProduct);
    setInventoryView('view');
  };

  return (
    <div className="flex-grow bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {vendor.name}</h1>
          <p className="mt-1 text-gray-600">Here's a summary of your shop's activity.</p>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <InboxArrowDownIcon className="h-6 w-6 text-white bg-secondary p-1 rounded-full" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Pending Orders</dt>
                                <dd className="text-2xl font-bold text-gray-900">{receivedOrders.length}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <CurrencyNairaIcon className="h-6 w-6 text-white bg-primary p-1 rounded-full" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Total Earnings</dt>
                                <dd className="text-2xl font-bold text-gray-900">₦{totalEarnings.toLocaleString()}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <CubeIcon className="h-6 w-6 text-white bg-accent p-1 rounded-full" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Products Listed</dt>
                                <dd className="text-2xl font-bold text-gray-900">{inventory.length}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('ordersReceived')}
              className={`${
                activeTab === 'ordersReceived' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <InboxArrowDownIcon className="mr-2" />
              Orders Received ({receivedOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('ordersSent')}
              className={`${
                activeTab === 'ordersSent' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <TruckIcon className="mr-2" />
              Orders Sent
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`${
                activeTab === 'inventory' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <ArchiveBoxIcon className="mr-2" />
              My Inventory
            </button>
             <button
              onClick={() => setActiveTab('messages')}
              className={`${
                activeTab === 'messages' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center relative`}
            >
              <ChatBubbleLeftRightIcon className="mr-2" />
              Messages
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-secondary rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
             <button
              onClick={() => setActiveTab('payments')}
              className={`${
                activeTab === 'payments' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <WalletIcon className="mr-2" />
              Payments
            </button>
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === 'inventory' && (
             <div>
                <div className="sm:flex sm:items-baseline sm:justify-between border-b border-gray-200 pb-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Manage Inventory</h2>
                        <p className="mt-1 text-gray-600">View, update, or add new products to your store.</p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-10">
                        <nav className="flex space-x-2 rounded-lg bg-gray-200 p-1">
                            <button onClick={() => setInventoryView('view')} className={`px-3 py-1 text-sm font-medium rounded-md flex items-center ${inventoryView === 'view' ? 'bg-white text-primary shadow' : 'text-gray-600 hover:bg-white/50'}`}>
                                View Inventory
                            </button>
                            <button onClick={() => setInventoryView('add')} className={`px-3 py-1 text-sm font-medium rounded-md flex items-center ${inventoryView === 'add' ? 'bg-white text-primary shadow' : 'text-gray-600 hover:bg-white/50'}`}>
                                <PlusCircleIcon className="mr-1" /> Add Product
                            </button>
                        </nav>
                    </div>
                </div>
                {inventoryView === 'view' && <InventoryGrid products={inventory} onStockUpdate={handleStockUpdate} onPriceUpdate={handlePriceUpdate} />}
                {inventoryView === 'add' && <AddProductForm onAddProduct={handleAddProduct} onCancel={() => setInventoryView('view')} />}
            </div>
          )}
          {activeTab === 'ordersReceived' && (
            <div className="space-y-6">
              {receivedOrders.length > 0 ? (
                receivedOrders.map(order => (
                  <VendorOrderCard key={order.id} order={order} vendorId={vendorId} onApprove={handleApproveOrder}/>
                ))
              ) : (
                 <div className="text-center bg-white p-12 rounded-lg shadow">
                  <h3 className="text-xl font-medium text-gray-900">No New Orders</h3>
                  <p className="mt-2 text-gray-500">You have no pending orders right now. We'll notify you when a new one comes in!</p>
                </div>
              )}
            </div>
          )}
           {activeTab === 'ordersSent' && (
            <div className="space-y-6">
              {sentOrders.length > 0 ? (
                sentOrders.map(order => (
                  <VendorOrderCard key={order.id} order={order} vendorId={vendorId} />
                ))
              ) : (
                 <div className="text-center bg-white p-12 rounded-lg shadow">
                  <h3 className="text-xl font-medium text-gray-900">No Sent Orders Yet</h3>
                  <p className="mt-2 text-gray-500">Approve an order from the "Orders Received" tab to see it here.</p>
                </div>
              )}
            </div>
          )}
          {activeTab === 'messages' && (
            <ConversationList authState={authState} onNavigate={onNavigate} />
          )}
           {activeTab === 'payments' && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment History</h2>
               <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sentOrders.map(order => {
                       const vendorTotal = order.items.filter(item => item.vendorId === vendorId).reduce((total, item) => total + item.price * item.quantity, 0);
                       return (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₦{vendorTotal.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
                          </td>
                        </tr>
                       )
                    })}
                  </tbody>
               </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;