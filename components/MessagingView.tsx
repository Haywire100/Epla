import React, { useState, useEffect, useRef } from 'react';
import { PageState, AuthState, Conversation } from '../types';
import { useMessages } from '../context/MessageContext';
import { VENDORS, BUYERS } from '../constants';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';

interface MessagingViewProps {
  conversationId: string;
  authState: AuthState;
  onNavigate: (page: PageState) => void;
}

const MessagingView: React.FC<MessagingViewProps> = ({ conversationId, authState, onNavigate }) => {
  const { getConversationById, sendMessage, markAsRead } = useMessages();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // This is a workaround because the context state might not update immediately for the component to re-render
  // In a real app with a proper backend, you would fetch the latest conversation state.
  const conversation = getConversationById(conversationId) as Conversation;

  useEffect(() => {
    // FIX: Add a check to ensure authState is not an agent before marking as read.
    if (authState && authState.type !== 'agent') {
        markAsRead(conversationId, authState.type);
    }
  }, [conversationId, authState, markAsRead]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  if (!authState) {
    return <div className="p-8 text-center">Please sign in to view messages.</div>;
  }

  // FIX: Agents should not access messaging view. Return early to fix type errors.
  if (authState.type === 'agent') {
    return <div className="p-8 text-center">Messaging is not available for this user type.</div>;
  }

  if (!conversation) {
    return <div className="p-8 text-center">Conversation not found.</div>;
  }
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // FIX: With the guard clause above, authState is guaranteed to be buyer or vendor, so we can safely access id and type.
      sendMessage(conversationId, newMessage, { id: authState.id, type: authState.type });
      setNewMessage('');
    }
  };

  const otherParty = authState.type === 'buyer'
    ? VENDORS.find(v => v.id === conversation.vendorId)
    : BUYERS.find(b => b.id === conversation.buyerId);

  // FIX: With the guard clause above, this is now type-safe.
  const backToDashboard: PageState = authState.type === 'buyer' 
    ? { name: 'buyerDashboard' } 
    : { name: 'vendorDashboard', vendorId: authState.id };

  return (
    <div className="flex-grow bg-gray-50">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col" style={{height: 'calc(100vh - 12rem)'}}>
          {/* Header */}
          <header className="flex items-center p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
             <button 
                onClick={() => onNavigate(backToDashboard)} 
                className="p-2 rounded-full hover:bg-gray-200 mr-2"
            >
                <ArrowLeftIcon />
            </button>
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                {otherParty?.name.charAt(0)}
            </div>
            <div className="ml-3">
                <h2 className="text-lg font-bold text-gray-900">{otherParty?.name}</h2>
                <p className="text-xs text-gray-500">Online</p>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {conversation.messages.map(msg => {
              // FIX: With the guard clause, authState is guaranteed to have id and a valid type.
              const isSender = msg.senderType === authState.type && msg.senderId === authState.id;
              return (
                <div key={msg.id} className={`flex items-end gap-2 ${isSender ? 'justify-end' : 'justify-start'}`}>
                  {!isSender && <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-sm">{otherParty?.name.charAt(0)}</div>}
                  <div className={`px-4 py-2 rounded-2xl max-w-sm md:max-w-md ${isSender ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                    <p className="text-sm">{msg.text}</p>
                     <p className={`text-xs mt-1 ${isSender ? 'text-blue-100' : 'text-gray-500'} text-right`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
              );
            })}
             <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <footer className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 block w-full rounded-full py-2.5 pl-4 pr-10 border-gray-300 focus:ring-primary focus:border-primary"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                aria-label="Send message"
              >
                <PaperAirplaneIcon />
              </button>
            </form>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default MessagingView;