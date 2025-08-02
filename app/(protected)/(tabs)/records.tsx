import BlurredCircles from '@/components/blurred-circles';
import tw from '@/lib/tailwind';
import { useUserStore } from '@/stores/user-store';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface MedicalRecord {
  id: string;
  title: string;
  images: string[];
  date: string;
  description?: string;
}

const MedicalRecordsScreen = () => {
  const user = useUserStore(s => s.user);
  
  // Mock data - in real app this would come from API/store
  const records: MedicalRecord[] = [
    {
      id: '1',
      title: 'Blood Test Results',
      images: ['https://via.placeholder.com/150'],
      date: '2024-01-15',
      description: 'Annual blood work results'
    },
    {
      id: '2',
      title: 'X-Ray Report',
      images: ['https://via.placeholder.com/150'],
      date: '2024-01-10',
      description: 'Chest X-ray examination'
    }
  ];

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
                View your health documentation
              </Text>
            </View>
            <TouchableOpacity
              style={tw`bg-medical-primary rounded-full p-3`}
              onPress={() => router.push('/add-records' as any)}
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
              <TouchableOpacity
                style={tw`bg-medical-primary rounded-lg px-6 py-3 mt-4`}
                onPress={() => router.push('/add-records' as any)}
              >
                <Text style={tw`text-white font-medium text-center`}>Add First Record</Text>
              </TouchableOpacity>
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
    </View>
  );
};

export default MedicalRecordsScreen; 