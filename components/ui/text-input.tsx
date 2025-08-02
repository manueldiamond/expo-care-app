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
          tw`bg-medical-neutral/5 rounded-lg px-4 py-3 text-medical-text font-normal`,
          style
        ]}
        placeholder={placeholder}
        placeholderTextColor={tw.color('medical-text-light')}
        value={value}
        onChangeText={onChange}
        multiline={multiline}
      />
      {error && <Text style={tw`text-medical-error text-xs mt-1 font-normal`}>{error}</Text>}
    </View>
  );
};

export default FormTextInput; 