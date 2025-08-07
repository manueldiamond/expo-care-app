// Backend API Response Types
export interface ChatUser {
  id: number;
  fullname: string;
  photoUrl?: string | null;
  email: string;
}

export interface ChatMessage {
  id: number;
  chatId: number;
  senderId: number;
  content: string;
  createdAt: string; // ISO date string
  read: boolean;
  sender: ChatUser;
}

export interface Chat {
  id: number;
  userAId: number;
  userBId: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  userA: ChatUser;
  userB: ChatUser;
  messages: ChatMessage[];
}

// Frontend App Types (for compatibility with existing code)
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

// Socket Event Types
export interface SocketMessageData {
  chatId: number;
  senderId: number;
  content: string;
}

export interface SocketJoinChatData {
  chatId: number;
}

export interface SocketLeaveChatData {
  chatId: number;
}

export interface SocketMessageSaveError {
  error: string;
} 