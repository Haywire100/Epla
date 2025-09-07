import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Conversation, Message, AuthState } from '../types';
import { CONVERSATIONS } from '../constants';

interface MessageContextType {
  conversations: Conversation[];
  getConversationById: (id: string) => Conversation | undefined;
  getConversationsForUser: (userId: number, userType: 'buyer' | 'vendor') => Conversation[];
  sendMessage: (conversationId: string, text: string, sender: { id: number, type: 'buyer' | 'vendor' }) => void;
  markAsRead: (conversationId: string, userType: 'buyer' | 'vendor') => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS);

  const getConversationById = (id: string) => {
    return conversations.find(c => c.id === id);
  };
  
  const getConversationsForUser = (userId: number, userType: 'buyer' | 'vendor'): Conversation[] => {
    if (userType === 'buyer') {
      return conversations.filter(c => c.buyerId === userId);
    }
    return conversations.filter(c => c.vendorId === userId);
  };
  
  const markAsRead = (conversationId: string, userType: 'buyer' | 'vendor') => {
    setConversations(prev =>
      prev.map(conv => {
        if (conv.id === conversationId) {
          if (userType === 'buyer') {
            return { ...conv, unreadByBuyer: 0 };
          } else {
            return { ...conv, unreadByVendor: 0 };
          }
        }
        return conv;
      })
    );
  };
  
  const sendMessage = (conversationId: string, text: string, sender: { id: number, type: 'buyer' | 'vendor' }) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: sender.id,
      senderType: sender.type,
      text,
      timestamp: new Date().toISOString(),
    };

    setConversations(prev =>
      prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessageTimestamp: newMessage.timestamp,
            unreadByBuyer: sender.type === 'vendor' ? conv.unreadByBuyer + 1 : conv.unreadByBuyer,
            unreadByVendor: sender.type === 'buyer' ? conv.unreadByVendor + 1 : conv.unreadByVendor,
          };
        }
        return conv;
      })
    );
  };

  return (
    <MessageContext.Provider value={{ conversations, getConversationById, getConversationsForUser, sendMessage, markAsRead }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};