import { mockConversations, mockMessages, mockUsers } from './data';
import { ChatConversation, ChatMessage, ChatUser } from './types';

class ChatService {
  // Get all conversations for the current user
  async getConversations(): Promise<ChatConversation[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockConversations);
      }, 500);
    });
  }

  // Get messages for a specific conversation
  async getMessages(conversationId: string): Promise<ChatMessage[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const messages = mockMessages.filter(msg => 
          msg.senderId === conversationId || msg.receiverId === conversationId
        );
        resolve(messages);
      }, 300);
    });
  }

  // Send a new message
  async sendMessage(message: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<ChatMessage> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMessage: ChatMessage = {
          ...message,
          id: Date.now().toString(),
          timestamp: new Date(),
        };
        resolve(newMessage);
      }, 200);
    });
  }

  // Get user by ID
  async getUser(userId: string): Promise<ChatUser | null> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.id === userId);
        resolve(user || null);
      }, 100);
    });
  }

  // Search conversations
  async searchConversations(query: string): Promise<ChatConversation[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = mockConversations.filter(conv => {
          const otherUser = conv.participants.find(p => p.id !== 'current-user');
          return otherUser?.name.toLowerCase().includes(query.toLowerCase());
        });
        resolve(filtered);
      }, 200);
    });
  }

  // Mark conversation as read
  async markAsRead(conversationId: string): Promise<void> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Marked conversation ${conversationId} as read`);
        resolve();
      }, 100);
    });
  }

  // Get unread count
  async getUnreadCount(): Promise<number> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const total = mockConversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
        resolve(total);
      }, 100);
    });
  }

  // Pin/unpin conversation
  async togglePin(conversationId: string): Promise<void> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Toggled pin for conversation ${conversationId}`);
        resolve();
      }, 100);
    });
  }

  // Archive conversation
  async archiveConversation(conversationId: string): Promise<void> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Archived conversation ${conversationId}`);
        resolve();
      }, 100);
    });
  }

  // Delete conversation
  async deleteConversation(conversationId: string): Promise<void> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Deleted conversation ${conversationId}`);
        resolve();
      }, 100);
    });
  }
}

export const chatService = new ChatService();
export default chatService; 