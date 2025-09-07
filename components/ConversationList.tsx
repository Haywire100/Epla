import React from 'react';
import { PageState, AuthState } from '../types';
import { useMessages } from '../context/MessageContext';
import { VENDORS, BUYERS } from '../constants';

interface ConversationListProps {
  onNavigate: (page: PageState) => void;
  authState: AuthState;
}

const ConversationList: React.FC<ConversationListProps> = ({ onNavigate, authState }) => {
  const { getConversationsForUser } = useMessages();

  if (!authState) {
    return <p>Please sign in to view your messages.</p>;
  }

  // FIX: Agents do not have conversations. Return early to prevent type errors.
  if (authState.type === 'agent') {
    return (
        <div className="p-12 text-center">
            <h3 className="text-xl font-medium text-gray-900">Feature Not Available</h3>
            <p className="mt-2 text-gray-500">Conversations are not available for this user type.</p>
        </div>
    );
  }

  const { id: userId, type: userType } = authState;
  const conversations = getConversationsForUser(userId, userType).sort((a,b) => new Date(b.lastMessageTimestamp).getTime() - new Date(a.lastMessageTimestamp).getTime());

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-900">Your Conversations</h2>
      </div>
      {conversations.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {conversations.map(conv => {
            const lastMessage = conv.messages[conv.messages.length - 1];
            const otherParty = userType === 'buyer'
              ? VENDORS.find(v => v.id === conv.vendorId)
              : BUYERS.find(b => b.id === conv.buyerId);
            const unreadCount = userType === 'buyer' ? conv.unreadByBuyer : conv.unreadByVendor;

            return (
              <li 
                key={conv.id} 
                onClick={() => onNavigate({ name: 'messaging', conversationId: conv.id })}
                className="p-4 hover:bg-gray-50 cursor-pointer flex items-start space-x-4"
              >
                <div className={`flex-shrink-0 h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl`}>
                    {otherParty?.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                        <p className={`text-sm font-semibold truncate ${unreadCount > 0 ? 'text-gray-900' : 'text-gray-700'}`}>{otherParty?.name}</p>
                        <p className="text-xs text-gray-400">{new Date(lastMessage.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <p className={`text-sm text-gray-500 truncate ${unreadCount > 0 ? 'font-bold' : ''}`}>
                            {lastMessage.text}
                        </p>
                        {unreadCount > 0 && (
                             <span className="inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-secondary rounded-full">
                                {unreadCount}
                             </span>
                        )}
                    </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="p-12 text-center">
            <h3 className="text-xl font-medium text-gray-900">No Messages Yet</h3>
            <p className="mt-2 text-gray-500">You have no conversations. Start by ordering a product!</p>
        </div>
      )}
    </div>
  );
};

export default ConversationList;