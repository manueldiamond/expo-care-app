import tw from "@/lib/tailwind";
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Control, Controller } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

export const DateInput = ({
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
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <View style={tw`bg-white px-3 py-2 mb-2 rounded-lg`}>
          <Text style={tw`text-good text-[10px] font-medium mb-1`}>{label}</Text>
          <TouchableOpacity
            style={tw`py-2 px-2 `}
            onPress={() => setShowPicker(true)}
            activeOpacity={0.8}
          >
            <Text style={tw`text-dark text-base`}>
              {value ? (value instanceof Date ? value.toLocaleDateString() : new Date(value).toLocaleDateString()) : placeholder || 'Select date'}
            </Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={value instanceof Date ? value : value ? new Date(value) : new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowPicker(false);
                if (selectedDate) onChange(selectedDate);
              }}
              maximumDate={new Date()}
            />
          )}
          {/* Optionally show error 
          {error ? (
            <Text style={tw`text-red-500 text-xs mt-1`}>{error}</Text>
          ) : null}
*/}
        </View>
      )}
    />
  );
};

export default DateInput; 