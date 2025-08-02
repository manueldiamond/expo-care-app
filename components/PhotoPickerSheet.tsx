import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from './bottom-sheet';
import Button from './ui/button';

interface PhotoPickerSheetProps {
  visible: boolean;
  onSelected: (uri: string) => void;
  onClose: () => void;
  buttonLabels?: {
    camera?: string;
    gallery?: string;
    cancel?: string;
  };
  quality?: number;
  aspectRatio?: [number, number];
}

const PhotoPickerSheet: React.FC<PhotoPickerSheetProps> = ({
  visible,
  onSelected,
  onClose,
  buttonLabels = {},
  quality = 0.8,
  aspectRatio = [1, 1],
}) => {
  const [loading, setLoading] = useState(false);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera and photo library permissions to upload images.');
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    setLoading(true);
    const hasPermission = await requestPermissions();
    if (!hasPermission) { setLoading(false); return; }
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: aspectRatio,
        quality,
      });
      if (!result.canceled && result.assets[0]) {
        onSelected(result.assets[0].uri);
        onClose();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
    setLoading(false);
  };

  const pickFromGallery = async () => {
    setLoading(true);
    const hasPermission = await requestPermissions();
    if (!hasPermission) { setLoading(false); return; }
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: aspectRatio,
        quality,
      });
      if (!result.canceled && result.assets[0]) {
        onSelected(result.assets[0].uri);
        onClose();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image from gallery. Please try again.');
    }
    setLoading(false);
  };

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View style={tw`container pt-2 pb-10 flex-col gap-4`}>
        <Text style={tw`text-xl font-bold text-center`}>Choose Option</Text>
        <View style={tw`flex-row justify-between gap-4 mt-2 mb-2`}>
          <TouchableOpacity
            style={tw`flex-1 flex-col items-center justify-center bg-good rounded-xl aspect-square mx-1`}
            onPress={takePhoto}
            activeOpacity={0.8}
          >
            <MaterialIcons name="photo-camera" size={44} color="#fff" style={tw`mb-2`} />
            <Text style={tw`text-light font-medium text-base text-center`}>
              {buttonLabels.camera || 'Photo'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-1 flex-col items-center justify-center bg-good rounded-xl aspect-square mx-1`}
            onPress={pickFromGallery}
            activeOpacity={0.8}
          >
            <MaterialIcons name="photo-library" size={44} color="#fff" style={tw`mb-2`} />
            <Text style={tw`text-light font-medium text-base text-center`}>
              {buttonLabels.gallery || 'Upload'}
            </Text>
          </TouchableOpacity>
        </View>
        <Button text={buttonLabels.cancel || 'Cancel'} ghost onPress={onClose} />
      </View>
    </BottomSheet>
  );
};

export default PhotoPickerSheet; 