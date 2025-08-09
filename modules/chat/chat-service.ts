import { Chat, ChatMessage, ChatUser } from './types';
import { mockConversations, mockMessages, mockUsers } from './data';

// Local state management for chat functionality
class LocalChatService {
  private conversations: any[] = [...mockConversations];
  private messages: any[] = [...mockMessages];
  private users: any[] = [...mockUsers];
  private messageListeners: ((message: any) => void)[] = [];
  private currentUserId = 'current-user';

  // Get all chats for the current user
  async getConversations(): Promise<any[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.conversations.filter(conv => !conv.isArchived);
  }

  // Get messages for a specific conversation
  async getMessages(chatId: string): Promise<any[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.messages.filter(msg => 
      (msg.senderId === chatId && msg.receiverId === this.currentUserId) ||
      (msg.senderId === this.currentUserId && msg.receiverId === chatId)
    );
  }

  // Create new chat or get existing chat between two users
  async createOrGetChat(otherUserId: string): Promise<any> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Check if chat already exists
    const existingChat = this.conversations.find(conv => 
      conv.participants.some((p: any) => p.id === otherUserId)
    );
    
    if (existingChat) {
      return existingChat;
    }
    
    // Create new chat
    const otherUser = this.users.find(u => u.id === otherUserId);
    if (!otherUser) {
      throw new Error('User not found');
    }
    
    const newChat = {
      id: Date.now().toString(),
      participants: [otherUser, { id: this.currentUserId, name: 'You', role: 'patient' }],
      lastMessage: undefined,
      unreadCount: 0,
      isPinned: false,
      isArchived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.conversations.push(newChat);
    return newChat;
  }

  // Join a chat room (no-op for local state)
  joinChat(chatId: string) {
    console.log(`Joined chat: ${chatId}`);
  }

  // Leave a chat room (no-op for local state)
  leaveChat(chatId: string) {
    console.log(`Left chat: ${chatId}`);
  }

  // Send a message (local state update)
  sendMessage(chatId: string, messageData: { content: string; senderId?: string }) {
    const newMessage: any = {
      id: Date.now().toString(),
      text: messageData.content,
      senderId: messageData.senderId || this.currentUserId,
      receiverId: chatId,
      timestamp: new Date(),
      isRead: false,
      type: 'text',
    };
    
    this.messages.push(newMessage);
    
    // Update conversation's last message
    const conversation = this.conversations.find(conv => 
      conv.participants.some((p: any) => p.id === chatId)
    );
    if (conversation) {
      conversation.lastMessage = newMessage;
      conversation.updatedAt = new Date();
    }
    
    // Notify listeners
    this.messageListeners.forEach(listener => listener(newMessage));
    
    // Simulate receiving a response after a delay
    setTimeout(() => {
      const responseMessage: any = {
        id: (Date.now() + 1).toString(),
        text: this.generateAutoResponse(messageData.content),
        senderId: chatId,
        receiverId: this.currentUserId,
        timestamp: new Date(),
        isRead: false,
        type: 'text',
      };
      
      this.messages.push(responseMessage);
      if (conversation) {
        conversation.lastMessage = responseMessage;
        conversation.unreadCount += 1;
        conversation.updatedAt = new Date();
      }
      
      this.messageListeners.forEach(listener => listener(responseMessage));
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  }

  // Generate auto response for demo purposes
  private generateAutoResponse(userMessage: string): string {
    const responses = [
      "Thank you for your message. I'll get back to you soon.",
      "I understand your concern. Let me check on that for you.",
      "That's great to hear! Keep up the good work.",
      "Please make sure to follow the prescribed treatment plan.",
      "I'll schedule a follow-up appointment for you.",
      "Your health and well-being are our priority.",
      "Feel free to reach out if you have any questions.",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Listen for incoming messages
  onReceiveMessage(callback: (message: any) => void) {
    this.messageListeners.push(callback);
  }

  // Listen for message save errors (no-op for local state)
  onMessageSaveError(callback: (error: any) => void) {
    // No errors in local state
  }

  // Remove socket listeners
  removeListeners() {
    this.messageListeners = [];
  }

  // Get user by ID
  async getUser(userId: string): Promise<any | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.users.find(u => u.id === userId) || null;
  }

  // Search conversations
  async searchConversations(query: string): Promise<any[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const lowerQuery = query.toLowerCase();
    return this.conversations.filter(conv => 
      conv.participants.some((p: any) => 
        p.name?.toLowerCase().includes(lowerQuery)
      ) || 
      conv.lastMessage?.text?.toLowerCase().includes(lowerQuery)
    );
  }

  // Mark conversation as read
  async markAsRead(chatId: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const conversation = this.conversations.find(conv => 
      conv.id === chatId || conv.participants.some((p: any) => p.id === chatId)
    );
    if (conversation) {
      conversation.unreadCount = 0;
    }
    
    // Mark messages as read
    this.messages.forEach(msg => {
      if ((msg.senderId === chatId && msg.receiverId === this.currentUserId)) {
        msg.isRead = true;
      }
    });
  }

  // Get unread count
  async getUnreadCount(): Promise<number> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return this.conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  }

  // Pin/unpin conversation
  async togglePin(chatId: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const conversation = this.conversations.find(conv => conv.id === chatId);
    if (conversation) {
      conversation.isPinned = !conversation.isPinned;
    }
  }

  // Archive conversation
  async archiveConversation(chatId: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const conversation = this.conversations.find(conv => conv.id === chatId);
    if (conversation) {
      conversation.isArchived = true;
    }
  }

  // Delete conversation
  async deleteConversation(chatId: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    this.conversations = this.conversations.filter(conv => conv.id !== chatId);
    this.messages = this.messages.filter(msg => 
      !(msg.senderId === chatId || msg.receiverId === chatId)
    );
  }
}

export const chatService = new LocalChatService();
export default chatService; 