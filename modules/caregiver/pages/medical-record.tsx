import { BackHeader } from '@/components/general-layout';
import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import React from 'react';
import { Image, Text, View } from 'react-native';

const recordImage = require('@/assets/images/record-icon.png');

const MedicalRecordScreen = () => {
  return (
    <View>
      <BackHeader title="Medical Records" />
      <View style={tw`flex-1 centered`}>
        <View style={tw`bg-[#C6EFE5C2] w-[214px] h-[214px] rounded-full centered`}>
          <Image
            source={recordImage}
            style={tw`w-[120px]`}
          />
        </View>
        <View style={tw`mt-10`}>
          <Text style={tw`font-bold text-[22px] text-dark`}>Add a medical record</Text>
          <Text style={tw`text-sm text-soft text-center mt-[13px]`}>
            A detailed health history helps a doctor diagnose you btter.
          </Text>
        </View>
        <Button
          text="Add a record"
          style={tw`w-full mt-8`}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default MedicalRecordScreen; 