import { socket } from '@/lib/socket';
import { API_ENDPOINTS } from '@/utils/api';
import api from '@/utils/axios';
import { Chat, ChatMessage, ChatUser, SocketJoinChatData, SocketLeaveChatData, SocketMessageData, SocketMessageSaveError } from './types';

class ChatService {
  // Get all chats for the current user
  async getConversations(): Promise<Chat[]> {
    try {
      const response = await api.get(API_ENDPOINTS.GET_CHATS);
      return response.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  }

  // Get messages for a specific conversation
  async getMessages(chatId: string): Promise<ChatMessage[]> {
    try {
      const response = await api.get(`${API_ENDPOINTS.GET_CHAT_MESSAGES}/${chatId}/messages`);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

  // Create new chat or get existing chat between two users
  async createOrGetChat(otherUserId: string): Promise<Chat> {
    try {
      const response = await api.post(API_ENDPOINTS.CREATE_CHAT, {
        otherUserId: parseInt(otherUserId)
      });
      return response.data;
    } catch (error) {
      console.error('Error creating/getting chat:', error);
      throw error;
    }
  }

  // Join a chat room via socket
  joinChat(chatId: string) {
    const data: SocketJoinChatData = { chatId: parseInt(chatId) };
    socket.emit('join_chat', data);
  }

  // Leave a chat room via socket
  leaveChat(chatId: string) {
    const data: SocketLeaveChatData = { chatId: parseInt(chatId) };
    socket.emit('leave_chat', data);
  }

  // Send a message via socket (immediate delivery)
  sendMessage(chatId: string, message: Omit<ChatMessage, 'id' | 'createdAt' | 'read' | 'sender'>) {
    const data: SocketMessageData = {
      chatId: parseInt(chatId),
      senderId: message.senderId,
      content: message.content
    };
    socket.emit('send_message', data);
  }

  // Listen for incoming messages
  onReceiveMessage(callback: (message: ChatMessage) => void) {
    socket.on('receive_message', callback);
  }

  // Listen for message save errors
  onMessageSaveError(callback: (error: SocketMessageSaveError) => void) {
    socket.on('message_save_error', callback);
  }

  // Remove socket listeners
  removeListeners() {
    socket.off('receive_message');
    socket.off('message_save_error');
  }

  // Get user by ID
  async getUser(userId: string): Promise<ChatUser | null> {
    try {
      const response = await api.get(`${API_ENDPOINTS.GET_USER}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  // Search conversations
  async searchConversations(query: string): Promise<Chat[]> {
    try {
      const response = await api.get(`${API_ENDPOINTS.SEARCH_CHATS}?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching conversations:', error);
      throw error;
    }
  }

  // Mark conversation as read
  async markAsRead(chatId: string): Promise<void> {
    try {
      await api.post(`${API_ENDPOINTS.MARK_CHAT_READ}/${chatId}`);
    } catch (error) {
      console.error('Error marking chat as read:', error);
      throw error;
    }
  }

  // Get unread count
  async getUnreadCount(): Promise<number> {
    try {
      const response = await api.get(API_ENDPOINTS.GET_UNREAD_COUNT);
      return response.data.count;
    } catch (error) {
      console.error('Error fetching unread count:', error);
      return 0;
    }
  }

  // Pin/unpin conversation
  async togglePin(chatId: string): Promise<void> {
    try {
      await api.post(`${API_ENDPOINTS.TOGGLE_CHAT_PIN}/${chatId}`);
    } catch (error) {
      console.error('Error toggling chat pin:', error);
      throw error;
    }
  }

  // Archive conversation
  async archiveConversation(chatId: string): Promise<void> {
    try {
      await api.post(`${API_ENDPOINTS.ARCHIVE_CHAT}/${chatId}`);
    } catch (error) {
      console.error('Error archiving chat:', error);
      throw error;
    }
  }

  // Delete conversation
  async deleteConversation(chatId: string): Promise<void> {
    try {
      await api.delete(`${API_ENDPOINTS.DELETE_CHAT}/${chatId}`);
    } catch (error) {
      console.error('Error deleting chat:', error);
      throw error;
    }
  }
}

export const chatService = new ChatService();
export default chatService; 