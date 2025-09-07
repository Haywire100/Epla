
import React from 'react';
import { PageState, OrderStatus } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { useOrders } from '../context/OrderContext';

interface OrderPlacedProps {
  orderId: string;
  onNavigate: (state: PageState) => void;
}

const OrderPlaced: React.FC<OrderPlacedProps> = ({ orderId, onNavigate }) => {
  const { orders } = useOrders();
  const order = orders.find(o => o.id === orderId);

  const statusSteps: OrderStatus[] = ['Placed', 'Processing', 'Out for Delivery', 'Delivered'];
  const currentStatusIndex = order ? statusSteps.indexOf(order.status) : 0;
  const progressPercentage = order ? ((currentStatusIndex + 1) / statusSteps.length) * 100 : 25;

  return (
    <div className="bg-gray-50 flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center bg-white p-10 rounded-xl shadow-lg">
        <div>
          <CheckCircleIcon className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Thank you for your order!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your order <span className="font-medium text-gray-900">#{orderId}</span> has been placed successfully.
          </p>
        </div>
        
        <div className="pt-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Track your delivery</h3>
            <div className="mt-4">
                <div className="overflow-hidden rounded-full bg-gray-200">
                    <div className="h-2 rounded-full bg-primary transition-all duration-500" style={{width: `${progressPercentage}%`}}></div>
                </div>
                <ol className="mt-4 grid grid-cols-4 text-xs sm:text-sm font-medium text-gray-500">
                   {statusSteps.map((step, index) => (
                      <li key={step} className={`text-center ${index <= currentStatusIndex ? 'text-primary' : ''}`}>
                          <span>{step}</span>
                      </li>
                   ))}
                </ol>
            </div>
        </div>

        <div>
          <button
            onClick={() => onNavigate({ name: 'buyerDashboard' })}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Go to My Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
