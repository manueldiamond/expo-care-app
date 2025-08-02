import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { mockConversations } from '../data';
import { ChatConversation } from '../types';

const ChatScreen = () => {
  const [conversations, setConversations] = useState<ChatConversation[]>(mockConversations);

  const handleConversationPress = (conversation: ChatConversation) => {
    router.push(`/chat/${conversation.id}` as any);
  };

  const pinnedConversations = conversations.filter(conv => conv.isPinned);
  const regularConversations = conversations.filter(conv => !conv.isPinned);

  const renderConversation = ({ item: conversation }: { item: ChatConversation }) => {
    const otherUser = conversation.participants.find(p => p.id !== 'current-user');
    const lastMessage = conversation.lastMessage;

    return (
      <TouchableOpacity
        style={tw`flex-row items-center p-4 bg-white border-b border-medical-border`}
        onPress={() => handleConversationPress(conversation)}
        activeOpacity={0.7}
      >
        <View style={tw`w-12 h-12 rounded-full bg-medical-primary centered mr-3`}>
          <Text style={tw`text-white font-medium text-lg`}>
            {otherUser?.name.charAt(0)}
          </Text>
        </View>
        
        <View style={tw`flex-1`}>
          <View style={tw`flex-row items-center justify-between`}>
            <Text style={tw`text-medical-text font-medium text-base`}>
              {otherUser?.name}
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
              {lastMessage ? lastMessage.text : 'No messages yet'}
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
    );
  };

  return (
    <>
      <StatusBar hidden={false} />
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
          data={[
            ...pinnedConversations,
            ...regularConversations
          ]}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-4`}
        />
      </View>
    </>
  );
};

export default ChatScreen; 