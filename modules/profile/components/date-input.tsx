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
        <View>
          <TouchableOpacity
            style={tw`bg-medical-neutral rounded-lg px-4 py-3`}
            onPress={() => setShowPicker(true)}
            activeOpacity={0.8}
          >
            <Text style={tw`text-medical-text font-normal`}>
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
          {error && (
            <Text style={tw`text-medical-error text-xs mt-1 font-normal`}>{error}</Text>
          )}
        </View>
      )}
    />
  );
};

export default DateInput;