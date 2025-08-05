import BlurredCircles from '@/components/blurred-circles';
import { Section } from '@/components/global/Section';
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
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ProfileInput } from '../components/profile-input';
import { caregiverDetailsSchema, caregiverTypes, educationLevels, workSchedules } from '../data';
import { updateCaregiverProfile } from '../profile-service';

const CaregiverDetailsScreen = () => {

  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  const caregiver = user?.caregiver;

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(caregiverDetailsSchema),
    defaultValues: {
      schedule: caregiver?.schedule|| '',
      type: caregiver?.type || '',
      educationLevel: caregiver?.educationLevel || '',
      bio: caregiver?.bio || '',
    }
  });
  const router = useRouter();
  const { next, setup } = useLocalSearchParams();
  
  // Watch the type field to conditionally show qualifications and education
  const selectedType = watch('type');

  const onSubmit = handleSubmit(async (data) => {
    try {
      
      const updatedCaregiver=await updateCaregiverProfile({
        schedule: data.schedule,
        type: data.type,
        educationLevel: data.educationLevel,
        bio: data.bio,
      });
      setUser({...user,caregiver:updatedCaregiver} as User)
      showToast.success('Caregiver details updated successfully');
      
      // Handle navigation based on setup flag
      if (setup === 'true') {
        // In setup mode, navigate to identity verification
        router.push('/profile/identity-verification?setup=true');
      } else if (next) {
        // Manual navigation with next parameter
        router.push(next as any);
      } else {
        router.push('/home');
      }
    } catch (error) {
      showToast.error(extractApiError(error, 'Error updating caregiver details'));
    }
  });

  const handleManageQualifications = () => {
    router.push('/pages/caregiver/qualifications' as any);
  };

  return (
    <View style={tw`flex-1 bg-medical-neutral`}>
      <BlurredCircles />
      
      <ScrollView style={tw`flex-1`}>
        <View style={tw`container mt-4`}>
          {/* Single Section - Caregiver Details */}
          <Section title="Caregiver Details">
            <View style={tw`gap-6`}>
              {/* Type */}
              <View>
                <Text style={tw`medical-text text-base font-semibold mb-2`}>Professional Type</Text>
                <Select
                  name="type"
                  control={control}
                  placeholder="Select your professional type"
                  options={caregiverTypes}
                  error={errors.type?.message}
                />
              </View>

              {/* Education Level - Only show if type is not "individual" */}
              {selectedType && selectedType === 'individual' && (
                <View>
                  <Text style={tw`medical-text text-base font-semibold mb-2`}>Education Level</Text>
                  <Select
                    name="educationLevel"
                    control={control}
                    placeholder="Select your education level"
                    options={educationLevels}
                    error={errors.educationLevel?.message}
                  />
                </View>
              )}

              {/* Work Schedule */}
              <View>
                <Text style={tw`medical-text text-base font-semibold mb-2`}>Work Schedule</Text>
                <Select
                  name="schedule"
                  control={control}
                  placeholder="Select your work schedule"
                  options={workSchedules}
                  error={errors.schedule?.message}
                />
              </View>

              {/* Bio */}
              <View>
                <Text style={tw`medical-text text-base font-semibold mb-2`}>Bio</Text>
                <ProfileInput
                  name="bio"
                  label=""
                  control={control}
                  placeholder="(Optional) About yourself, your experience, why you a caregiver..."
                  multiline={true}
                  numberOfLines={4}
                  error={errors.bio?.message}
                />
              </View>

              {/* Qualifications - Only show if type is not "individual" */}
              {selectedType && selectedType !== 'individual' && (
                <View>
                  <Text style={tw`medical-text text-base font-semibold mb-2`}>Qualifications</Text>
                  <Text style={tw`medical-text-light text-sm font-normal mb-3`}>
                    Manage your professional qualifications and certifications
                  </Text>
                  <TouchableOpacity
                    style={tw`bg-medical-primary rounded-lg px-4 py-3 items-center`}
                    onPress={handleManageQualifications}
                  >
                    <Text style={tw`text-white font-medium`}>Manage Qualifications</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Section>

          {/* Save Button */}
          <Button 
            text={setup === 'true' ? "Next Step" : "Save Details"} 
            onPress={onSubmit}
            style={tw`mb-6`}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CaregiverDetailsScreen; 