import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import HomeHeader from '../components/home-header';
import { placeholderProfileImage } from '../data';

const placeholderPatientImage = placeholderProfileImage;

const HomeScreen = () => {
  const patientName = 'Elizabeth Makeey';
  const condition = 'Lung Cancer';
  const subText = '2 years';
  const tags = ['87%', '6-9 months'];
  const time = ['10:00', 'AM tomorrow'];
  const bookmarked = false;
  return (
    <>
      <StatusBar hidden={false} />
      <HomeHeader />
      <ScrollView style={tw`py-5 container`}>
        <Pressable>
          <View style={tw`shadow-2xl shadow-black/20 justify-between items-center bg-white flex-row p-5 rounded-lg`}>
            <View style={tw`flex-row gap-1 centered `}>
              <FontAwesome name="search" size={20} color={tw.color('soft')} />
              <Text style={tw`text-base text-soft`}>Search patient name</Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="close" size={20} color={tw.color('soft')} />
            </TouchableOpacity>
          </View>
        </Pressable>
        <View style={tw`pt-6`}>
          <View style={tw`bg-white rounded-lg p-5 shadow-2xl shadow-black/20`}>
            <View style={tw`flex-row gap-3.5`} >
              <Image
                source={placeholderPatientImage}
                style={tw`rounded-lg w-[92px] h-[92px]`}
              />
              <View style={tw`flex-1`}>
                <Text style={tw`text-lg font-medium text-dark`}>{patientName}</Text>
                <Text style={tw`pt-0.5 text-good font-[400] text-sm-`}>{condition}</Text>
                <Text style={tw`py-1 text-xs text-soft`}>{subText}</Text>
                <View style={tw`flex-row gap-[18px]`}>
                  {tags.map(tag =>
                    <View style={tw`flex-row items-center`} key={tag}>
                      <View style={tw`w-2.5 h-2.5 rounded-full bg-good`} />
                      <Text style={tw`text-sm ml-1`}>{tag}</Text>
                    </View>
                  )}
                </View>
              </View>
              <TouchableOpacity>
                <FontAwesome name={bookmarked ? "address-book" : "plus-square-o"} color={bookmarked ? 'red' : tw.color('soft')} size={20} />
              </TouchableOpacity>
            </View>
            <View style={tw`flex-row pt-4 justify-between items-center`}>
              <View>
                <Text style={tw`text-sm- text-good`} >Next Available</Text>
                <View style={tw`flex-row  items-center`}>
                  <Text style={tw`text-xs text-soft font-medium`}>{time[0]}</Text>
                  <Text style={tw`text-xs ml-1 text-soft`}>{time[1]}</Text>
                </View>
              </View>
              <Button
                sm
                onPress={() => router.push('/patient/1234')}
                text="Book Now"
              />
            </View>
          </View>
        </View>
      </ScrollView >
    </>
  );
};

export default HomeScreen; 