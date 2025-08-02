import BackHeader from '@/components/back-header';
import BlurredCircles from '@/components/blurred-circles';
import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import { getFormErrorMessage } from '@/utils/form';
import showToast from '@/utils/toast';
import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Image, KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native';
import { ProfileInput } from '../components/profile-input';
import { placeholderProfileImage, profileInputs, profileSchema } from '../data';

const PersonalInfoProfileScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = handleSubmit(
    (data) => {
      showToast.success('Profile updated!', 'Your changes have been saved.');
    },
    (error) => {
      const errormsg = getFormErrorMessage(error,'An error occurred while saving changes');
      showToast.error(errormsg);
    }
  );

  return (
    <View style={tw`flex-1 bg-[#F9F8F8]`}>
      <BlurredCircles/>
        <View style={tw` bg-good w-full rounded-b-[30px]`}>
          <BackHeader title='Personal Information' titleStyle={tw`text-light`} />
      <View style={tw`py-[30px] centered container`}>
          <Text style={tw`text-base text-light font-medium`}>Setup Your Profile</Text>
          <Text style={tw`text-sm text-center text-light leading-[1.68] mt-2.5 mb-5`}>
            Update your profile to connect your patient with better impression
          </Text>
          <View style={tw`relative`}>
            <Image
              source={placeholderProfileImage}
              style={tw`rounded-full w-[130px] h-[130px] `}
            />
            <TouchableOpacity
              style={tw`absolute bottom-[13px] right-[-8px] w-[36px] h-[36px] rounded-full bg-soft items-center justify-center`}
            >
              <MaterialIcons name="photo-camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <KeyboardAvoidingView behavior='padding'>
      <View style={tw`container py-3.5`}>
        <Text style={tw`font-medium text-lg text-dark pb-3`}>Personal Information</Text>
        {profileInputs.map(input => (
          <ProfileInput
            key={input.name}
            name={input.name}
            label={input.label}
            placeholder={input.placeholder}
            control={control}
            error={(errors as any)[input.name]?.message}
          />
        ))}
        <Button
          text="Save Changes"
          onPress={onSubmit}
          style={tw`mt-8 bg-good`}
        />
      </View>
</KeyboardAvoidingView>
    </View>
  );
};

export default PersonalInfoProfileScreen; 