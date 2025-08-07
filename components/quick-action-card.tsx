import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { QuickAction } from '../modules/patients/types';

interface QuickActionCardProps {
  action: QuickAction;
  onPress?: (action: QuickAction) => void;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  action,
  onPress
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (action.onPress) {
      action.onPress();
    } else if (onPress) {
      onPress(action);
    } else {
      router.push(action.route as any);
    }
  };

  return (
    <TouchableOpacity
      style={tw`bg-medical-neutral flex-1 min-w-[40%] rounded-2xl p-4 items-center`}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={[tw`w-12 h-12 rounded-full centered mb-3`, { backgroundColor: action.color + '20' }]}>
        <MaterialIcons name={action.icon as any} size={24} color={action.color} />
      </View>
      <Text style={tw`medical-text text-sm font-medium text-center`}>
        {action.title}
      </Text>
    </TouchableOpacity>
  );
}; 