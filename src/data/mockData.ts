import { Chat, Message } from '../types';

export const mockChats: Chat[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    unreadCount: 2,
    online: true,
    lastMessage: {
      id: 'm1',
      content: 'Hey, how are you?',
      sender: 'John Doe',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      status: 'read'
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    unreadCount: 0,
    online: false,
    typing: true,
    lastMessage: {
      id: 'm2',
      content: 'See you tomorrow!',
      sender: 'me',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: 'delivered'
    }
  }
];