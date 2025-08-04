import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

const EmptyNotifications: React.FC = () => {
  return (
    <View style={tw`medical-card p-8 items-center`}>
      <MaterialIcons 
        name="notifications-none" 
        size={48} 
        color={tw.color('medical-text-light')} 
      />
      <Text style={tw`medical-text text-lg font-semibold mt-4`}>
        No Notifications
      </Text>
      <Text style={tw`medical-text-light text-sm font-normal text-center mt-2`}>
        You're all caught up! Check back later for updates.
      </Text>
    </View>
  );
};

export default EmptyNotifications; 