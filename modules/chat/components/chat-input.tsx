import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface ChatInputProps {
  onSend: (message: string) => void;
  onAttachment?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  onAttachment,
  placeholder = 'Type a message...',
  disabled = false,
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleAttachment = () => {
    if (onAttachment) {
      onAttachment();
    }
  };

  return (
    <View style={tw`flex-row items-center bg-white border-t border-medical-border px-4 py-3`}>
      <TouchableOpacity
        style={tw`mr-3`}
        onPress={handleAttachment}
        disabled={disabled}
      >
        <MaterialIcons 
          name="attach-file" 
          size={24} 
          color={disabled ? tw.color('medical-text-light') : tw.color('medical-primary')} 
        />
      </TouchableOpacity>
      
      <TextInput
        style={tw`flex-1 bg-medical-neutral rounded-2xl px-4 py-3 text-medical-text font-normal`}
        placeholder={placeholder}
        placeholderTextColor={tw.color('medical-text-light')}
        value={message}
        onChangeText={setMessage}
        multiline
        maxLength={1000}
        editable={!disabled}
      />
      
      <TouchableOpacity
        style={tw`ml-3`}
        onPress={handleSend}
        disabled={!message.trim() || disabled}
      >
        <MaterialIcons 
          name="send" 
          size={24} 
          color={
            !message.trim() || disabled 
              ? tw.color('medical-text-light') 
              : tw.color('medical-primary')
          } 
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput; 