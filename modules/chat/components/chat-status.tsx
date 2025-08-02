import tw from '@/lib/tailwind';
import React from 'react';
import { Text, View } from 'react-native';

interface ChatStatusProps {
  status: 'online' | 'offline' | 'away' | 'busy';
  showText?: boolean;
  size?: 'small' | 'medium';
}

const ChatStatus: React.FC<ChatStatusProps> = ({ 
  status, 
  showText = false, 
  size = 'small' 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return tw.color('medical-success');
      case 'away':
        return tw.color('medical-accent');
      case 'busy':
        return tw.color('medical-error');
      case 'offline':
      default:
        return tw.color('medical-text-light');
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'away':
        return 'Away';
      case 'busy':
        return 'Busy';
      case 'offline':
      default:
        return 'Offline';
    }
  };

  const sizeMap = {
    small: 8,
    medium: 12,
  };

  return (
    <View style={tw`flex-row items-center`}>
      <View
        style={[
          tw`rounded-full`,
          { 
            width: sizeMap[size], 
            height: sizeMap[size],
            backgroundColor: getStatusColor()
          }
        ]}
      />
      {showText && (
        <Text style={tw`ml-2 text-medical-text-light font-normal text-xs`}>
          {getStatusText()}
        </Text>
      )}
    </View>
  );
};

export default ChatStatus; 