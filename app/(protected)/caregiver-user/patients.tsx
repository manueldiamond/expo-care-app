import tw from '@/lib/tailwind';
import { placeholderProfileImage } from '@/modules/profile/data';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const patients = [
  {
    id: '1',
    name: 'Elizabeth Makeey',
    condition: 'Lung Cancer',
    subText: '2 years',
    tags: ['87%', '6-9 months'],
    time: ['10:00', 'AM tomorrow'],
    bookmarked: false,
    image: placeholderProfileImage,
  },
  {
    id: '2',
    name: 'John Smith',
    condition: 'Diabetes',
    subText: '1 year',
    tags: ['92%', '3-6 months'],
    time: ['14:30', 'PM today'],
    bookmarked: true,
    image: placeholderProfileImage,
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    condition: 'Heart Disease',
    subText: '3 years',
    tags: ['78%', '9-12 months'],
    time: ['09:15', 'AM tomorrow'],
    bookmarked: false,
    image: placeholderProfileImage,
  },
];

const PatientsScreen = () => {
  return (
    <>
      <View style={tw`flex-1 bg-[#F9F8F8]`}>
        {/* Header */}
        <View style={tw`bg-good rounded-b-[30px] pb-6`}>
          <View style={tw`container pt-12 pb-4`}>
            <View style={tw`flex-row items-center justify-between`}>
              <View>
                <Text style={tw`text-light text-2xl font-bold`}>My Patients</Text>
                <Text style={tw`text-light/80 text-sm font-normal`}>
                  {patients.length} active patients
                </Text>
              </View>
              <TouchableOpacity
                style={tw`bg-white/20 rounded-full p-2`}
                onPress={() => router.push('/add-patient' as any)}
              >
                <MaterialIcons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView style={tw`flex-1 container mt-6`}>
          {/* Search Bar */}
          <View style={tw`bg-white rounded-lg p-4 mb-6 shadow-sm`}>
            <View style={tw`flex-row items-center`}>
              <MaterialIcons name="search" size={20} color={tw.color('soft')} />
              <Text style={tw`text-soft ml-2 flex-1 font-normal`}>Search patients...</Text>
            </View>
          </View>

          {/* Patients List */}
          {patients.map((patient) => (
            <View key={patient.id} style={tw`bg-white rounded-lg p-5 mb-4 shadow-sm`}>
              <View style={tw`flex-row items-start gap-3.5`}>
                <Image
                  source={patient.image}
                  style={tw`rounded-lg w-[92px] h-[92px]`}
                />
                <View style={tw`flex-1`}>
                  <Text style={tw`text-lg font-medium text-dark`}>{patient.name}</Text>
                  <Text style={tw`pt-0.5 text-good font-[400] text-sm`}>{patient.condition}</Text>
                  <Text style={tw`py-1 text-xs text-soft font-normal`}>{patient.subText}</Text>
                  <View style={tw`flex-row gap-[18px]`}>
                    {patient.tags.map((tag, index) => (
                      <View style={tw`flex-row items-center`} key={index}>
                        <View style={tw`w-2.5 h-2.5 rounded-full bg-good`} />
                        <Text style={tw`text-sm ml-1 font-normal`}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <TouchableOpacity style={tw`mt-1`}>
                  <FontAwesome 
                    name={patient.bookmarked ? "bookmark" : "bookmark-o"} 
                    color={patient.bookmarked ? 'red' : tw.color('soft')} 
                    size={20} 
                  />
                </TouchableOpacity>
              </View>
              <View style={tw`flex-row pt-4 justify-between items-center`}>
                <View>
                  <Text style={tw`text-sm text-good font-normal`}>Next Available</Text>
                  <View style={tw`flex-row items-center`}>
                    <Text style={tw`text-xs text-soft font-medium`}>{patient.time[0]}</Text>
                    <Text style={tw`text-xs ml-1 text-soft font-normal`}>{patient.time[1]}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={tw`bg-good rounded-lg px-4 py-2`}
                  onPress={() => router.push(`/patient/${patient.id}` as any)}
                >
                  <Text style={tw`text-light font-medium`}>View Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default PatientsScreen; 