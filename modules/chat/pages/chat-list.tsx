import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import ChatSearch from '../components/chat-search';
import { mockConversations } from '../data';
import { ChatConversation } from '../types';

const ChatListScreen = () => {
  const [conversations, setConversations] = useState<ChatConversation[]>(mockConversations);
  const [searchQuery, setSearchQuery] = useState('');

  const handleConversationPress = (conversation: ChatConversation) => {
    // Navigate to chat detail
    router.push(`/chat/${conversation.id}` as any);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = mockConversations.filter(conv => {
        const otherUser = conv.participants.find(p => p.id !== 'current-user');
        return otherUser?.name.toLowerCase().includes(query.toLowerCase());
      });
      setConversations(filtered);
    } else {
      setConversations(mockConversations);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setConversations(mockConversations);
  };

  const pinnedConversations = conversations.filter(conv => conv.isPinned);
  const regularConversations = conversations.filter(conv => !conv.isPinned);

  return (
    <>
      <View style={tw`flex-1 bg-medical-neutral`}>
        {/* Header */}
        <View style={tw`bg-medical-primary rounded-b-[30px] pb-6`}>
          <View style={tw`container pt-12 pb-4`}>
            <View style={tw`flex-row items-center justify-between`}>
              <View>
                <Text style={tw`text-white text-2xl font-bold`}>Messages</Text>
                <Text style={tw`text-white/80 text-sm font-normal`}>
                  {conversations.length} conversations
                </Text>
              </View>
              <TouchableOpacity
                style={tw`bg-white/20 rounded-full p-2`}
                onPress={() => router.push('/new-chat' as any)}
              >
                <MaterialIcons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Search */}
        <ChatSearch
          placeholder="Search conversations..."
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />

        {/* Conversations */}
        <FlatList
          data={[
            ...pinnedConversations,
            ...regularConversations
          ]}
          renderItem={({ item: conversation }) => (
            <TouchableOpacity
              style={tw`flex-row items-center p-4 bg-white border-b border-medical-border`}
              onPress={() => handleConversationPress(conversation)}
              activeOpacity={0.7}
            >
              <View style={tw`w-12 h-12 rounded-full bg-medical-primary centered mr-3`}>
                <Text style={tw`text-white font-medium text-lg`}>
                  {conversation.participants.find(p => p.id !== 'current-user')?.name.charAt(0)}
                </Text>
              </View>
              
              <View style={tw`flex-1`}>
                <View style={tw`flex-row items-center justify-between`}>
                  <Text style={tw`text-medical-text font-medium text-base`}>
                    {conversation.participants.find(p => p.id !== 'current-user')?.name}
                  </Text>
                  <Text style={tw`text-medical-text-light font-normal text-xs`}>
                    {conversation.updatedAt.toLocaleTimeString([], { 
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
                    {conversation.lastMessage ? conversation.lastMessage.text : 'No messages yet'}
                  </Text>
                  
                  {conversation.unreadCount > 0 && (
                    <View style={tw`w-5 h-5 rounded-full bg-medical-primary centered ml-2`}>
                      <Text style={tw`text-white font-medium text-xs`}>
                        {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-4`}
        />
      </View>
    </>
  );
};

export default ChatListScreen; 