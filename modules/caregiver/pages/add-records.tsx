import BackHeader from '@/components/back-header';
import tw from '@/lib/tailwind';
import { placeholderProfileImage } from '@/modules/profile/data';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, View } from 'react-native';

const AddRecordsScreen = () => {
  return (
    <View>
      <BackHeader title="Add Records" />
      <View style={tw`flex-row gap-4`}>
        <Image
          source={placeholderProfileImage}
          style={tw`rounded-lg w-[100px] h-[125px]`}
        />
        <View style={tw`centered w-[100px] h-[125px]`}>
          <MaterialIcons name="add" color={tw.color('good')} size={30} />
          <Text style={tw`text-base mt-3`}>Add more images</Text>
        </View>
      </View>
    </View>
  );
};

export default AddRecordsScreen; 