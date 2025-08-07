import BlurredCircles from '@/components/blurred-circles';
import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  rightIcon?: {
    name: keyof typeof MaterialIcons.glyphMap;
    onPress: () => void;
    color?: string;
  };
  backButton?: {
    visible?: boolean;
    onPress?: () => void;
  };
  stickyHeader?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  children,
  rightIcon,
  backButton = { visible: false },
  stickyHeader = false,
}) => {
  const handleBackPress = () => {
    if (backButton.onPress) {
      backButton.onPress();
    } else {
      router.back();
    }
  };

  const headerContent = (
    <View style={tw`medical-header pb-8`}>
      <View style={tw`container medical-safe`}>
        <View style={tw`flex-row items-center justify-between mb-6`}>
          <View style={tw`flex-row items-center flex-1`}>
            {backButton.visible && (
              <TouchableOpacity
                style={tw`bg-white/20 rounded-full p-3 mr-4`}
                onPress={handleBackPress}
              >
                <MaterialIcons 
                  name="arrow-back" 
                  size={24} 
                  color="white" 
                />
              </TouchableOpacity>
            )}
            <View style={tw`flex-1`}>
              <Text style={tw`text-white text-2xl font-bold`}>{title}</Text>
              {subtitle && (
                <Text style={tw`text-white/80 text-sm font-normal`}>
                  {subtitle}
                </Text>
              )}
            </View>
          </View>
          
          {rightIcon && (
            <TouchableOpacity
              style={tw`bg-white/20 rounded-full p-3`}
              onPress={rightIcon.onPress}
            >
              <MaterialIcons 
                name={rightIcon.name} 
                size={24} 
                color={rightIcon.color || 'white'} 
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  if (stickyHeader) {
    return (
      <>
        <View style={tw`flex-1 bg-medical-neutral`}>
          <BlurredCircles />
          
          <ScrollView style={tw`flex-1`} stickyHeaderIndices={[0]}>
            {headerContent}
            {children && (
              <View style={tw`container mt-4`}>
                {children}
              </View>
            )}
          </ScrollView>
        </View>
      </>
    );
  }

  return (
    <>
      <View style={tw`flex-1 bg-medical-neutral`}>
        <BlurredCircles />
        
        <ScrollView style={tw`flex-1`}>
          {headerContent}
          {children && (
            <View style={tw`container mt-4`}>
              {children}
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default PageHeader; 