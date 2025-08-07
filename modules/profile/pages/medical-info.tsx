import BlurredCircles from '@/components/blurred-circles';
import { Select } from '@/components/ui';
import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import { useUserStore } from '@/stores/user-store';
import { User } from '@/types';
import { extractApiError } from '@/utils/api-error';
import { showToast } from '@/utils/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import { ProfileInput } from '../components/profile-input';
import { conditions, schedules, schema, years } from '../data';
import { updatePatientProfile } from '../profile-service';

const MedicalInfoProfileScreen = () => {
  const user=useUserStore((state)=>state.user);
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues:{
      condition:user?.patient?.condition,
      years:user?.patient?.years,
      schedule:user?.patient?.schedule,
      description:user?.patient?.description!,
      special:user?.patient?.special!,
    }
  });
  
  const selectedCondition = watch('condition');
  const {next, setup} = useLocalSearchParams();
  const router = useRouter();

  const setUser = useUserStore((state)=>state.updateUser);
  const onSubmit = handleSubmit(async(data) => {
    try{
    console.log('Medical Info Data:', data);
    
    await updatePatientProfile({
      condition: data.condition,
      years: data.years,
      schedule: data.schedule,
      description: data.description!,
      special: data.special!,
    });

    setUser({...user,patient:{...user?.patient,...data}} as User)

    showToast.success('Medical information updated successfully');
    
    router.push((next as any)||'/home');
  }catch(e){
    showToast.error(extractApiError(e,'Error updating medical info'))
  }
  });



  return (
    <View style={tw`flex-1 bg-medical-neutral`}>
      <BlurredCircles />
      <KeyboardAvoidingView style={tw`flex-1`} behavior='padding'>
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
            text={setup === 'true' ? "Next Step" : "Save Medical Info"} 
            onPress={onSubmit}
            style={tw`mb-6`}
          />
        </View>
      </ScrollView>
  </KeyboardAvoidingView>
    </View>
  );
};

export default MedicalInfoProfileScreen; 