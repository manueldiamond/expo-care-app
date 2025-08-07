import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import chatService from '../chat-service';
import { Chat } from '../types';

const ChatScreen = () => {
  const [conversations, setConversations] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadConversations();
    setupSocketListeners();

    return () => {
      chatService.removeListeners();
    };
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await chatService.getConversations();
      setConversations(data);
    } catch (err) {
      console.error('Error loading conversations:', err);
      setError('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  const setupSocketListeners = () => {
    // Listen for new messages
    chatService.onReceiveMessage((message) => {
      // Update conversation list when new message arrives
      setConversations(prev => {
        const updated = [...prev];
        const conversationIndex = updated.findIndex(conv => conv.id === message.chatId);
        
        if (conversationIndex !== -1) {
          const conversation = updated[conversationIndex];
          updated[conversationIndex] = {
            ...conversation,
            messages: [...conversation.messages, message],
            updatedAt: message.createdAt
          };
        }
        
        return updated;
      });
    });

    // Listen for message save errors
    chatService.onMessageSaveError((error) => {
      console.error('Message save error:', error);
      // You could show a toast notification here
    });
  };

  const handleConversationPress = (conversation: Chat) => {
    router.push(`/chat/${conversation.id}` as any);
  };

  const renderConversation = ({ item: conversation }: { item: Chat }) => {
    // Determine which user is the other participant (not current user)
    const currentUserId = 1; // This should come from user context/store
    const otherUser = conversation.userAId === currentUserId ? conversation.userB : conversation.userA;
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    const unreadCount = conversation.messages.filter(msg => !msg.read && msg.senderId !== currentUserId).length;

    return (
      <TouchableOpacity
        style={tw`flex-row items-center p-4 bg-white border-b border-medical-border`}
        onPress={() => handleConversationPress(conversation)}
        activeOpacity={0.7}
      >
        <View style={tw`w-12 h-12 rounded-full bg-medical-primary centered mr-3`}>
          <Text style={tw`text-white font-medium text-lg`}>
            {otherUser?.fullname.charAt(0)}
          </Text>
        </View>
        
        <View style={tw`flex-1`}>
          <View style={tw`flex-row items-center justify-between`}>
            <Text style={tw`text-medical-text font-medium text-base`}>
              {otherUser?.fullname}
            </Text>
            <Text style={tw`text-medical-text-light font-normal text-xs`}>
              {new Date(conversation.updatedAt).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Text>
          </View>
          
          <View style={tw`flex-row items-center justify-between mt-1`}>
            <Text 
              style={tw`text-medical-text-light font-normal text-sm flex-1`}
              numberOfLines={1}
            >
              {lastMessage ? lastMessage.content : 'No messages yet'}
            </Text>
            
            {unreadCount > 0 && (
              <View style={tw`w-5 h-5 rounded-full bg-medical-primary centered ml-2`}>
                <Text style={tw`text-white font-medium text-xs`}>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={tw`flex-1 bg-medical-neutral centered`}>
        <Text style={tw`medical-text text-lg`}>Loading conversations...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 bg-medical-neutral centered`}>
        <Text style={tw`medical-text text-lg text-red-500 mb-4`}>{error}</Text>
        <TouchableOpacity 
          style={tw`bg-medical-primary px-4 py-2 rounded-lg`}
          onPress={loadConversations}
        >
          <Text style={tw`text-white font-medium`}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <View style={tw`flex-1 bg-medical-neutral`}>
        {/* Header */}
        <View style={tw`bg-medical-primary rounded-b-[30px] pb-6`}>
          <View style={tw`container pt-4 pb-4`}>
              
            <View style={tw`flex-row items-center justify-start`}>
              <View>
                <View style={tw`flex-row items-center`}>
                  <TouchableOpacity
                    onPress={() => router.canGoBack()?router.back():router.push('/home')}
                    style={tw``}
                    accessibilityLabel="Go back"
                  >
                    <MaterialIcons name="chevron-left" size={28} color="#fff" />
                  </TouchableOpacity>
                  <Text style={tw`text-white text-2xl font-bold`}>Messages</Text>
                </View>
                <Text style={tw`text-white/80 text-sm font-normal`}>
                  {conversations.length} conversations
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={tw`bg-white p-4 border-b border-medical-border`}>
          <View style={tw`flex-row items-center bg-medical-neutral rounded-2xl px-4 py-3`}>
            <MaterialIcons 
              name="search" 
              size={20} 
              color={tw.color('medical-text-light')} 
            />
            <Text style={tw`text-medical-text-light ml-3 font-normal`}>
              Search conversations...
            </Text>
          </View>
        </View>

        {/* Conversations */}
        <FlatList
          data={conversations}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-4`}
          refreshing={loading}
          onRefresh={loadConversations}
        />
      </View>
    </>
  );
};

export default ChatScreen; 