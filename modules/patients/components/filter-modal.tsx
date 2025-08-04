import BottomSheet from '@/components/bottom-sheet';
import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export interface FilterOptions {
  availability: 'all' | 'available' | 'unavailable';
  specialization?: string;
  location?: string;
  rating?: number;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const availabilityOptions = [
  { label: 'All Caregivers', value: 'all' },
  { label: 'Available Only', value: 'available' },
  { label: 'Unavailable Only', value: 'unavailable' }
];

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  currentFilters
}) => {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      availability: 'all',
      specialization: undefined,
      location: undefined,
      rating: undefined
    };
    setFilters(resetFilters);
    onApply(resetFilters);
    onClose();
  };

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const scrollRef=useRef(null)
  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      scrollViewRef={scrollRef}
     style={tw`h-[65%]`}
    >
      <View style={tw`flex-1 container py-5`}>
        {/* Header */}
        <View style={tw`flex-row items-center justify-between mb-6`}>
          <Text style={tw`medical-text text-xl font-semibold`}>Filter Caregivers</Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="close" size={24} color={tw.color('medical-text-light')} />
          </TouchableOpacity>
        </View>

        <ScrollView nestedScrollEnabled={true} style={tw`flex-1 bg-red-500`} showsVerticalScrollIndicator={false}>
          {/* Availability Filter */}
          <View style={tw`mb-6`}>
            <Text style={tw`medical-text text-lg font-semibold mb-3`}>Availability</Text>
            <View style={tw`gap-2`}>
              {availabilityOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={tw`flex-row items-center p-3 rounded-lg border ${
                    filters.availability === option.value 
                      ? 'border-medical-primary bg-medical-primary/10' 
                      : 'border-medical-neutral bg-medical-neutral'
                  }`}
                  onPress={() => updateFilter('availability', option.value)}
                >
                  <View style={tw`w-5 h-5 rounded-full border-2 mr-3 ${
                    filters.availability === option.value 
                      ? 'border-medical-primary bg-medical-primary' 
                      : 'border-medical-text-light'
                  }`}>
                    {filters.availability === option.value && (
                      <MaterialIcons name="check" size={12} color="white" />
                    )}
                  </View>
                  <Text style={tw`medical-text font-medium`}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Specialization Filter */}
          <View style={tw`mb-6`}>
            <Text style={tw`medical-text text-lg font-semibold mb-3`}>Specialization</Text>
            <View style={tw`flex-row flex-wrap gap-2`}>
              {['Palliative Care', 'Geriatric Care', 'Home Care', 'Hospice Care', 'Pain Management'].map((spec) => (
                <TouchableOpacity
                  key={spec}
                  style={tw`px-3 py-2 rounded-full border ${
                    filters.specialization === spec 
                      ? 'border-medical-primary bg-medical-primary/10' 
                      : 'border-medical-neutral bg-medical-neutral'
                  }`}
                  onPress={() => updateFilter('specialization', filters.specialization === spec ? undefined : spec)}
                >
                  <Text style={tw`medical-text text-sm font-medium`}>{spec}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Location Filter */}
          <View style={tw`mb-6`}>
            <Text style={tw`medical-text text-lg font-semibold mb-3`}>Location</Text>
            <View style={tw`flex-row flex-wrap gap-2`}>
              {['Accra', 'Kumasi', 'Tema', 'Cape Coast'].map((location) => (
                <TouchableOpacity
                  key={location}
                  style={tw`px-3 py-2 rounded-full border ${
                    filters.location === location 
                      ? 'border-medical-primary bg-medical-primary/10' 
                      : 'border-medical-neutral bg-medical-neutral'
                  }`}
                  onPress={() => updateFilter('location', filters.location === location ? undefined : location)}
                >
                  <Text style={tw`medical-text text-sm font-medium`}>{location}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Rating Filter */}
          <View style={tw`mb-6`}>
            <Text style={tw`medical-text text-lg font-semibold mb-3`}>Minimum Rating</Text>
            <View style={tw`flex-row flex-wrap gap-2`}>
              {[4.0, 4.5, 4.8, 5.0].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  style={tw`px-3 py-2 rounded-full border ${
                    filters.rating === rating 
                      ? 'border-medical-primary bg-medical-primary/10' 
                      : 'border-medical-neutral bg-medical-neutral'
                  }`}
                  onPress={() => updateFilter('rating', filters.rating === rating ? undefined : rating)}
                >
                  <View style={tw`flex-row items-center`}>
                    <MaterialIcons name="star" size={16} color={tw.color('medical-accent')} />
                    <Text style={tw`medical-text text-sm font-medium ml-1`}>{rating}+</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={tw`flex-row gap-3 pt-4 border-t border-medical-neutral`}>
          <TouchableOpacity
            style={tw`flex-1 py-3 rounded-lg border border-medical-neutral`}
            onPress={handleReset}
          >
            <Text style={tw`medical-text text-center font-medium`}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-1 py-3 rounded-lg bg-medical-primary`}
            onPress={handleApply}
          >
            <Text style={tw`text-white text-center font-medium`}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};