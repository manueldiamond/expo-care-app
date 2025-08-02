import tw from '@/lib/tailwind';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StatusBar, Text, View } from 'react-native';
import ChatBubble from '../components/chat-bubble';
import ChatHeader from '../components/chat-header';
import ChatInput from '../components/chat-input';
import { mockMessages, mockUsers } from '../data';
import { ChatMessage } from '../types';

const ChatDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [isTyping, setIsTyping] = useState(false);

  // Get the other user from the conversation
  const otherUser = mockUsers.find(user => user.id === '1'); // For demo, using first user

  const handleSend = (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      senderId: 'current-user',
      receiverId: otherUser?.id || '1',
      timestamp: new Date(),
      isRead: false,
      type: 'text',
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const handleAttachment = () => {
    // Handle file attachment
    console.log('Attachment pressed');
  };

  const handleCall = () => {
    // Handle voice call
    console.log('Call pressed');
  };

  const handleVideoCall = () => {
    // Handle video call
    console.log('Video call pressed');
  };

  const handleMore = () => {
    // Handle more options
    console.log('More pressed');
  };

  const renderMessage = ({ item: message }: { item: ChatMessage }) => {
    const isOwnMessage = message.senderId === 'current-user';
    return (
      <ChatBubble
        message={message}
        isOwnMessage={isOwnMessage}
        showTime={true}
      />
    );
  };

  if (!otherUser) {
    return (
      <View style={tw`flex-1 centered`}>
        <Text style={tw`text-medical-text font-normal`}>User not found</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar hidden={false} />
      <View style={tw`flex-1 bg-medical-neutral`}>
        {/* Chat Header */}
        <ChatHeader
          user={otherUser}
          onCall={handleCall}
          onVideoCall={handleVideoCall}
          onMore={handleMore}
        />

        {/* Messages */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`px-4 py-4`}
          inverted={false}
        />

        {/* Typing Indicator */}
        {isTyping && (
          <View style={tw`px-4 py-2`}>
            <Text style={tw`text-medical-text-light font-normal text-sm italic`}>
              {otherUser.name} is typing...
            </Text>
          </View>
        )}

        {/* Chat Input */}
        <ChatInput
          onSend={handleSend}
          onAttachment={handleAttachment}
          placeholder="Type a message..."
        />
      </View>
    </>
  );
};

export default ChatDetailScreen; 