
import React from 'react';
import { PageState, OrderStatus } from '../types';
import { useOrders } from '../context/OrderContext';
import { VENDORS } from '../constants';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { CameraIcon } from './icons/CameraIcon';

interface OrderDetailsPageProps {
  orderId: string;
  onNavigate: (page: PageState) => void;
}

const OrderDetailsPage: React.FC<OrderDetailsPageProps> = ({ orderId, onNavigate }) => {
  const { orders } = useOrders();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="text-center py-20 flex-grow bg-gray-50">
        <h2 className="text-2xl font-bold">Order not found</h2>
        <button onClick={() => onNavigate({ name: 'buyerDashboard' })} className="mt-4 text-secondary hover:text-secondary-dark">
          &larr; Back to Dashboard
        </button>
      </div>
    );
  }

  const statusSteps: OrderStatus[] = ['Placed', 'Processing', 'Out for Delivery', 'Delivered'];
  const currentStatusIndex = statusSteps.indexOf(order.status);
  const progressPercentage = ((currentStatusIndex + 1) / statusSteps.length) * 100;

  return (
    <div className="flex-grow bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button 
            onClick={() => onNavigate({ name: 'buyerDashboard' })} 
            className="flex items-center text-sm font-medium text-gray-600 hover:text-primary mb-4"
          >
            <ArrowLeftIcon className="mr-2"/>
            Back to My Orders
          </button>
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
              <p className="mt-1 text-gray-600">
                Order #{order.id} &bull; Placed on {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-base font-semibold ${
                order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {order.status}
              </span>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-4 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Progress</h3>
                <div className="overflow-hidden rounded-full bg-gray-200">
                <div className="h-2.5 rounded-full bg-primary transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <ol className="mt-4 grid grid-cols-4 text-sm font-medium text-gray-500">
                {statusSteps.map((step, index) => (
                    <li key={step} className={`text-center ${index <= currentStatusIndex ? 'text-primary font-semibold' : ''}`}>
                    <span>{step}</span>
                    </li>
                ))}
                </ol>
            </div>
            <div className="border-t border-gray-200 p-4 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Items Purchased</h3>
                <ul role="list" className="divide-y divide-gray-200">
                {order.items.map(item => {
                    const vendor = VENDORS.find(v => v.id === item.vendorId);
                    return (
                    <li key={item.id} className="py-4 flex">
                        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-lg overflow-hidden">
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
                                  }}
                                  className="font-medium text-primary hover:text-primary-dark hover:underline"
                                >
                                  {vendor.name}
                                </a>
                              ) : (
                                <span className="font-medium text-gray-600">Epla Curated</span>
                              )}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                            Individual Price: ₦{item.price.toLocaleString()}
                            </p>
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm">
                            <p className="text-gray-500 font-medium">Quantity: {item.quantity}</p>
                        </div>
                        </div>
                    </li>
                    );
                })}
                </ul>
            </div>
            </div>
        </div>
        <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                 <dl className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                        <dt>Subtotal</dt>
                        <dd className="font-medium text-gray-900">₦{order.total.toLocaleString()}</dd>
                    </div>
                     <div className="flex justify-between">
                        <dt>Logistics Fee</dt>
                        <dd className="font-medium text-gray-900">₦1,500</dd>
                    </div>
                    <div className="flex justify-between text-base font-bold text-gray-900 border-t pt-2 mt-2">
                        <dt>Total</dt>
                        <dd>₦{(order.total + 1500).toLocaleString()}</dd>
                    </div>
                </dl>
            </div>
             <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Confirmation</h3>
                <div className="flex flex-col items-center text-center p-4 border-2 border-dashed rounded-lg bg-gray-50">
                    {order.status !== 'Delivered' ? (
                        <>
                            <CameraIcon className="h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-500">Photo proof will appear here once your order is delivered.</p>
                        </>
                    ) : (
                       <div>
                         <img src="https://i.imgur.com/k2Cukp6.jpeg" alt="Delivery proof" className="rounded-lg shadow-sm" />
                         <p className="mt-2 text-xs text-gray-500">Delivered on {new Date(order.date).toLocaleDateString()}</p>
                       </div>
                    )}
                </div>
            </div>
        </div>

      </main>
    </div>
  );
};

export default OrderDetailsPage;
