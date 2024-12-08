import React, { useState } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { Chat, Message } from '../types';
import { format } from 'date-fns';

interface ChatWindowProps {
  chat?: Chat;
}

const MessageBubble: React.FC<{ message: Message; isOwn: boolean }> = ({
  message,
  isOwn,
}) => (
  <div
    className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
  >
    <div
      className={`max-w-[70%] rounded-lg px-4 py-2 ${
        isOwn ? 'bg-green-100' : 'bg-white'
      }`}
    >
      <p className="text-gray-800">{message.content}</p>
      <div className="flex justify-end items-center mt-1">
        <span className="text-xs text-gray-500">
          {format(message.timestamp, 'HH:mm')}
        </span>
      </div>
    </div>
  </div>
);

export const ChatWindow: React.FC<ChatWindowProps> = ({ chat }) => {
  const [message, setMessage] = useState('');

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-gray-50 border-b flex items-center">
        <img
          src={chat.avatar}
          alt={chat.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-4">
          <h2 className="font-semibold">{chat.name}</h2>
          {chat.online && (
            <span className="text-sm text-green-500">online</span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {chat.lastMessage && (
          <MessageBubble
            message={chat.lastMessage}
            isOwn={chat.lastMessage.sender === 'me'}
          />
        )}
      </div>

      <div className="p-4 bg-gray-50 border-t">
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Paperclip className="w-5 h-5 text-gray-500" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Smile className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-2 bg-green-500 hover:bg-green-600 rounded-full">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};