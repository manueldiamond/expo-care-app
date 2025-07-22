import PhotoPickerSheet from '@/components/PhotoPickerSheet';
import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import ProfileLayout from '../components/profile-layout';

const IdentityVerificationProfileScreen = () => {
  const [sheetVisible, setSheetVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleUpload = () => setSheetVisible(true);
  const handleClose = () => setSheetVisible(false);
  const handleImageSelected = (uri: string) => setImage(uri);

  const additionalTopContent = (
    <TouchableOpacity
      style={tw`relative`}
      onPress={handleUpload}
    >
      <View style={tw`rounded-full w-[130px] h-[130px] bg-white centered mb-2`}>
        {image ? (
          <Image source={{ uri: image }} style={tw`w-[130px] h-[130px] rounded-full`} />
        ) : (
          <MaterialIcons name="photo-camera" size={40} color={tw.color('soft')} />
        )}
      </View>
      <Text style={tw`text-center text-good font-medium`}>
        {image ? 'Change Photo' : 'Upload or Take Photo'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ProfileLayout
      heading="Verify Your Identity"
      title="Identity Verification"
      subtext="In order to be listed and offer care services, you will need to verify your identity with your GhanaCard."
      additionalTopContent={additionalTopContent}
    >
      <PhotoPickerSheet
        visible={sheetVisible}
        onSelected={handleImageSelected}
        onClose={handleClose}
      />
      {image && (
        <View style={tw`container mt-8`}>
          <Button
            text="Submit for Verification"
            onPress={() => {
              Alert.alert('Success', 'Your identity verification has been submitted for review.');
            }}
            style={tw`bg-good`}
          />
        </View>
      )}
    </ProfileLayout>
  );
};

export default IdentityVerificationProfileScreen; 