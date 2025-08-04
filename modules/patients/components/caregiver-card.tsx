import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Caregiver } from '../types';

interface CaregiverCardProps {
  caregiver: Caregiver;
  showAvailability?: boolean;
  showVerified?: boolean;
  onPress?: (caregiver: Caregiver) => void;
}

export const CaregiverCard: React.FC<CaregiverCardProps> = ({
  caregiver,
  showAvailability = true,
  showVerified = true,
  onPress
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress(caregiver);
    } else {
      router.push(`/patients/caregiver/${caregiver.id}` as any);
    }
  };

  return (
    <TouchableOpacity
      style={tw`bg-medical-card rounded-lg p-4 mb-3`}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={tw`flex-row items-center`}>
        <Image
          source={{ uri: caregiver.photoUrl }}
          style={tw`w-16 h-16 rounded-full mr-4`}
        />
        <View style={tw`flex-1`}>
          <View style={tw`flex-row items-center mb-1`}>
            <Text style={tw`medical-text text-base font-semibold`}>
              {caregiver.name}
            </Text>
            {showVerified && caregiver.verified && (
              <MaterialIcons 
                name="verified" 
                size={16} 
                color={tw.color('medical-success')} 
                style={tw`ml-2`}
              />
            )}
          </View>
          <Text style={tw`medical-text-light text-sm font-normal`}>
            {caregiver.specialization}
          </Text>
          <View style={tw`flex-row items-center mt-1`}>
            <MaterialIcons 
              name="star" 
              size={16} 
              color={tw.color('medical-accent')} 
            />
            <Text style={tw`medical-text-light text-xs font-normal ml-1`}>
              {caregiver.rating} • {caregiver.experience}
            </Text>
            {showAvailability && (
              <View style={tw`flex-row items-center ml-3`}>
                <View 
                  style={[
                    tw`w-2 h-2 rounded-full mr-1`,
                    { backgroundColor: caregiver.isAvailable ? tw.color('medical-success') : tw.color('medical-error') }
                  ]}
                />
                <Text style={tw`medical-text-light text-xs font-normal`}>
                  {caregiver.isAvailable ? 'Available' : 'Unavailable'}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={tw`items-end`}>
          <Text style={tw`medical-text text-sm font-semibold`}>
            {caregiver.hourlyRate}/hr
          </Text>
          <Text style={tw`medical-text-light text-xs font-normal`}>
            {caregiver.location}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}; 