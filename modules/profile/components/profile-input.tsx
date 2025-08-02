import tw from "@/lib/tailwind";
import { Control, useController } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

export const ProfileInput = ({
  name,
  label,
  placeholder,
  control,
  error,
  ...rest
}: {
  name: string;
  label: string;
  placeholder?: string;
  control: Control<any>;
  error?: string;
  [key: string]: any;
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
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={tw.color('medical-text-light')}
        style={tw`bg-medical-neutral rounded-lg px-4 py-3 text-medical-text font-normal`}
        {...rest}
      />
      {error && (
        <Text style={tw`text-medical-error text-xs mt-1 font-normal`}>{error}</Text>
      )}
    </View>
  );
};

