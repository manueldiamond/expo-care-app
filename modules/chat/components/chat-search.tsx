import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface ChatSearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onClear?: () => void;
}

const ChatSearch: React.FC<ChatSearchProps> = ({
  placeholder = 'Search conversations...',
  onSearch,
  onClear,
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = (text: string) => {
    setQuery(text);
    onSearch(text);
  };

  const handleClear = () => {
    setQuery('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <View style={tw`bg-white p-4 border-b border-medical-border`}>
      <View style={tw`flex-row items-center bg-medical-neutral rounded-2xl px-4 py-3`}>
        <MaterialIcons 
          name="search" 
          size={20} 
          color={tw.color('medical-text-light')} 
        />
        
        <TextInput
          style={tw`flex-1 ml-3 text-medical-text font-normal`}
          placeholder={placeholder}
          placeholderTextColor={tw.color('medical-text-light')}
          value={query}
          onChangeText={handleSearch}
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <MaterialIcons 
              name="close" 
              size={20} 
              color={tw.color('medical-text-light')} 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ChatSearch; 