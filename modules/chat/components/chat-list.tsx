import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ChatConversation } from '../types';
import ChatAvatar from './chat-avatar';
import ChatTime from './chat-time';
import ChatUnread from './chat-unread';

interface ChatListProps {
  conversations: ChatConversation[];
  onConversationPress: (conversation: ChatConversation) => void;
  onSearch?: (query: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  conversations,
  onConversationPress,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const getOtherParticipant = (conversation: ChatConversation) => {
    return conversation.participants.find(p => p.id !== 'current-user') || conversation.participants[0];
  };

  const renderConversation = ({ item: conversation }: { item: ChatConversation }) => {
    const otherUser = getOtherParticipant(conversation);
    const lastMessage = conversation.lastMessage;

    return (
      <TouchableOpacity
        style={tw`flex-row items-center p-4 bg-white border-b border-medical-border`}
        onPress={() => onConversationPress(conversation)}
        activeOpacity={0.7}
      >
        <ChatAvatar user={otherUser} size="medium" />
        
        <View style={tw`flex-1 ml-3`}>
          <View style={tw`flex-row items-center justify-between`}>
            <Text style={tw`text-medical-text font-medium text-base`}>
              {otherUser.name}
            </Text>
            <ChatTime timestamp={conversation.updatedAt} />
          </View>
          
          <View style={tw`flex-row items-center justify-between mt-1`}>
            <Text 
              style={tw`text-medical-text-light font-normal text-sm flex-1`}
              numberOfLines={1}
            >
              {lastMessage ? lastMessage.text : 'No messages yet'}
            </Text>
            
            {conversation.unreadCount > 0 && (
              <ChatUnread count={conversation.unreadCount} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`flex-1 bg-medical-neutral`}>
      {/* Search Bar */}
      <View style={tw`bg-white p-4 border-b border-medical-border`}>
        <View style={tw`flex-row items-center bg-medical-neutral rounded-2xl px-4 py-3`}>
          <MaterialIcons 
            name="search" 
            size={20} 
            color={tw.color('medical-text-light')} 
          />
          <TextInput
            style={tw`flex-1 ml-3 text-medical-text font-normal`}
            placeholder="Search conversations..."
            placeholderTextColor={tw.color('medical-text-light')}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {/* Conversations List */}
      <FlatList
        data={conversations}
        renderItem={renderConversation}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-4`}
      />
    </View>
  );
};

export default ChatList; 