import tw from '@/lib/tailwind';
import React from 'react';
import { Text } from 'react-native';

interface ChatTimeProps {
  timestamp: Date;
  size?: 'small' | 'medium';
}

const ChatTime: React.FC<ChatTimeProps> = ({ timestamp, size = 'small' }) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) {
      return 'Now';
    } else if (minutes < 60) {
      return `${minutes}m`;
    } else if (hours < 24) {
      return `${hours}h`;
    } else if (days < 7) {
      return `${days}d`;
    } else {
      return date.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const textSize = size === 'small' ? 'text-xs' : 'text-sm';

  return (
    <Text style={tw`${textSize} text-medical-text-light font-normal`}>
      {formatTime(timestamp)}
    </Text>
  );
};

export default ChatTime; 