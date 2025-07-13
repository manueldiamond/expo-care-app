import { BackHeader } from '@/components/general-layout';
import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { placeholderProfileImage } from '../data';

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
              <Text style={tw`text-soft text-xs`}>{mainTag}</Text>
            </View>
            <View style={tw`flex-row py-9 justify-between items-center`}>
              {stats.map(stat => (
                <View style={tw`centered`} key={stat.title}>
                  <View style={tw`w-12 h-12 rounded-full centered bg-[#F5F5FF]`}>
                    <MaterialIcons name={stat.icon as any} color={'#4C4DDC'} size={28} />
                  </View>
                  <Text style={tw`font-semibold text-base mt-5`}>{stat.value}</Text>
                  <Text style={tw`font-regular text-soft text-xs mt-1`}>{stat.title}</Text>
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
      <Button onPress={() => router.push(`/patient/1${slug}`)} style={tw`shadow-xl shadow-black/20 rounded-full px-12 absolute mx-auto centered w-full bottom-[10]`} text="Book Appointment" />
    </View >
  );
};

export default UserPage; 