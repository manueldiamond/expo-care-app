import tw from '@/lib/tailwind';
import React from 'react';
import { Image, View } from 'react-native';
import { ChatUser } from '../types';

interface ChatAvatarProps {
  user: ChatUser;
  size?: 'small' | 'medium' | 'large';
  showStatus?: boolean;
}

const ChatAvatar: React.FC<ChatAvatarProps> = ({ 
  user, 
  size = 'medium', 
  showStatus = true 
}) => {
  const sizeMap = {
    small: 32,
    medium: 48,
    large: 64,
  };

  const statusColor = user.isOnline ? tw.color('medical-success') : tw.color('medical-text-light');

  return (
    <View style={tw`relative`}>
      <Image
        source={user.avatar ? { uri: user.avatar } : require('@/assets/images/avatar.jpg')}
        style={[
          tw`rounded-full`,
          { width: sizeMap[size], height: sizeMap[size] }
        ]}
      />
      {showStatus && (
        <View
          style={[
            tw`absolute bottom-0 right-0 rounded-full border-2 border-white`,
            { 
              width: sizeMap[size] * 0.3, 
              height: sizeMap[size] * 0.3,
              backgroundColor: statusColor
            }
          ]}
        />
      )}
    </View>
  );
};

export default ChatAvatar; 