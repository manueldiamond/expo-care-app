import tw from '@/lib/tailwind';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const BackHeader = ({ title = '', centralized = false }) => (
  <View style={tw`flex-row centered container py-4`}>
    <TouchableOpacity
      onPress={router.back}
      style={tw`bg-white rounded-lg w-[30px] h-[30px] centered`}
    >
      <Ionicons name="chevron-back" size={24} />
    </TouchableOpacity>
    <Text style={tw.style(
      `flex-1 text-lg ml-4 font-medium text-dark`,
      centralized && 'text-center',
    )}>{title}</Text>
    <View style={tw`w-[30px]`} />
  </View>
);

export default BackHeader; 