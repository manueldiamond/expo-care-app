import BottomSheet from '@/components/bottom-sheet';
import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  name: string;
  control: Control<any>;
  placeholder?: string;
  options: SelectOption[];
  renderOption?: (option: SelectOption, isSelected: boolean, onPress: () => void) => React.ReactNode;
  error?: string;
}

/**
 * Select component that works with react-hook-form using useController
 * 
 * Example usage with custom rendering:
 * <Select
 *   name="category"
 *   control={control}
 *   options={categories}
 *   renderOption={(option, isSelected, onPress) => (
 *     <TouchableOpacity 
 *       style={tw`p-4 ${isSelected ? 'bg-blue-100' : 'bg-white'}`} 
 *       onPress={onPress}
 *     >
 *       <Text style={tw`${isSelected ? 'text-blue-600' : 'text-gray-900'}`}>
 *         {option.label}
 *       </Text>
 *     </TouchableOpacity>
 *   )}
 * />
 */

const defaultRenderOption = (option: SelectOption, isSelected: boolean, onPress: () => void): React.ReactElement => (
  <TouchableOpacity
    style={tw`px-4 py-3 border-b border-medical-border ${isSelected ? 'bg-medical-primary/10' : ''}`}
    onPress={onPress}
  >
    <Text style={tw`text-base ${isSelected ? 'text-medical-primary font-medium' : 'text-medical-text'}`}>
      {option.label}
    </Text>
  </TouchableOpacity>
);

const Select: React.FC<SelectProps> = ({
  name,
  control,
  placeholder = 'Select an option',
  options,
  renderOption,
  error,
}) => {
  const [sheetVisible, setSheetVisible] = useState(false);

  const {
    field: { onChange, value }
  } = useController({
    name,
    control,
    defaultValue: '',
  });

  const selectedOption = options.find(opt => opt.value === value);

  const handleOpen = () => setSheetVisible(true);
  const handleClose = () => setSheetVisible(false);

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    handleClose();
  };
  
  return (
    <>
      <TouchableOpacity
        style={tw`bg-medical-neutral centered flex-row rounded-lg px-4 py-3`}
        onPress={handleOpen}
      >
        <Text style={tw`text-medical-text flex-1 ${selectedOption ? '' : 'text-medical-text-light'} font-normal`}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
      <MaterialIcons
        name="keyboard-arrow-down"
        size={20}
        color={tw.color('medical-text-light/50')}
      />
      </TouchableOpacity>
      
      {error && <Text style={tw`text-medical-error text-xs mt-1 font-normal`}>{error}</Text>}

      <BottomSheet visible={sheetVisible} onClose={handleClose}>
        <View style={tw`p-4 pb-10`}>
          <Text style={tw`text-lg font-bold mb-4 text-center text-medical-text`}>Select {name||'Option'}</Text>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => {
              const renderFn = renderOption || defaultRenderOption;
              const result = renderFn(
                item,
                item.value === value,
                () => handleSelect(item)
              );
              return result as React.ReactElement;
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </BottomSheet>
    </>
  );
};

export default Select; 