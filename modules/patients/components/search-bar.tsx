import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onPress?: () => void;
  editable?: boolean;
  showIcon?: boolean;
  autoFocus?: boolean;
  showFilter?: boolean;
  onFilterPress?: () => void;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search by name, specialization, or location...",
  onPress,
  editable = true,
  showIcon = true,
  autoFocus = false,
  showFilter = false,
  onFilterPress,
  showBackButton = false,
  onBackPress
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={tw`flex-row items-center bg-medical-neutral rounded-full px-4 py-3`}>
        {showBackButton && onBackPress && (
          <TouchableOpacity
            onPress={onBackPress}
            style={tw`mr-3 p-1`}
            activeOpacity={0.7}
          >
            <MaterialIcons 
              name="arrow-back" 
              size={20} 
              color={tw.color('medical-primary')} 
            />
          </TouchableOpacity>
        )}
        {showIcon && (
          <MaterialIcons 
            name="search" 
            size={20} 
            color={tw.color('medical-text-light')} 
          />
        )}
        <TextInput
          style={tw`flex-1 ${showIcon ? 'ml-3' : ''} text-medical-text font-normal`}
          placeholder={placeholder}
          placeholderTextColor={tw.color('medical-text-light')}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          autoFocus={autoFocus}
        />
        {showFilter && onFilterPress && (
          <TouchableOpacity
            onPress={onFilterPress}
            style={tw`ml-3 p-1`}
            activeOpacity={0.7}
          >
            <MaterialIcons 
              name="tune" 
              size={20} 
              color={tw.color('medical-primary')} 
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}; 