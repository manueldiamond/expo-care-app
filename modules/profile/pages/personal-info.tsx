import BlurredCircles from '@/components/blurred-circles';
import PhotoPickerSheet from '@/components/PhotoPickerSheet';
import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import { useUserStore } from '@/stores/user-store';
import { getFormErrorMessage } from '@/utils/form';
import showToast from '@/utils/toast';
import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import DateInput from '../components/date-input';
import { ProfileInput } from '../components/profile-input';
import { placeholderProfileImage, profileSchema } from '../data';
import { updateProfile, uploadProfilePhoto } from '../profile-service';

const PersonalInfoProfileScreen = () => {
  const user = useUserStore(s => s.user);
  const loadProfile = useUserStore(s => s.loadProfile);
  const updateUser = useUserStore(s => s.updateUser);

  const [image, setImage] = useState<string | null>(user?.photoUrl || null);
  const [sheetVisible, setSheetVisible] = useState(false);

  useEffect(() => {
    loadProfile();
    setImage(user?.photoUrl || null);
  }, [user?.photoUrl]);

  const defaultValues = {
    name: user?.fullname || '',
    contactNumber: user?.contact || '',
    dateOfBirth: user?.dateOfBirth ? new Date(user?.dateOfBirth) : undefined,
    location: user?.location || ''
  };

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues
  });

  const handleUpload = () => setSheetVisible(true);
  const handleClose = () => setSheetVisible(false);

  const handleImageSelected = async (uri: string) => {
    try {
      const url = await uploadProfilePhoto(uri);
      setImage(url);
      updateUser({ photoUrl: url });
      showToast.success('Profile photo updated!');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload photo.');
    }
  };

  const onSubmit = handleSubmit(
    async (data) => {
      try {
        const { user: updatedUser } = await updateProfile({
          fullname: data?.name,
          contact: data?.contactNumber,
          dateOfBirth: data?.dateOfBirth,
          location: data?.location,
        });

        updateUser(updatedUser);
        showToast.success('Profile updated!', 'Your changes have been saved.');
        router.push('/profile');
      } catch (error) {
        showToast.error('Error', 'Failed to update profile.');
      }
    },
    (error) => {
      const errormsg = getFormErrorMessage(error, 'Unable to update profile');
      showToast.error('Validation Error', errormsg);
    }
  );

  return (
    <>
      <StatusBar hidden={false} backgroundColor={tw.color('medical-primary')} />
      <View style={tw`flex-1 bg-medical-neutral`}>
        <BlurredCircles />
        
        <KeyboardAvoidingView 
          style={tw`flex-1`} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView 
            style={tw`flex-1`}
            contentContainerStyle={tw`pb-20`}
            showsVerticalScrollIndicator={false}
          >
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
                      <Text style={tw`text-white text-2xl font-bold`}>Personal Information</Text>
                      <Text style={tw`text-white/80 text-sm font-normal`}>
                        Update your basic details
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Profile Photo Card */}
                <View style={tw`medical-card p-4`}>
                  <View style={tw`items-center`}>
                    <TouchableOpacity onPress={handleUpload} style={tw`relative`}>
                      <Image
                        source={image ? { uri: image } : placeholderProfileImage}
                        style={tw`w-24 h-24 rounded-full border-4 border-white`}
                      />
                      <View style={tw`absolute bottom-0 right-0 bg-medical-primary rounded-full p-2`}>
                        <MaterialIcons name="camera-alt" size={20} color="white" />
                      </View>
                    </TouchableOpacity>
                    <Text style={tw`medical-text text-base font-semibold mt-3`}>
                      {user?.fullname || 'Your Name'}
                    </Text>
                    <Text style={tw`medical-text-light text-sm font-normal`}>
                      Tap to change photo
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={tw`container mt-4`}>
              {/* Form Section */}
              <Text style={tw`medical-text text-xl font-semibold mb-4`}>Basic Information</Text>
              <View style={tw`medical-card p-6 mb-6`}>
                <View style={tw`space-y-6`}>
                  <View>
                    <Text style={tw`medical-text text-base font-semibold mb-2`}>Full Name</Text>
                    <ProfileInput
                      name="name"
                      label=""
                      control={control}
                      placeholder="Enter your full name"
                      error={errors.name?.message}
                    />
                  </View>

                  <View>
                    <Text style={tw`medical-text text-base font-semibold mb-2`}>Contact Number</Text>
                    <ProfileInput
                      name="contactNumber"
                      label=""
                      control={control}
                      placeholder="Enter your phone number"
                      error={errors.contactNumber?.message}
                    />
                  </View>

                  <View>
                    <Text style={tw`medical-text text-base font-semibold mb-2`}>Date of Birth</Text>
                    <DateInput
                      name="dateOfBirth"
                      label=""
                      control={control}
                      placeholder="Select your date of birth"
                      error={errors.dateOfBirth?.message}
                    />
                  </View>

                  <View>
                    <Text style={tw`medical-text text-base font-semibold mb-2`}>Location</Text>
                    <ProfileInput
                      name="location"
                      label=""
                      control={control}
                      placeholder="Enter your location"
                      error={errors.location?.message}
                    />
                  </View>
                </View>
              </View>

              {/* Save Button */}
              <Button
                text="Save Changes"
                onPress={onSubmit}
                style={tw`mb-6`}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <PhotoPickerSheet
          visible={sheetVisible}
          onSelected={handleImageSelected}
          onClose={handleClose}
          buttonLabels={{
            camera: 'Take Photo',
            gallery: 'Choose from Gallery',
            cancel: 'Cancel'
          }}
        />
      </View>
    </>
  );
};

export default PersonalInfoProfileScreen; 