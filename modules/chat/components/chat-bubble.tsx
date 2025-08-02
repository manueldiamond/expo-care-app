import tw from '@/lib/tailwind';
import React from 'react';
import { Text, View } from 'react-native';
import { ChatMessage } from '../types';

interface ChatBubbleProps {
  message: ChatMessage;
  isOwnMessage: boolean;
  showTime?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  message, 
  isOwnMessage, 
  showTime = true 
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <View style={tw`mb-3 ${isOwnMessage ? 'items-end' : 'items-start'}`}>
      <View
        style={[
          tw`max-w-[75%] rounded-2xl px-4 py-3`,
          isOwnMessage 
            ? tw`bg-medical-primary` 
            : tw`bg-medical-neutral`
        ]}
      >
        <Text
          style={[
            tw`text-sm font-normal`,
            isOwnMessage 
              ? tw`text-white` 
              : tw`text-medical-text`
          ]}
        >
          {message.text}
        </Text>
      </View>
      {showTime && (
        <Text
          style={[
            tw`text-xs mt-1`,
            isOwnMessage 
              ? tw`text-medical-text-light` 
              : tw`text-medical-text-light`
          ]}
        >
          {formatTime(message.timestamp)}
          {isOwnMessage && (
            <Text style={tw`ml-2`}>
              {message.isRead ? '✓✓' : '✓'}
            </Text>
          )}
        </Text>
      )}
    </View>
  );
};

export default ChatBubble; 