import tw from '@/lib/tailwind';
import React from 'react';
import { Text, View } from 'react-native';

interface ChatUnreadProps {
  count: number;
  size?: 'small' | 'medium';
}

const ChatUnread: React.FC<ChatUnreadProps> = ({ count, size = 'small' }) => {
  if (count === 0) return null;

  const sizeMap = {
    small: {
      container: tw`w-5 h-5 rounded-full bg-medical-primary centered`,
      text: tw`text-white font-medium text-xs`,
    },
    medium: {
      container: tw`w-6 h-6 rounded-full bg-medical-primary centered`,
      text: tw`text-white font-medium text-sm`,
    },
  };

  const styles = sizeMap[size];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {count > 99 ? '99+' : count.toString()}
      </Text>
    </View>
  );
};

export default ChatUnread; 