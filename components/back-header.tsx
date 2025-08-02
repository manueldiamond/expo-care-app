import tw from '@/lib/tailwind';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type BackHeaderProps = {
  titleStyle?: object;
  title?: string;
  centralized?: boolean;
  backColor?: string;
  backStyle?: object;
  backVisible?: boolean;
};

const BackHeader = ({
  titleStyle,
  title = '',
  centralized = false,
  backColor = 'white',
  backStyle = {},
  backVisible,
}: BackHeaderProps) => (
  <View style={tw`flex-row centered container py-1`}>
    {router.canGoBack() &&backVisible&&
      <TouchableOpacity
        onPress={router.back}
        style={[
          tw`rounded-lg w-[30px] h-[30px] centered bg-whit`,
          backStyle
        ]}
      >
        <Ionicons name="chevron-back" size={28} color={backColor} />
      </TouchableOpacity>
    }
    <Text style={[
      tw.style(
        `flex-1 text-center text-lg ml-4 font-medium text-dark`,
        centralized && 'text-center',
      ),
      titleStyle
    ]}>{title}</Text>
    <View style={tw`w-[30px]`} />
  </View>
);

export default BackHeader; 