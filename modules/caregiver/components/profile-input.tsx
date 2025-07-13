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
    <View style={tw`bg-white px-3 py-2 mb-2 rounded-lg`}>
      <Text style={tw`text-good text-[10px] font-medium mb-1`}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        style={tw`text-dark text-base py-1`}
        {...rest}
      />
      {/* Optionally show error 
      {error ? (
        <Text style={tw`text-red-500 text-xs mt-1`}>{error}</Text>
      ) : null}
        */}
    </View>
  );
};

