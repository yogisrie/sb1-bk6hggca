import React, { useState } from 'react';
import { ChatList } from './components/ChatList';
import { ChatWindow } from './components/ChatWindow';
import { mockChats } from './data/mockData';

function App() {
  const [selectedChatId, setSelectedChatId] = useState<string>();
  const selectedChat = mockChats.find((chat) => chat.id === selectedChatId);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex w-full max-w-6xl mx-auto bg-white shadow-lg">
        <div className="w-1/3 border-r">
          <ChatList
            chats={mockChats}
            onChatSelect={setSelectedChatId}
            selectedChatId={selectedChatId}
          />
        </div>
        <div className="flex-1">
          <ChatWindow chat={selectedChat} />
        </div>
      </div>
    </div>
  );
}

export default App;