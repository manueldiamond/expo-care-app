import tw from '@/lib/tailwind';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import { TextInput as RNTextInput, Text, View } from 'react-native';

interface FormTextInputProps {
  name: string;
  control: Control<any>;
  placeholder?: string;
  error?: string;
  multiline?: boolean;
  style?: any;
}

const FormTextInput: React.FC<FormTextInputProps> = ({
  name,
  control,
  placeholder,
  error,
  multiline = false,
  style,
}) => {
  const {
    field: { onChange, value }
  } = useController({
    name,
    control,
    defaultValue: '',
  });

  return (
    <View>
      <RNTextInput
        style={[
          tw`bg-white rounded-lg px-3 py-2 text-dark`,
          error && tw`border border-red-500`,
          style
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        multiline={multiline}
      />
      {error && <Text style={tw`text-red-500 text-xs mt-1`}>{error}</Text>}
    </View>
  );
};

export default FormTextInput; 