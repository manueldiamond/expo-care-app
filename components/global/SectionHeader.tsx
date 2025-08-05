import tw from '@/lib/tailwind';
import React from 'react';
import { Text, View } from 'react-native';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  style?: any;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  style
}) => {
  return (
    <View style={[tw`mb-4`, style]}>
      <Text style={tw`medical-text text-xl font-semibold`}>{title}</Text>
      {subtitle && (
        <Text style={tw`medical-text-light text-sm font-normal mt-1`}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}; 