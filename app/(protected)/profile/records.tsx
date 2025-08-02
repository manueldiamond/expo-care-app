import BlurredCircles from '@/components/blurred-circles';
import BottomSheet from '@/components/bottom-sheet';
import PhotoPickerSheet from '@/components/PhotoPickerSheet';
import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import { useUserStore } from '@/stores/user-store';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface MedicalRecord {
  id: string;
  title: string;
  images: string[];
  date: string;
  description?: string;
}

const MedicalRecordsScreen = () => {
  const user = useUserStore(s => s.user);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [recordTitle, setRecordTitle] = useState('');

  const handleAddRecord = () => {
    setSheetVisible(true);
  };

  const handleImagesSelected = (uris: string[]) => {
    setSelectedImages(uris);
  };

  const handleSaveRecord = () => {
    if (!recordTitle.trim()) {
      Alert.alert('Error', 'Please enter a title for the record');
      return;
    }
    if (selectedImages.length === 0) {
      Alert.alert('Error', 'Please select at least one image');
      return;
    }

    const newRecord: MedicalRecord = {
      id: Date.now().toString(),
      title: recordTitle,
      images: selectedImages,
      date: new Date().toLocaleDateString(),
    };

    setRecords([newRecord, ...records]);
    setRecordTitle('');
    setSelectedImages([]);
    setSheetVisible(false);
  };

  const renderRecord = ({ item }: { item: MedicalRecord }) => (
    <TouchableOpacity
      style={tw`medical-card p-4 mb-4`}
      onPress={() => {
        // TODO: Navigate to record details
        console.log('View record:', item.id);
      }}
    >
      <View style={tw`flex-row items-center mb-3`}>
        <Image
          source={{ uri: item.images[0] }}
          style={tw`w-16 h-16 rounded-lg mr-4`}
        />
        <View style={tw`flex-1`}>
          <Text style={tw`medical-text text-base font-semibold`}>{item.title}</Text>
          <Text style={tw`medical-text-light text-sm font-normal`}>{item.date}</Text>
          <Text style={tw`medical-text-light text-xs font-normal`}>
            {item.images.length} image{item.images.length !== 1 ? 's' : ''}
          </Text>
        </View>
        <MaterialIcons 
          name="chevron-right" 
          size={24} 
          color={tw.color('medical-text-light')} 
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-medical-neutral`}>
      <BlurredCircles />
      
      <ScrollView style={tw`flex-1`}>
        <View style={tw`container mt-4`}>
          {/* Header */}
          <View style={tw`flex-row items-center justify-between mb-6`}>
            <View>
              <Text style={tw`medical-text text-2xl font-bold`}>Medical Records</Text>
              <Text style={tw`medical-text-light text-sm font-normal`}>
                Manage your health documentation
              </Text>
            </View>
            <TouchableOpacity
              style={tw`bg-medical-primary rounded-full p-3`}
              onPress={handleAddRecord}
            >
              <MaterialIcons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Records List */}
          {records.length === 0 ? (
            <View style={tw`medical-card p-8 items-center`}>
              <MaterialIcons 
                name="folder-open" 
                size={64} 
                color={tw.color('medical-text-light')} 
              />
              <Text style={tw`medical-text text-lg font-semibold mt-4`}>
                No Records Yet
              </Text>
              <Text style={tw`medical-text-light text-sm font-normal text-center mt-2`}>
                Start by adding your first medical record
              </Text>
              <Button
                text="Add First Record"
                onPress={handleAddRecord}
                style={tw`mt-4`}
              />
            </View>
          ) : (
            <FlatList
              data={records}
              renderItem={renderRecord}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>

      {/* Add Record Bottom Sheet */}
      <BottomSheet visible={sheetVisible} onClose={() => setSheetVisible(false)}>
        <View style={tw`container pt-2 pb-10 flex-col gap-4`}>
          <Text style={tw`text-xl font-bold text-center text-medical-text`}>Add Medical Record</Text>
          
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
            <PhotoPickerSheet
              visible={false}
              onSelected={(uri) => handleImagesSelected([...selectedImages, uri])}
              onClose={() => {}}
              buttonLabels={{
                camera: 'Take Photo',
                gallery: 'Choose from Gallery',
                cancel: 'Cancel'
              }}
            />
            {selectedImages.length > 0 && (
              <View style={tw`flex-row flex-wrap gap-2 mt-2`}>
                {selectedImages.map((uri, index) => (
                  <View key={index} style={tw`relative`}>
                    <Image source={{ uri }} style={tw`w-16 h-16 rounded-lg`} />
                    <TouchableOpacity
                      style={tw`absolute -top-2 -right-2 bg-medical-error rounded-full w-6 h-6 items-center justify-center`}
                      onPress={() => setSelectedImages(selectedImages.filter((_, i) => i !== index))}
                    >
                      <MaterialIcons name="close" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={tw`flex-row gap-3`}>
            <Button
              text="Cancel"
              onPress={() => setSheetVisible(false)}
              ghost
              style={tw`flex-1`}
            />
            <Button
              text="Save Record"
              onPress={handleSaveRecord}
              style={tw`flex-1`}
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default MedicalRecordsScreen; 