
import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import ConfirmationModal from './ConfirmationModal';

interface VendorOrderCardProps {
  order: Order;
  vendorId: number;
  onApprove?: (order: Order) => void;
}

const VendorOrderCard: React.FC<VendorOrderCardProps> = ({ order, vendorId, onApprove }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const vendorItems = order.items.filter(item => item.vendorId === vendorId);
  const vendorTotal = vendorItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const statusSteps: OrderStatus[] = ['Placed', 'Processing', 'Out for Delivery', 'Delivered'];
  const currentStatusIndex = statusSteps.indexOf(order.status);
  const progressPercentage = ((currentStatusIndex + 1) / statusSteps.length) * 100;
  
  const handleConfirm = () => {
    if (onApprove) {
      onApprove(order);
    }
    setIsModalOpen(false);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-gray-50 p-4 sm:p-6 border-b border-gray-200">
        <div className="sm:flex sm:justify-between sm:items-start">
          <div>
            <h3 className="text-lg font-bold text-primary">Order #{order.id}</h3>
            <p className="text-sm text-gray-500 mt-1">
              For: <span className="font-medium text-gray-700">{order.buyerInfo.name}</span> ({order.buyerInfo.location})
            </p>
             <p className="text-sm text-gray-500">
              Placed on: {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <p className="text-sm text-gray-600">Your Portion: <span className="font-bold text-lg text-gray-900">₦{vendorTotal.toLocaleString()}</span></p>
             <p className="text-sm font-medium text-secondary">{order.status}</p>
          </div>
        </div>
      </div>
       <div className="p-4 sm:p-6">
         <h4 className="text-md font-semibold text-gray-800 mb-4">Items to fulfill:</h4>
         <ul role="list" className="divide-y divide-gray-200">
          {vendorItems.map(item => (
            <li key={item.id} className="py-3 flex items-center">
              <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-center object-cover" />
              </div>
              <div className="ml-4 flex-1 flex flex-col">
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium text-gray-900">₦{(item.price * item.quantity).toLocaleString()}</p>
            </li>
          ))}
         </ul>
       </div>

       {order.status === 'Placed' && onApprove && (
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
          >
            Approve & Send
          </button>
        </div>
       )}
       {order.status !== 'Placed' && (
         <div className="p-4 sm:p-6 border-t border-gray-200">
            <div className="overflow-hidden rounded-full bg-gray-200">
                <div className="h-2 rounded-full bg-primary transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <ol className="mt-4 grid grid-cols-4 text-xs font-medium text-gray-500">
                {statusSteps.map((step, index) => (
                <li key={step} className={`text-center ${index <= currentStatusIndex ? 'text-primary font-semibold' : ''}`}>
                    <span>{step}</span>
                </li>
                ))}
            </ol>
         </div>
       )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title="Confirm Order Fulfillment"
        message={`Are you sure you want to approve and send order #${order.id}? This will notify the customer and update the order status.`}
      />
    </div>
  );
};

export default VendorOrderCard;