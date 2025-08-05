import tw from '@/lib/tailwind';
import React from 'react';
import { View } from 'react-native';
import { Style } from 'twrnc';

interface CardProps {
  children: React.ReactNode;
  style?:Style;
}

export const Card: React.FC<CardProps> = ({
  children,
  style
}) => {
  return (
    <View style={[ tw`medical-card p-6 mb-6 ` ,style]}>
      {children}
    </View>
  );
}; 