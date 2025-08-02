export interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  receiverId: string;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'image' | 'file' | 'voice';
  mediaUrl?: string;
  fileName?: string;
  fileSize?: number;
  duration?: number; // for voice messages
}

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  role: 'patient' | 'caregiver' | 'doctor' | 'family';
  isOnline: boolean;
  lastSeen?: Date;
  status?: 'available' | 'busy' | 'away' | 'offline';
}

export interface ChatConversation {
  id: string;
  participants: ChatUser[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatSearchResult {
  conversations: ChatConversation[];
  users: ChatUser[];
}

export interface ChatNotification {
  id: string;
  conversationId: string;
  message: ChatMessage;
  isRead: boolean;
  timestamp: Date;
}

export interface ChatSettings {
  notifications: boolean;
  sound: boolean;
  vibration: boolean;
  autoReply: boolean;
  autoReplyMessage?: string;
  typingIndicator: boolean;
  readReceipts: boolean;
}

export interface ChatAttachment {
  id: string;
  type: 'image' | 'file' | 'voice';
  url: string;
  fileName?: string;
  fileSize?: number;
  thumbnail?: string;
  duration?: number;
}

export interface ChatReaction {
  id: string;
  messageId: string;
  userId: string;
  emoji: string;
  timestamp: Date;
}

export interface ChatTyping {
  userId: string;
  conversationId: string;
  isTyping: boolean;
  timestamp: Date;
} 