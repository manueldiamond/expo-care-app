import { placeholderProfileImage } from '../profile/data';
import { ChatConversation, ChatMessage, ChatUser } from './types';

// Mock users
export const mockUsers: ChatUser[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    avatar: placeholderProfileImage,
    role: 'doctor',
    isOnline: true,
    status: 'available',
    lastSeen: new Date(),
  },
  {
    id: '2',
    name: 'Nurse Maria Garcia',
    avatar: placeholderProfileImage,
    role: 'caregiver',
    isOnline: true,
    status: 'available',
    lastSeen: new Date(),
  },
  {
    id: '3',
    name: 'Patient John Smith',
    avatar: placeholderProfileImage,
    role: 'patient',
    isOnline: false,
    status: 'offline',
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '4',
    name: 'Family Member Lisa',
    avatar: placeholderProfileImage,
    role: 'family',
    isOnline: true,
    status: 'busy',
    lastSeen: new Date(),
  },
  {
    id: '5',
    name: 'Dr. Michael Chen',
    avatar: placeholderProfileImage,
    role: 'doctor',
    isOnline: false,
    status: 'away',
    lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
];

// Mock messages
export const mockMessages: ChatMessage[] = [
  {
    id: '1',
    text: 'Hello! How are you feeling today?',
    senderId: '1',
    receiverId: 'current-user',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    isRead: true,
    type: 'text',
  },
  {
    id: '2',
    text: 'I\'m feeling much better, thank you for asking.',
    senderId: 'current-user',
    receiverId: '1',
    timestamp: new Date(Date.now() - 4 * 60 * 1000), // 4 minutes ago
    isRead: true,
    type: 'text',
  },
  {
    id: '3',
    text: 'That\'s great to hear! Any concerns about your medication?',
    senderId: '1',
    receiverId: 'current-user',
    timestamp: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
    isRead: false,
    type: 'text',
  },
  {
    id: '4',
    text: 'Your appointment is scheduled for tomorrow at 2 PM.',
    senderId: '2',
    receiverId: 'current-user',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: true,
    type: 'text',
  },
  {
    id: '5',
    text: 'Please bring your medical records.',
    senderId: '2',
    receiverId: 'current-user',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: true,
    type: 'text',
  },
  {
    id: '6',
    text: 'How is the treatment going?',
    senderId: '3',
    receiverId: 'current-user',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    type: 'text',
  },
  {
    id: '7',
    text: 'Everything is going well, thank you!',
    senderId: 'current-user',
    receiverId: '3',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    type: 'text',
  },
  {
    id: '8',
    text: 'Don\'t forget to take your medication at 8 PM.',
    senderId: '4',
    receiverId: 'current-user',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    isRead: false,
    type: 'text',
  },
  {
    id: '9',
    text: 'I\'ll remind you about the follow-up appointment.',
    senderId: '5',
    receiverId: 'current-user',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    isRead: true,
    type: 'text',
  },
];

// Mock conversations
export const mockConversations: ChatConversation[] = [
  {
    id: '1',
    participants: [mockUsers[0], { id: 'current-user', name: 'You', role: 'patient' } as ChatUser],
    lastMessage: mockMessages[2],
    unreadCount: 1,
    isPinned: true,
    isArchived: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    updatedAt: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
  },
  {
    id: '2',
    participants: [mockUsers[1], { id: 'current-user', name: 'You', role: 'patient' } as ChatUser],
    lastMessage: mockMessages[4],
    unreadCount: 0,
    isPinned: false,
    isArchived: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '3',
    participants: [mockUsers[2], { id: 'current-user', name: 'You', role: 'patient' } as ChatUser],
    lastMessage: mockMessages[6],
    unreadCount: 0,
    isPinned: false,
    isArchived: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: '4',
    participants: [mockUsers[3], { id: 'current-user', name: 'You', role: 'patient' } as ChatUser],
    lastMessage: mockMessages[7],
    unreadCount: 1,
    isPinned: false,
    isArchived: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
  },
  {
    id: '5',
    participants: [mockUsers[4], { id: 'current-user', name: 'You', role: 'patient' } as ChatUser],
    lastMessage: mockMessages[8],
    unreadCount: 0,
    isPinned: false,
    isArchived: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
  },
];

// Chat settings
export const defaultChatSettings = {
  notifications: true,
  sound: true,
  vibration: true,
  autoReply: false,
  autoReplyMessage: 'I\'m currently unavailable. I\'ll get back to you soon.',
  typingIndicator: true,
  readReceipts: true,
}; 