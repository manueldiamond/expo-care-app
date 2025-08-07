import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import chatService from '../chat-service';
import { ChatMessage } from '../types';

const ChatDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [messageText, setMessageText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const currentUserId = 1; // This should come from user context/store

  useEffect(() => {
    if (id) {
      loadChatData();
      setupSocketListeners();
    }

    return () => {
      if (id) {
        chatService.leaveChat(id as string);
      }
      chatService.removeListeners();
    };
  }, [id]);

  const loadChatData = async () => {
    try {
      setLoading(true);
      
      // Load messages
      const messagesData = await chatService.getMessages(id as string);
      setMessages(messagesData);
      
      // Mark as read
      await chatService.markAsRead(id as string);
      
    } catch (error) {
      console.error('Error loading chat data:', error);
      Alert.alert('Error', 'Failed to load chat messages');
    } finally {
      setLoading(false);
    }
  };

  const setupSocketListeners = () => {
    // Join the chat room
    chatService.joinChat(id as string);

    // Listen for new messages
    chatService.onReceiveMessage((message) => {
      if (message.chatId === parseInt(id as string)) {
        setMessages(prev => [...prev, message]);
        // Mark as read if we're the receiver
        if (message.senderId !== currentUserId) {
          chatService.markAsRead(id as string);
        }
      }
    });

    // Listen for message save errors
    chatService.onMessageSaveError((error) => {
      console.error('Message save error:', error);
      Alert.alert('Error', 'Failed to send message. Please try again.');
    });
  };

  const sendMessage = async () => {
    if (!messageText.trim() || sending) return;

    const newMessage = {
      chatId: parseInt(id as string),
      senderId: currentUserId,
      content: messageText.trim(),
    };

    try {
      setSending(true);
      
      // Send via socket for immediate delivery
      chatService.sendMessage(id as string, newMessage);
      
      // Clear input
      setMessageText('');
      
      // Optimistically add to local state
      const optimisticMessage: ChatMessage = {
        ...newMessage,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        read: false,
        sender: {
          id: currentUserId,
          fullname: 'You', // This should come from user context
          email: '',
          photoUrl: null
        }
      };
      setMessages(prev => [...prev, optimisticMessage]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const renderMessage = ({ item: message }: { item: ChatMessage }) => {
    const isOwnMessage = message.senderId === currentUserId;

    return (
      <View style={tw`mb-4 ${isOwnMessage ? 'items-end' : 'items-start'}`}>
        <View style={tw`max-w-[70%] ${isOwnMessage ? 'bg-medical-primary' : 'bg-white'} rounded-2xl px-4 py-3 shadow-sm`}>
          <Text style={tw`${isOwnMessage ? 'text-white' : 'text-medical-text'} text-sm font-normal`}>
            {message.content}
          </Text>
          <Text style={tw`${isOwnMessage ? 'text-white/70' : 'text-medical-text-light'} text-xs font-normal mt-1`}>
            {new Date(message.createdAt).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={tw`flex-1 bg-medical-neutral centered`}>
        <Text style={tw`medical-text text-lg`}>Loading messages...</Text>
      </View>
    );
  }

  // Get the other user from the first message or use a placeholder
  const otherUser = messages.length > 0 ? messages[0].sender : null;

  return (
    <KeyboardAvoidingView 
      style={tw`flex-1`} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={tw`flex-1 bg-medical-neutral`}>
        {/* Header */}
        <View style={tw`bg-medical-primary rounded-b-[30px] pb-6`}>
          <View style={tw`container pt-12 pb-4`}>
            <View style={tw`flex-row items-center`}>
              <TouchableOpacity
                style={tw`mr-4`}
                onPress={() => router.back()}
              >
                <MaterialIcons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
              
              <View style={tw`flex-1`}>
                <Text style={tw`text-white text-xl font-bold`}>
                  {otherUser?.fullname || 'Chat'}
                </Text>
                <Text style={tw`text-white/80 text-sm font-normal`}>
                  {otherUser ? 'Online' : 'Offline'}
                </Text>
              </View>
              
              <TouchableOpacity style={tw`ml-4`}>
                <MaterialIcons name="more-vert" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          style={tw`flex-1 px-4`}
          contentContainerStyle={tw`py-4`}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Input */}
        <View style={tw`bg-white p-4 border-t border-medical-border`}>
          <View style={tw`flex-row items-center`}>
            <TextInput
              style={tw`flex-1 bg-medical-neutral rounded-2xl px-4 py-3 mr-3 text-medical-text`}
              placeholder="Type a message..."
              placeholderTextColor={tw.color('medical-text-light')}
              value={messageText}
              onChangeText={setMessageText}
              multiline
              maxLength={1000}
            />
            <TouchableOpacity
              style={tw`w-12 h-12 rounded-full bg-medical-primary centered ${sending ? 'opacity-50' : ''}`}
              onPress={sendMessage}
              disabled={sending || !messageText.trim()}
            >
              <MaterialIcons 
                name="send" 
                size={20} 
                color="white" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatDetailScreen; 