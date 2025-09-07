import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { OrderProvider, useOrders } from './context/OrderContext';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Footer from './components/Footer';
import BuyerSignUp from './components/BuyerSignUp';
import VendorSignUp from './components/VendorSignUp';
import BuyerDashboard from './components/BuyerDashboard';
import VendorProfile from './components/VendorProfile';
import OrderPlaced from './components/OrderPlaced';
import VendorDashboard from './components/VendorDashboard';
import OrderDetailsPage from './components/OrderDetailsPage';
import SignIn from './components/SignIn';
import { PRODUCTS, BUNDLES, BUYERS } from './constants';
import { PageState, AuthState } from './types';
import RecipeGenerator from './components/RecipeGenerator';
import AgentPortal from './components/AgentPortal';
import Categories from './components/Categories';
import CategoryPage from './components/CategoryPage';
import { MessageProvider } from './context/MessageContext';
import MessagingView from './components/MessagingView';

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [pageState, setPageState] = useState<PageState>({ name: 'home' });
  const [authState, setAuthState] = useState<AuthState>(null);
  const { cartItems, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();

  const navigate = (state: PageState) => {
    setPageState(state);
    window.scrollTo(0, 0);
  };
  
  const handleSignIn = (user: AuthState) => {
    setAuthState(user);
  };
  
  const handleSignOut = () => {
    setAuthState(null);
    navigate({ name: 'home' });
  };
  
  const handleCheckout = () => {
    if (!authState || authState.type !== 'buyer') {
      alert("Please sign in as a buyer to checkout.");
      navigate({ name: 'buyerSignUp' });
      return;
    }
    const buyerInfo = BUYERS.find(b => b.id === authState.id) || {
      name: 'Valued Customer',
      location: 'Unknown'
    };
    const newOrder = addOrder(cartItems, totalPrice, buyerInfo);
    clearCart();
    setIsCartOpen(false);
    navigate({ name: 'orderPlaced', orderId: newOrder.id });
  };

  const renderHomePage = () => (
    <>
      <main className="flex-grow">
        <Categories onNavigate={navigate} />
        <div id="products" className="py-12">
          <ProductGrid 
            products={PRODUCTS} 
            onNavigate={navigate} 
            title="Featured Staples"
            subtitle="Handpicked from our farms, delivered to your home."
          />
        </div>
        <div className="py-12 bg-white">
           <ProductGrid 
            products={BUNDLES} 
            onNavigate={navigate} 
            title="Value-Packed Bundles" 
            subtitle="Thoughtfully curated boxes, packed with value and authentic flavor." 
          />
        </div>
        <RecipeGenerator />
      </main>
      <Footer onNavigate={navigate} />
    </>
  );

  const renderPage = () => {
    switch (pageState.name) {
      case 'signIn':
        return <SignIn onNavigate={navigate} onSignIn={handleSignIn} />;
      case 'buyerSignUp':
        return <BuyerSignUp onNavigate={navigate} onSignIn={handleSignIn} />;
      case 'vendorSignUp':
        return <VendorSignUp onNavigate={navigate} onSignIn={handleSignIn} />;
      case 'buyerDashboard':
        return <BuyerDashboard onNavigate={navigate} authState={authState} />;
      case 'vendorDashboard':
        return <VendorDashboard vendorId={pageState.vendorId} onNavigate={navigate} authState={authState} />;
      case 'vendorProfile':
        return <VendorProfile vendorId={pageState.vendorId} onNavigate={navigate} />;
      case 'orderPlaced':
        return <OrderPlaced orderId={pageState.orderId} onNavigate={navigate} />;
      case 'orderDetails':
        return <OrderDetailsPage orderId={pageState.orderId} onNavigate={navigate} />;
      case 'agentPortal':
        return <AgentPortal onNavigate={navigate} />;
      case 'category':
        return <CategoryPage categoryName={pageState.categoryName} onNavigate={navigate} />;
      case 'messaging':
        return <MessagingView conversationId={pageState.conversationId} authState={authState} onNavigate={navigate} />;
      case 'home':
      default:
        return renderHomePage();
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-text-primary">
      <Header onCartClick={() => setIsCartOpen(true)} onNavigate={navigate} pageState={pageState} authState={authState} onSignOut={handleSignOut} />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckout={handleCheckout} onNavigate={navigate} />
      {renderPage()}
    </div>
  );
}


function App(): React.ReactNode {
  return (
    <CartProvider>
      <OrderProvider>
        <MessageProvider>
          <AppContent />
        </MessageProvider>
      </OrderProvider>
    </CartProvider>
  );
}

export default App;