import BlurredCircles from '@/components/blurred-circles';
import { FormTextInput, Select } from '@/components/ui';
import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';

const conditions = [
  { label: 'Cancer', value: 'Cancer' },
  { label: 'Stroke', value: 'Stroke' },
  { label: 'Dementia', value: 'Dementia' },
  { label: 'Heart Disease', value: 'Heart Disease' },
  { label: 'Diabetes', value: 'Diabetes' },
  { label: 'Other', value: 'Other' },
];

const years = [
  { label: 'Less than 1 year', value: '<1' },
  { label: '1-2 years', value: '1-2' },
  { label: '3-5 years', value: '3-5' },
  { label: 'More than 5 years', value: '5+' },
];

const schedules = [
  { label: 'Full-time', value: 'Full-time' },
  { label: 'Part-time', value: 'Part-time' },
  { label: 'Occasional', value: 'Occasional' },
  { label: 'Emergency', value: 'Emergency' },
  { label: 'Other', value: 'Other' },
];

const schema = z.object({
  condition: z.string().min(1, 'Condition is required'),
  years: z.string().min(1, 'Years with condition is required'),
  schedule: z.string().min(1, 'Care schedule is required'),
  description: z.string().optional(),
  special: z.string().optional(),
}).refine((data) => data.condition !== 'Other' || !!data.description, {
  message: 'Description is required for Other condition',
  path: ['description'],
});

const MedicalInfoProfileScreen = () => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  
  const selectedCondition = watch('condition');
  
  const onSubmit = handleSubmit((data) => {
    // TODO: Save medical info
    console.log('Medical info:', data);
  });

  return (
    <>
      <StatusBar hidden={false} backgroundColor={tw.color('medical-primary')} />
      <View style={tw`flex-1 bg-medical-neutral`}>
        <BlurredCircles />
        
        <ScrollView style={tw`flex-1`}>
          {/* Medical Header */}
          <View style={tw`medical-header pb-8`}>
            <View style={tw`container medical-safe`}>
              <View style={tw`flex-row items-center justify-between mb-6`}>
                <View style={tw`flex-row items-center flex-1`}>
                  <TouchableOpacity
                    style={tw`bg-white/20 rounded-full p-3 mr-4`}
                    onPress={() => router.back()}
                  >
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                  </TouchableOpacity>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-white text-2xl font-bold`}>Medical Information</Text>
                    <Text style={tw`text-white/80 text-sm font-normal`}>
                      Manage your health records
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={tw`container mt-4`}>
            {/* Form Section */}
            <Text style={tw`medical-text text-xl font-semibold mb-4`}>Health Information</Text>
            <View style={tw`medical-card p-6 mb-6`}>
              <View style={tw`space-y-6`}>
                {/* Condition */}
                <View>
                  <Text style={tw`medical-text text-base font-semibold mb-2`}>Primary Condition</Text>
                  <Select
                    name="condition"
                    control={control}
                    placeholder="Select your condition"
                    options={conditions}
                    error={errors.condition?.message}
                  />
                </View>
                
                {/* Years with Condition */}
                <View>
                  <Text style={tw`medical-text text-base font-semibold mb-2`}>Years with Condition</Text>
                  <Select
                    name="years"
                    control={control}
                    placeholder="Select duration"
                    options={years}
                    error={errors.years?.message}
                  />
                </View>
                
                {/* Care Schedule */}
                <View>
                  <Text style={tw`medical-text text-base font-semibold mb-2`}>Care Schedule</Text>
                  <Select
                    name="schedule"
                    control={control}
                    placeholder="Select care schedule"
                    options={schedules}
                    error={errors.schedule?.message}
                  />
                </View>
                
                {/* Description */}
                <View>
                  <Text style={tw`medical-text text-base font-semibold mb-2`}>
                    Description / Bio {selectedCondition === 'Other' && '(Required)'}
                  </Text>
                  <FormTextInput
                    name="description"
                    control={control}
                    placeholder="Describe your condition or care needs"
                    multiline
                    error={selectedCondition === 'Other' ? errors.description?.message : undefined}
                  />
                </View>
                
                {/* Special Requirements */}
                <View>
                  <Text style={tw`medical-text text-base font-semibold mb-2`}>
                    Special Requirements (Optional)
                  </Text>
                  <FormTextInput
                    name="special"
                    control={control}
                    placeholder="Any special care requirements or preferences"
                    multiline
                    error={errors.special?.message}
                  />
                </View>
              </View>
            </View>

            {/* Save Button */}
            <Button
              text="Save Medical Info"
              onPress={onSubmit}
              style={tw`mb-6`}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default MedicalInfoProfileScreen; 