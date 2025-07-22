import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const records = [
  {
    id: '1',
    patientName: 'Elizabeth Makeey',
    type: 'Medical Report',
    date: '2024-01-15',
    status: 'Completed',
    icon: 'description',
    color: '#4C4DDC',
  },
  {
    id: '2',
    patientName: 'John Smith',
    type: 'Lab Results',
    date: '2024-01-14',
    status: 'Pending',
    icon: 'science',
    color: '#F59E42',
  },
  {
    id: '3',
    patientName: 'Sarah Johnson',
    type: 'Prescription',
    date: '2024-01-13',
    status: 'Completed',
    icon: 'local-pharmacy',
    color: '#34A853',
  },
  {
    id: '4',
    patientName: 'Michael Brown',
    type: 'X-Ray Report',
    date: '2024-01-12',
    status: 'In Progress',
    icon: 'healing',
    color: '#E91E63',
  },
];

const RecordsScreen = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return '#34A853';
      case 'Pending':
        return '#F59E42';
      case 'In Progress':
        return '#4C4DDC';
      default:
        return '#6B7280';
    }
  };

  return (
    <>
      <StatusBar hidden={false} />
      <View style={tw`flex-1 bg-[#F9F8F8]`}>
        {/* Header */}
        <View style={tw`bg-good rounded-b-[30px] pb-6`}>
          <View style={tw`container pt-12 pb-4`}>
            <View style={tw`flex-row items-center justify-between`}>
              <View>
                <Text style={tw`text-white text-2xl font-bold`}>Medical Records</Text>
                <Text style={tw`text-white/80 text-sm`}>
                  {records.length} records available
                </Text>
              </View>
              <TouchableOpacity
                style={tw`bg-white/20 rounded-full p-2`}
                onPress={() => router.push('/add-record' as any)}
              >
                <MaterialIcons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView style={tw`flex-1 container mt-6`}>
          {/* Search and Filter */}
          <View style={tw`bg-white rounded-lg p-4 mb-6 shadow-sm`}>
            <View style={tw`flex-row items-center justify-between`}>
              <View style={tw`flex-row items-center flex-1`}>
                <MaterialIcons name="search" size={20} color={tw.color('soft')} />
                <Text style={tw`text-soft ml-2 flex-1`}>Search records...</Text>
              </View>
              <TouchableOpacity>
                <MaterialIcons name="filter-list" size={20} color={tw.color('soft')} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Records List */}
          {records.map((record) => (
            <TouchableOpacity
              key={record.id}
              style={tw`bg-white rounded-lg p-4 mb-4 shadow-sm`}
              onPress={() => router.push(`/record/${record.id}` as any)}
            >
              <View style={tw`flex-row items-center gap-3`}>
                <View 
                  style={[tw`w-12 h-12 rounded-lg items-center justify-center`, { backgroundColor: record.color + '20' }]}
                >
                  <MaterialIcons name={record.icon as any} size={24} color={record.color} />
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-lg font-medium text-dark`}>{record.type}</Text>
                  <Text style={tw`text-sm text-soft`}>{record.patientName}</Text>
                  <Text style={tw`text-xs text-soft`}>{record.date}</Text>
                </View>
                <View style={tw`items-end`}>
                  <View 
                    style={[tw`px-2 py-1 rounded-full`, { backgroundColor: getStatusColor(record.status) + '20' }]}
                  >
                    <Text 
                      style={[tw`text-xs font-medium`, { color: getStatusColor(record.status) }]}
                    >
                      {record.status}
                    </Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={20} color={tw.color('soft')} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default RecordsScreen; 