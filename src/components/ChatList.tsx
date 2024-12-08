import React from 'react';
import { format } from 'date-fns';
import { CheckCheck, Check } from 'lucide-react';
import { Chat } from '../types';

interface ChatListProps {
  chats: Chat[];
  onChatSelect: (chatId: string) => void;
  selectedChatId?: string;
}

const MessageStatus = ({ status }: { status: 'sent' | 'delivered' | 'read' }) => {
  if (status === 'read') return <CheckCheck className="w-4 h-4 text-blue-500" />;
  if (status === 'delivered') return <CheckCheck className="w-4 h-4 text-gray-500" />;
  return <Check className="w-4 h-4 text-gray-500" />;
};

export const ChatList: React.FC<ChatListProps> = ({ chats, onChatSelect, selectedChatId }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-gray-50 border-b">
        <input
          type="text"
          placeholder="Search or start new chat"
          className="w-full px-4 py-2 rounded-lg bg-white border focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 ${
              selectedChatId === chat.id ? 'bg-gray-100' : ''
            }`}
          >
            <div className="relative">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-12 h-12 rounded-full"
              />
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{chat.name}</h3>
                {chat.lastMessage && (
                  <span className="text-xs text-gray-500">
                    {format(chat.lastMessage.timestamp, 'HH:mm')}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 truncate max-w-[200px]">
                  {chat.typing ? (
                    <span className="text-green-500">typing...</span>
                  ) : (
                    chat.lastMessage?.content
                  )}
                </p>
                <div className="flex items-center">
                  {chat.lastMessage?.sender === 'me' && (
                    <MessageStatus status={chat.lastMessage.status} />
                  )}
                  {chat.unreadCount > 0 && (
                    <span className="ml-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};