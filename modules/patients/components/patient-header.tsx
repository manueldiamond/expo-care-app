import NotificationBell from '@/components/NotificationBell';
import tw from '@/lib/tailwind';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface PatientHeaderProps {
  displayName: string;
  avatarUrl?: string;
  onNotificationPress?: () => void;
}

export const PatientHeader: React.FC<PatientHeaderProps> = ({
  displayName,
  avatarUrl,
  onNotificationPress
}) => {
  const router = useRouter();

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
    } else {
      router.push('/notifications' as any);
    }
  };

  return (
    <View style={tw`flex-row items-center justify-between mb-6`}>
      <View style={tw`flex-row items-center`}>
        <Image
          source={avatarUrl ? { uri: avatarUrl } : require('@/assets/images/avatar.jpg')}
          style={tw`w-16 h-16 rounded-full mr-4 border-2 border-white`}
        />
        <View>
          <Text style={tw`text-white text-xl font-semibold`}>
            Welcome back
          </Text>
          <Text style={tw`text-white/80 text-sm font-normal`}>
            {displayName}
          </Text>
        </View>
      </View>
     <NotificationBell/>
    </View>
  );
}; 