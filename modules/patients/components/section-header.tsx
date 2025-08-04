import tw from '@/lib/tailwind';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onActionPress?: () => void;
  showAction?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionText,
  onActionPress,
  showAction = false
}) => {
  return (
    <View style={tw`flex-row items-center justify-between mb-4`}>
      <Text style={tw`medical-text text-lg font-semibold`}>
        {title}
      </Text>
      {showAction && actionText && (
        <TouchableOpacity
          onPress={onActionPress}
        >
          <View style={tw`flex-row centered`}>
            <Text style={tw`text-medical-text/50 font-medium text-sm mr-1`}>{actionText}</Text>
            <Text style={tw`text-medical-text/50 text-base`}>›</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}; 