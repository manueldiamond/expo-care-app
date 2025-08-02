import BackHeader from '@/components/back-header';
import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import { placeholderProfileImage } from '@/modules/profile/data';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';

const placeholderPatientImage = placeholderProfileImage;

const UserPage = () => {
  const { slug } = useLocalSearchParams();
  const name = 'Hannah Tetteh';
  const mainTag = 'Neurological Disorder';
  const stats = [
    { icon: 'person', value: 45, title: 'Patients' },
    { icon: 'check-box-outline-blank', value: '5+', title: 'Experience' },
    { icon: 'star', value: 4.9, title: 'Rating' },
    { icon: 'chat', value: '90+', title: 'Reviews' },
  ];
  const about = `Neurological Disorders\nAlzheimer's disease and other dementias Parkinson’s disease (advanced stages) Amyotrophic Lateral Sclerosis (ALS) Read More....`;
  const { height } = useWindowDimensions();
  return (
    <View style={tw`flex-1 bg-white relative`}>
      <BackHeader title='Patient' centralized />
      <ScrollView style={tw`flex-1 container`}>
        <View style={tw`pb-30`}>
          <View style={tw`relative`}>
            <Image
              source={placeholderPatientImage}
              style={tw`rounded-t-[30px] w-full h-[${height * .35}px]`}
            />
            <TouchableOpacity style={tw`absolute right-3 top-3 rounded-3xl bg-white w-10 h-10 centered`}>
              <MaterialIcons name={false ? "bookmark" : "bookmark-outline"} size={20} color={tw.color('soft')} />
            </TouchableOpacity>
          </View>
          <View style={tw`bg-white`} >
            <View style={tw`py-3`}>
              <View style={tw`flex-row items-center justify-between`}>
                <Text style={tw`font-semibold flex-row text-base`}>{name}</Text>
                <View style={tw`flex-row centered gap-0.5`}>
                  <FontAwesome name="star" color={'#FFD33C'} />
                  <Text style={tw`text-xs font-medium`}>4.9 (96 reviews)</Text>
                </View>
              </View>
              <Text style={tw`text-soft text-xs font-normal`}>{mainTag}</Text>
            </View>
            <View style={tw`flex-row py-9 justify-between items-center`}>
              {stats.map(stat => (
                <View style={tw`centered`} key={stat.title}>
                  <View style={tw`w-12 h-12 rounded-full centered bg-[#F5F5FF]`}>
                    <MaterialIcons name={stat.icon as any} color={'#4C4DDC'} size={28} />
                  </View>
                  <Text style={tw`font-semibold text-base mt-5`}>{stat.value}</Text>
                  <Text style={tw`font-regular text-soft text-xs mt-1 font-normal`}>{stat.title}</Text>
                </View>
              ))}
            </View>
            <View>
              <Text style={tw`font-semibold text-base mb-2`}>About Me</Text>
              <Text style={tw`font-medium leading-[1.5] text-soft text-xs`}>
                {about}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView >
      <Animated.View
        entering={SlideInDown}
        style={tw`absolute mx-auto centered bottom-[10] w-full`}
      >
        <Button
          onPress={() => router.push(`/patient/1${slug}`)}
          style={tw`shadow-2xl shadow-black rounded-full px-12`}
          text="Book Appointment"
        />
      </Animated.View>
    </View >
  );
};

export default UserPage; 