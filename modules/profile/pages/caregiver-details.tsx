import BlurredCircles from '@/components/blurred-circles';
import BottomSheet from '@/components/bottom-sheet';
import PhotoPickerSheet from '@/components/PhotoPickerSheet';
import { Select } from '@/components/ui';
import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ProfileInput } from '../components/profile-input';
import { caregiverInputs, caregiverSchema, specializations, workSchedules } from '../data';

interface Qualification {
  id: string;
  title: string;
  images: string[];
}

const CaregiverDetailsScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(caregiverSchema),
  });
  
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [qualificationSheetVisible, setQualificationSheetVisible] = useState(false);
  const [qualificationTitle, setQualificationTitle] = useState('');
  const [selectedQualificationImages, setSelectedQualificationImages] = useState<string[]>([]);
  const [photoPickerVisible, setPhotoPickerVisible] = useState(false);
  const router = useRouter();
  const {next, setup} = useLocalSearchParams();

  const onSubmit = handleSubmit((data) => {
    console.log('Caregiver details:', data);
    Alert.alert('Success', 'Caregiver details saved successfully');
    
    // Handle navigation based on setup flag
    if (setup === 'true') {
      // In setup mode, navigate to identity verification
      router.push('/profile/identity-verification?setup=true');
    } else if (next) {
      // Manual navigation with next parameter
      router.push(next as any);
    } else {
      router.push('/profile');
    }
  });

  const handleAddQualification = () => {
    setQualificationSheetVisible(true);
  };

  const handleQualificationImageSelected = (uri: string) => {
    setSelectedQualificationImages([...selectedQualificationImages, uri]);
  };

  const handleSaveQualification = () => {
    if (!qualificationTitle.trim()) {
      Alert.alert('Error', 'Please enter a title for the qualification');
      return;
    }

    const newQualification: Qualification = {
      id: Date.now().toString(),
      title: qualificationTitle,
      images: selectedQualificationImages,
    };

    setQualifications([...qualifications, newQualification]);
    setQualificationTitle('');
    setSelectedQualificationImages([]);
    setQualificationSheetVisible(false);
  };

  const removeQualificationImage = (index: number) => {
    setSelectedQualificationImages(selectedQualificationImages.filter((_, i) => i !== index));
  };

  const handleViewQualification = (qualification: Qualification) => {
    // Navigate to qualification details page
    router.push({
      pathname: '/profile/qualification-details' as any,
      params: { qualification: JSON.stringify(qualification) }
    });
  };

  const renderInput = (input: any) => {
    const isSelectInput = input.type === 'select';
    
    if (isSelectInput) {
      const options = input.name === 'workSchedule' ? workSchedules : specializations;
      return (
        <Select
          key={input.name}
          name={input.name}
          control={control}
          placeholder={input.placeholder}
          options={options}
          error={(errors as any)[input.name]?.message}
        />
      );
    }

    return (
      <ProfileInput
        key={input.name}
        name={input.name}
        label=""
        control={control}
        placeholder={input.placeholder}
        multiline={input.type === 'textarea'}
        error={(errors as any)[input.name]?.message}
      />
    );
  };

  return (
    <View style={tw`flex-1 bg-medical-neutral`}>
      <BlurredCircles />
      
      <ScrollView style={tw`flex-1`}>
        <View style={tw`container mt-4`}>
          {/* Basic Information */}
          <Text style={tw`medical-text text-xl font-semibold mb-4`}>Basic Information</Text>
          <View style={tw`medical-card p-6 mb-6`}>
            <View style={tw`gap-6`}>
              {caregiverInputs.slice(0, 3).map((input) => (
                <View key={input.name}>
                  <Text style={tw`medical-text text-base font-semibold mb-2`}>{input.label}</Text>
                  {renderInput(input)}
                </View>
              ))}
            </View>
          </View>

          {/* Qualifications */}
          <Text style={tw`medical-text text-xl font-semibold mb-4`}>Qualifications</Text>
          <View style={tw`medical-card p-6 mb-6`}>
            {qualifications.length === 0 ? (
              <TouchableOpacity
                style={tw`border-2 border-dashed border-medical-border rounded-lg p-8 items-center`}
                onPress={handleAddQualification}
              >
                <MaterialIcons 
                  name="add" 
                  size={48} 
                  color={tw.color('medical-text-light')} 
                />
                <Text style={tw`medical-text text-base font-semibold mt-2`}>
                  Add
                </Text>
                <Text style={tw`medical-text-light text-sm font-normal text-center mt-1`}>
                  No qualifications yet
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={tw`gap-3`}>
                {qualifications.map((qual, index) => (
                  <TouchableOpacity
                    key={qual.id}
                    style={tw`bg-medical-neutral rounded-lg p-4 flex-row items-center justify-between`}
                    onPress={() => handleViewQualification(qual)}
                    activeOpacity={0.7}
                  >
                    <View style={tw`flex-1`}>
                      <Text style={tw`medical-text text-base font-semibold`}>{qual.title}</Text>
                      {qual.images.length > 0 && (
                        <Text style={tw`medical-text-light text-xs font-normal mt-1`}>
                          {qual.images.length} image{qual.images.length !== 1 ? 's' : ''}
                        </Text>
                      )}
                    </View>
                    <MaterialIcons 
                      name="chevron-right" 
                      size={24} 
                      color={tw.color('medical-text-light')} 
                    />
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={tw`bg-medical-primary rounded-lg px-4 py-3 items-center`}
                  onPress={handleAddQualification}
                >
                  <Text style={tw`text-white font-medium`}>Add Another Qualification</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Save Button */}
          <Button 
            text={setup === 'true' ? "Next Step" : "Save Details"} 
            onPress={onSubmit}
            style={tw`mb-6`}
          />
        </View>
      </ScrollView>

      {/* Add Qualification Bottom Sheet */}
      <BottomSheet visible={qualificationSheetVisible} onClose={() => setQualificationSheetVisible(false)}>
        <View style={tw`container pt-2 pb-10 flex-col gap-4`}>
          <Text style={tw`text-xl font-bold text-center text-medical-text`}>Add Qualification</Text>
          
          {/* Title Input */}
          <View>
            <Text style={tw`medical-text text-base font-semibold mb-2`}>Qualification Title</Text>
            <TextInput
              style={tw`bg-medical-neutral rounded-lg px-4 py-3 text-medical-text font-normal`}
              placeholder="Enter qualification title"
              placeholderTextColor={tw.color('medical-text-light')}
              value={qualificationTitle}
              onChangeText={setQualificationTitle}
            />
          </View>

          {/* Image Upload */}
          <View>
            <Text style={tw`medical-text text-base font-semibold mb-2`}>Upload Images (Optional)</Text>
            
            {selectedQualificationImages.length === 0 ? (
              <TouchableOpacity
                style={tw`border-2 border-dashed border-medical-border rounded-lg p-6 items-center`}
                onPress={() => setPhotoPickerVisible(true)}
              >
                <MaterialIcons 
                  name="add-photo-alternate" 
                  size={32} 
                  color={tw.color('medical-text-light')} 
                />
                <Text style={tw`medical-text text-sm font-semibold mt-2`}>
                  Add Images
                </Text>
                <Text style={tw`medical-text-light text-xs font-normal text-center mt-1`}>
                  Optional: Add images of certificates or documents
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                <View style={tw`flex-row flex-wrap gap-2 mb-4`}>
                  {selectedQualificationImages.map((uri, index) => (
                    <View key={index} style={tw`relative`}>
                      <Image source={{ uri }} style={tw`w-16 h-16 rounded-lg`} />
                      <TouchableOpacity
                        style={tw`absolute -top-2 -right-2 bg-medical-error rounded-full w-6 h-6 items-center justify-center`}
                        onPress={() => removeQualificationImage(index)}
                      >
                        <MaterialIcons name="close" size={16} color="white" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
                <TouchableOpacity
                  style={tw`flex-row items-center justify-center py-3`}
                  onPress={() => setPhotoPickerVisible(true)}
                >
                  <MaterialIcons name="add" size={16} color={tw.color('medical-primary')} />
                  <Text style={tw`ml-2 text-medical-primary font-semibold`}>Add more images</Text>
                </TouchableOpacity>
                
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={tw`container flex-col-reverse h-max gap-3 mt-4`}>
            <Button
              text="Cancel"
              onPress={() => setQualificationSheetVisible(false)}
              ghost
            />
            <Button
              text="Save Qualification"
              onPress={handleSaveQualification}
            />
          </View>
        </View>
      </BottomSheet>

      {/* Photo Picker Sheet */}
      <PhotoPickerSheet
        visible={photoPickerVisible}
        onSelected={handleQualificationImageSelected}
        onClose={() => setPhotoPickerVisible(false)}
        buttonLabels={{
          camera: 'Take Photo',
          gallery: 'Choose from Gallery',
          cancel: 'Cancel'
        }}
      />
    </View>
  );
};

export default CaregiverDetailsScreen; 