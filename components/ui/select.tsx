import BottomSheet from '@/components/bottom-sheet';
import tw from '@/lib/tailwind';
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
      style={tw`px-4 py-3 border-b border-gray-100 ${isSelected ? 'bg-blue-50' : ''}`}
      onPress={onPress}
    >
      <Text style={tw`text-base ${isSelected ? 'text-blue-600 font-medium' : 'text-gray-900'}`}>
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
        style={tw`bg-white rounded-lg px-3 py-4`}
        onPress={handleOpen}
      >
        <Text style={tw`text-dark ${selectedOption ? '' : 'text-gray-500'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
      </TouchableOpacity>
      
      {error && <Text style={tw`text-red-500 text-xs mt-1`}>{error}</Text>}

      <BottomSheet visible={sheetVisible} onClose={handleClose}>
        <View style={tw`p-4 pb-10`}>
          <Text style={tw`text-lg font-bold mb-4 text-center`}>Select Option</Text>
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