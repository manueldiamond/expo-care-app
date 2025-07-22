import { FormTextInput, Select } from '@/components/ui';
import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { z } from 'zod';
import ProfileLayout from '../components/profile-layout';

const conditions = [
  { label: 'Cancer', value: 'Cancer' },
  { label: 'Stroke', value: 'Stroke' },
  { label: 'Dementia', value: 'Dementia' },
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
    alert('Saved!');
  });

  return (
    <ProfileLayout
      title="Medical Information"
    >
      <View style={tw`container py-3.5`}> 
        <Text style={tw`font-medium text-lg text-dark pb-3`}>Condition</Text>
        <View style={tw`mb-3`}>
          <Select
            name="condition"
            control={control}
            placeholder="Select condition"
            options={conditions}
            error={errors.condition?.message}
          />
        </View>
        
        <Text style={tw`font-medium text-lg text-dark pb-3`}>Years with Condition</Text>
        <View style={tw`mb-3`}>
          <Select
            name="years"
            control={control}
            placeholder="Select years"
            options={years}
            error={errors.years?.message}
          />
        </View>
        
        <Text style={tw`font-medium text-lg text-dark pb-3`}>Care Schedule</Text>
        <View style={tw`mb-3`}>
          <Select
            name="schedule"
            control={control}
            placeholder="Select schedule"
            options={schedules}
            error={errors.schedule?.message}
          />
        </View>
        
        <Text style={tw`font-medium text-lg text-dark pb-3`}>Description / Bio (optional)</Text>
        <View style={tw`mb-3`}>
          <FormTextInput
            name="description"
            control={control}
            placeholder="Describe your condition or care needs"
            multiline
            error={selectedCondition === 'Other' ? errors.description?.message : undefined}
          />
        </View>
        
        <Text style={tw`font-medium text-lg text-dark pb-3`}>Special Requirements (optional)</Text>
        <View style={tw`mb-3`}>
          <FormTextInput
            name="special"
            control={control}
            placeholder="Any special requirements?"
            multiline
          />
        </View>
        
        <Button text="Save Medical Info" onPress={onSubmit} style={tw`mt-8 bg-good`} />
      </View>
    </ProfileLayout>
  );
};

export default MedicalInfoProfileScreen; 