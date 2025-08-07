import BottomSheet from '@/components/bottom-sheet';
import tw from '@/lib/tailwind';
import chatService from '@/modules/chat/chat-service';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';

interface CaregiverActionSheetProps {
  visible: boolean;
  onClose: () => void;
  caregiver: {
    id: number;
    user: {
      fullname: string;
      email: string;
      contact?: string | null;
    };
  };
}

const CaregiverActionSheet: React.FC<CaregiverActionSheetProps> = ({
  visible,
  onClose,
  caregiver,
}) => {
  const router = useRouter();

  const handleCall = async () => {
    if (caregiver.user.contact) {
      try {
        await Linking.openURL(`tel:${caregiver.user.contact}`);
      } catch (error) {
        console.error('Error opening phone app:', error);
      }
    }
    onClose();
  };

  const handleEmail = async () => {
    try {
      await Linking.openURL(`mailto:${caregiver.user.email}`);
    } catch (error) {
      console.error('Error opening email app:', error);
    }
    onClose();
  };

  const handleChat = async () => {
    try {
      // Create or get existing chat with this caregiver
      const chat = await chatService.createOrGetChat(caregiver.id.toString());
      // Navigate to the chat
      router.push(`/chat/${chat.id}` as any);
    } catch (error) {
      console.error('Error creating chat:', error);
      // Fallback to direct navigation
      router.push(`/chat/${caregiver.id}` as any);
    }
    onClose();
  };

  const actions = [
    {
      icon: 'phone',
      title: 'Call',
      subtitle: caregiver.user.contact || 'No phone number',
      onPress: handleCall,
      disabled: !caregiver.user.contact,
      color: 'medical-success',
    },
    {
      icon: 'email',
      title: 'Email',
      subtitle: caregiver.user.email,
      onPress: handleEmail,
      color: 'medical-primary',
    },
    {
      icon: 'chat',
      title: 'Chat',
      subtitle: 'Send a message',
      onPress: handleChat,
      color: 'medical-warning',
    },
  ];

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View style={tw`p-6`}>
        <Text style={tw`medical-text text-xl font-bold text-center mb-6`}>
          Contact {caregiver.user.fullname}
        </Text>
        
        <View style={tw`gap-4`}>
          {actions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={tw`flex-row items-center p-4 bg-white rounded-lg border border-medical-border ${
                action.disabled ? 'opacity-50' : ''
              }`}
              onPress={action.onPress}
              disabled={action.disabled}
              activeOpacity={0.7}
            >
              <View style={tw`w-12 h-12 rounded-full bg-${action.color}/10 items-center justify-center mr-4`}>
                <MaterialIcons 
                  name={action.icon as any} 
                  size={24} 
                  color={tw.color(action.color)} 
                />
              </View>
              
              <View style={tw`flex-1`}>
                <Text style={tw`medical-text text-base font-semibold`}>
                  {action.title}
                </Text>
                <Text style={tw`medical-text-light text-sm font-normal`}>
                  {action.subtitle}
                </Text>
              </View>
              
              <MaterialIcons 
                name="chevron-right" 
                size={20} 
                color={tw.color('medical-text-light')} 
              />
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity
          style={tw`mt-6 p-4 bg-medical-neutral rounded-lg`}
          onPress={onClose}
          activeOpacity={0.7}
        >
          <Text style={tw`medical-text text-center font-medium`}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default CaregiverActionSheet; 