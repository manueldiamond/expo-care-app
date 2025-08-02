import BlurredCircles from '@/components/blurred-circles';
import PhotoPickerSheet from '@/components/PhotoPickerSheet';
import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const AddRecordsScreen = () => {
  const [recordTitle, setRecordTitle] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [photoPickerVisible, setPhotoPickerVisible] = useState(false);

  const handleSaveRecord = () => {
    if (!recordTitle.trim()) {
      Alert.alert('Error', 'Please enter a title for the record');
      return;
    }
    if (selectedImages.length === 0) {
      Alert.alert('Error', 'Please select at least one image');
      return;
    }

    // TODO: Save record to API/store
    console.log('Saving record:', { title: recordTitle, images: selectedImages });
    Alert.alert('Success', 'Record saved successfully');
    
    // Reset form
    setRecordTitle('');
    setSelectedImages([]);
  };

  const handleImageSelected = (uri: string) => {
    setSelectedImages([...selectedImages, uri]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  return (
    <View style={tw`flex-1 bg-medical-neutral`}>
      <BlurredCircles />
      
      <ScrollView style={tw`flex-1`}>
        <View style={tw`container mt-4`}>
          {/* Header */}
          <View style={tw`mb-6`}>
            <Text style={tw`medical-text text-2xl font-bold`}>Add Medical Record</Text>
            <Text style={tw`medical-text-light text-sm font-normal`}>
              Upload images and add details for your medical record
            </Text>
          </View>

          {/* Form */}
          <View style={tw`medical-card p-6 mb-6`}>
            <View style={tw`gap-6`}>
              {/* Title Input */}
              <View>
                <Text style={tw`medical-text text-base font-semibold mb-2`}>Record Title</Text>
                <TextInput
                  style={tw`bg-medical-neutral rounded-lg px-4 py-3 text-medical-text font-normal`}
                  placeholder="Enter record title"
                  placeholderTextColor={tw.color('medical-text-light')}
                  value={recordTitle}
                  onChangeText={setRecordTitle}
                />
              </View>

              {/* Image Upload */}
              <View>
                <Text style={tw`medical-text text-base font-semibold mb-2`}>Upload Images</Text>
                
                {selectedImages.length === 0 ? (
                  <TouchableOpacity
                    style={tw`border-2 border-dashed border-medical-border rounded-lg p-8 items-center`}
                    onPress={() => setPhotoPickerVisible(true)}
                  >
                    <MaterialIcons 
                      name="add-photo-alternate" 
                      size={48} 
                      color={tw.color('medical-text-light')} 
                    />
                    <Text style={tw`medical-text text-base font-semibold mt-2`}>
                      Add Images
                    </Text>
                    <Text style={tw`medical-text-light text-sm font-normal text-center mt-1`}>
                      Tap to select images from camera or gallery
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View>
                    <View style={tw`flex-row flex-wrap gap-2 mb-4`}>
                      {selectedImages.map((uri, index) => (
                        <View key={index} style={tw`relative`}>
                          <Image source={{ uri }} style={tw`w-20 h-20 rounded-lg`} />
                          <TouchableOpacity
                            style={tw`absolute -top-2 -right-2 bg-medical-error rounded-full w-6 h-6 items-center justify-center`}
                            onPress={() => removeImage(index)}
                          >
                            <MaterialIcons name="close" size={16} color="white" />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                    <TouchableOpacity
                      style={tw`bg-medical-primary rounded-lg px-4 py-3 items-center`}
                      onPress={() => setPhotoPickerVisible(true)}
                    >
                      <Text style={tw`text-white font-medium`}>Add More Images</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Save Button */}
          <Button
            text="Save Record"
            onPress={handleSaveRecord}
            style={tw`mb-6`}
          />
        </View>
      </ScrollView>

      {/* Photo Picker Sheet */}
      <PhotoPickerSheet
        visible={photoPickerVisible}
        onSelected={handleImageSelected}
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

export default AddRecordsScreen; 