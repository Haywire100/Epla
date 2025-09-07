
import React from 'react';
import { Order, OrderStatus, PageState } from '../types';

interface OrderHistoryCardProps {
  order: Order;
  onNavigate: (page: PageState) => void;
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({ order, onNavigate }) => {

  const statusSteps: OrderStatus[] = ['Placed', 'Processing', 'Out for Delivery', 'Delivered'];
  const currentStatusIndex = statusSteps.indexOf(order.status);
  const progressPercentage = ((currentStatusIndex + 1) / statusSteps.length) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-gray-50 p-4 sm:p-6 border-b border-gray-200">
        <div className="sm:flex sm:justify-between sm:items-start">
          <div>
            <h3 className="text-lg font-bold text-primary">Order #{order.id}</h3>
            <p className="text-sm text-gray-500 mt-1">
              Placed on: {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
             <p className="mt-2 text-sm text-gray-600">
                {order.items.length} item(s) &bull; Total: <span className="font-bold text-gray-900">₦{order.total.toLocaleString()}</span>
            </p>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
                {order.status}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        {/* Tracking Progress Bar */}
        <div className="mb-6">
          <div className="overflow-hidden rounded-full bg-gray-200">
            <div className="h-2 rounded-full bg-primary transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <ol className="mt-4 grid grid-cols-4 text-xs sm:text-sm font-medium text-gray-500">
            {statusSteps.map((step, index) => (
              <li key={step} className={`text-center ${index <= currentStatusIndex ? 'text-primary font-semibold' : ''}`}>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="bg-gray-50 p-4 border-t border-gray-200 text-right">
        <button
          onClick={() => onNavigate({ name: 'orderDetails', orderId: order.id })}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default OrderHistoryCard;
