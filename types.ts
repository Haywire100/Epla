export interface Vendor {
  id: number;
  name: string;
  location: string;
  bio: string;
  rating: number;
  impactStory: string;
}

export interface Buyer {
  id: number;
  name: string;
  location: string;
}

export interface Product {
  id: number;
  name: string;
  vendorId: number;
  price: number;
  imageUrl: string;
  unit: string;
  stock: number;
  category: string;
  origin?: string;
  description?: string;
}

// FIX: Updated NewProductData to include 'category', which is required when creating a new product.
export type NewProductData = Omit<Product, 'id' | 'vendorId'>;

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus = 'Placed' | 'Processing' | 'Out for Delivery' | 'Delivered';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  buyerInfo: {
    name: string;
    location: string;
  };
}

export interface Message {
  id: string;
  senderId: number;
  senderType: 'buyer' | 'vendor';
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  buyerId: number;
  vendorId: number;
  messages: Message[];
  lastMessageTimestamp: string;
  unreadByBuyer: number;
  unreadByVendor: number;
}

export interface Review {
  id: number;
  vendorId: number;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}


export type AuthState = { type: 'buyer'; id: number } | { type: 'vendor'; id: number } | { type: 'agent' } | null;

export type PageState =
  | { name: 'home' }
  | { name: 'signIn' }
  | { name: 'buyerSignUp' }
  | { name: 'vendorSignUp' }
  | { name: 'buyerDashboard' }
  | { name: 'vendorProfile'; vendorId: number }
  | { name: 'orderPlaced'; orderId: string }
  | { name: 'vendorDashboard'; vendorId: number }
  | { name: 'orderDetails'; orderId: string }
  | { name: 'agentPortal' }
  | { name: 'category'; categoryName: string }
  | { name: 'messaging'; conversationId: string };