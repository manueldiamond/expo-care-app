import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Card } from './Card';
import { SectionHeader } from './SectionHeader';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  style
}) => {
  return (
    <View style={style}>
      <SectionHeader title={title} subtitle={subtitle} />
      <Card>
        {children}
      </Card>
    </View>
  );
}; 