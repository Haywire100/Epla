
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { CartItem, Order, OrderStatus } from '../types';

interface OrderContextType {
  orders: Order[];
  addOrder: (items: CartItem[], total: number, buyerInfo: { name: string; location: string; }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const STATUS_PROGRESSION: Record<OrderStatus, OrderStatus | null> = {
    'Placed': 'Processing',
    'Processing': 'Out for Delivery',
    'Out for Delivery': 'Delivered',
    'Delivered': null
};

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (items: CartItem[], total: number, buyerInfo: { name: string; location: string; }): Order => {
    const newOrder: Order = {
      id: `${Math.floor(Math.random() * 90000) + 10000}`,
      date: new Date().toISOString(),
      items: [...items],
      total,
      status: 'Placed',
      buyerInfo,
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(currentOrders =>
      currentOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(currentOrders => {
        return currentOrders.map(order => {
          // Only auto-progress if the order has been approved by the vendor
          if (order.status !== 'Placed' && order.status !== 'Delivered') {
            const nextStatus = STATUS_PROGRESSION[order.status];
            if (nextStatus) {
              if (Math.random() > 0.7) {
                return { ...order, status: nextStatus };
              }
            }
          }
          return order;
        });
      });
    }, 5000); // Check for updates every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};