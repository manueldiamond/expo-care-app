import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { PendingAction } from '../types';

interface PendingActionCardProps {
  action: PendingAction;
  onPress?: (action: PendingAction) => void;
}

export const PendingActionCard: React.FC<PendingActionCardProps> = ({
  action,
  onPress
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress(action);
    } else {
      router.push(action.route as any);
    }
  };

  return (
    <TouchableOpacity
      style={tw`bg-medical-neutral rounded-2xl p-4 flex-row items-center`}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View 
        style={[
          tw`w-12 h-12 rounded-full centered mr-4`,
          { backgroundColor: action.color + '20' }
        ]}
      >
        <MaterialIcons name={action.icon as any} size={24} color={action.color} />
      </View>
      <View style={tw`flex-1`}>
        <Text style={tw`medical-text text-base font-semibold`}>
          {action.title}
        </Text>
        <Text style={tw`medical-text-light text-sm font-normal`}>
          {action.description}
        </Text>
      </View>
      <MaterialIcons 
        name="chevron-right" 
        size={24} 
        color={tw.color('medical-text-light')} 
      />
    </TouchableOpacity>
  );
}; 