import PhotoPickerSheet from '@/components/PhotoPickerSheet';
import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import { useUserStore } from '@/stores/user-store';
import { getFormErrorMessage } from '@/utils/form';
import showToast from '@/utils/toast';
import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Image, KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native';
import DateInput from '../components/date-input';
import { ProfileInput } from '../components/profile-input';
import ProfileLayout from '../components/profile-layout';
import { placeholderProfileImage, profileInputs, profileSchema } from '../data';
import { updateProfile, uploadProfilePhoto } from '../profile-service';

const PersonalInfoProfileScreen = () => {
  const user = useUserStore(s => s.user);
  const loadProfile = useUserStore(s => s.loadProfile);
  const updateUser = useUserStore(s => s.updateUser);

  const [image, setImage] = useState<string | null>(user?.photoUrl || null);

  useEffect(() => {
    setImage(user?.photoUrl || null);
  }, [user?.photoUrl]);

  const [sheetVisible, setSheetVisible] = useState(false);
  useEffect(() => {
    loadProfile();
  }, []);

  const [showDatePicker, setShowDatePicker] = useState(false);

const defaultValues= {
      name: user?.fullname || '',
      contactNumber: user?.contact,
      dateOfBirth: user?.dateOfBirth?new Date(user?.dateOfBirth):undefined,
      location: user?.location
    };

    console.log("VALS",defaultValues)
    console.log("PROFILE",user)

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues
  });

  const handleUpload = () => setSheetVisible(true);
  const handleClose = () => setSheetVisible(false);

  const handleImageSelected = async (uri: string) => {
    try {
      // Upload the image and set the returned URL
      const url = await uploadProfilePhoto(uri);
      console.log("IMAGURL", url);
      setImage(url);
      updateUser({photoUrl:url});

      showToast.success('Profile photo updated!');
      // Only update user with fields that exist on User type
    } catch (error) {
      Alert.alert('Error', 'Failed to upload photo.');
    }
  };

  const onSubmit = handleSubmit(
    async (data) => {
      // Only send profile info, not photo URL

      try {
        const {user:updatedUser} = await updateProfile({
          fullname: data?.name,
          contact: data?.contactNumber,
          dateOfBirth: data?.dateOfBirth,
          location: data?.location,
        });

        console.log("UPDATED PROFILE",updateProfile)
        updateUser(updatedUser);
        //updateUser(updatedUser);

        showToast.success('Profile updated!', 'Your changes have been saved.');
        if(user?.role==='caregiver'){
            if(!user.caregiver?.verified)
        }else{

        }
        router.push('/profile');
      } catch (error) {
        showToast.error('Error', 'Failed to update profile.');
      }
    },
    (error) => {
      console.log(user);
      const errormsg = getFormErrorMessage(error, 'Unable to update profile');
      showToast.error(errormsg);
    }
  );

  const additionalTopContent = useMemo(()=>
    <TouchableOpacity style={tw`relative`} onPress={handleUpload}>
      <Image
        source={image ? { uri: image } : placeholderProfileImage}
        style={tw`rounded-full w-[130px] h-[130px] `}
      />

      <View style={tw`absolute bottom-[13px] right-[-8px] w-[36px] h-[36px] rounded-full bg-soft items-center justify-center `}>
        <MaterialIcons name="photo-camera" size={20} color="#fff" />
      </View>
    </TouchableOpacity>
  ,[image]);

  return (
    <ProfileLayout
      heading="Setup Your Profile"
      title="Profile"
      subtext="Update your profile to connect your patient with better impression"
      additionalTopContent={additionalTopContent}
    >
      <PhotoPickerSheet
        visible={sheetVisible}
        onSelected={handleImageSelected}
        onClose={handleClose}
      />
      <KeyboardAvoidingView behavior='padding'>
        <View style={tw`container py-3.5`}>
          <Text style={tw`font-medium text-lg text-dark pb-3`}>Personal Information</Text>
          {profileInputs.map(input =>
            input.name === 'dateOfBirth' ? (
              <DateInput
                key={input.name}
                name={input.name}
                label={input.label}
                placeholder={input.placeholder}
                control={control}
                error={(errors as any)[input.name]?.message}
              />
            ) : (
              <ProfileInput
                key={input.name}
                name={input.name}
                label={input.label}
                placeholder={input.placeholder}
                control={control}
                error={(errors as any)[input.name]?.message}
              />
            )
          )}
          <Button
            text="Save Changes"
            onPress={onSubmit}
            style={tw`mt-8 bg-good`}
          />
        </View>
      </KeyboardAvoidingView>
    </ProfileLayout>
  );
};

export default PersonalInfoProfileScreen; 