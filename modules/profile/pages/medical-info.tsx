import BlurredCircles from '@/components/blurred-circles';
import { Select } from '@/components/ui';
import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import { z } from 'zod';
import { ProfileInput } from '../components/profile-input';

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
    <View style={tw`flex-1 bg-medical-neutral`}>
      <BlurredCircles />
      
      <ScrollView style={tw`flex-1`}>
        <View style={tw`container mt-4`}>
          {/* Form Section */}
          <Text style={tw`medical-text text-xl font-semibold mb-4`}>Health Information</Text>
          <View style={tw`medical-card p-6 mb-6`}>
            <View style={tw`gap-6`}>
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
                <ProfileInput
                  name="description"
                  label=""
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
                <ProfileInput
                  name="special"
                  label=""
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
  );
};

export default MedicalInfoProfileScreen; 