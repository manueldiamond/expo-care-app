import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ChatUser } from '../types';
import ChatAvatar from './chat-avatar';

interface ChatHeaderProps {
  user: ChatUser;
  onCall?: () => void;
  onVideoCall?: () => void;
  onMore?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  user,
  onCall,
  onVideoCall,
  onMore,
}) => {
  const getStatusText = () => {
    if (user.isOnline) {
      return 'Online';
    }
    if (user.lastSeen) {
      const now = new Date();
      const diff = now.getTime() - user.lastSeen.getTime();
      const minutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      if (minutes < 60) {
        return `Last seen ${minutes} minutes ago`;
      } else if (hours < 24) {
        return `Last seen ${hours} hours ago`;
      } else {
        return `Last seen ${days} days ago`;
      }
    }
    return 'Offline';
  };

  return (
    <View style={tw`flex-row items-center justify-between bg-white border-b border-medical-border px-4 py-3`}>
      <TouchableOpacity
        style={tw`flex-row items-center flex-1`}
        onPress={() => router.back()}
      >
        <MaterialIcons 
          name="arrow-back" 
          size={24} 
          color={tw.color('medical-text')} 
        />
      </TouchableOpacity>
      
      <TouchableOpacity style={tw`flex-row items-center flex-1`}>
        <ChatAvatar user={user} size="small" />
        <View style={tw`ml-3 flex-1`}>
          <Text style={tw`text-medical-text font-medium text-base`}>
            {user.name}
          </Text>
          <Text style={tw`text-medical-text-light font-normal text-xs`}>
            {getStatusText()}
          </Text>
        </View>
      </TouchableOpacity>
      
      <View style={tw`flex-row items-center`}>
        {onCall && (
          <TouchableOpacity style={tw`mr-3`} onPress={onCall}>
            <MaterialIcons 
              name="call" 
              size={24} 
              color={tw.color('medical-primary')} 
            />
          </TouchableOpacity>
        )}
        
        {onVideoCall && (
          <TouchableOpacity style={tw`mr-3`} onPress={onVideoCall}>
            <MaterialIcons 
              name="videocam" 
              size={24} 
              color={tw.color('medical-primary')} 
            />
          </TouchableOpacity>
        )}
        
        {onMore && (
          <TouchableOpacity onPress={onMore}>
            <MaterialIcons 
              name="more-vert" 
              size={24} 
              color={tw.color('medical-text')} 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ChatHeader; 