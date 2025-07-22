import tw from '@/lib/tailwind';
import { useUserStore } from '@/stores/user-store';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import ProfileLayout from '../components/profile-layout';
import { placeholderProfileImage } from '../data';

const profileOptions = [
  {
    key: 'personal',
    label: 'Personal Information',
    screen: 'personal-info',
    icon: 'person',
    color: '#4C4DDC', // blue for personal info
  },
  {
    key: 'medical',
    label: 'Medical Information',
    screen: 'medical-info',
    icon: 'healing',
    color: '#F59E42', // orange for medical info
  },
  {
    key: 'identity',
    label: 'Identity Verification',
    screen: 'identity-verification',
    icon: 'verified-user',
    color: '#34A853', // green for identity verification
  },
];

const ProfileMainScreen = () => {
  // Use the user name from the user store
  const user = useUserStore((s) => s.user);
  const loadProfile=useUserStore(s=>s.loadProfile)

  useEffect(()=>{
    loadProfile()
  },[])

  console.log("PROFILE",user)
  const name = user?.fullname|| 'Invalid Profile';
  console.log("PROFILENAME",name);
  const profileImageUrl=user?.photoUrl
  console.log("PROFILEIMAGEURL",profileImageUrl)

  const additionalTopContent = useMemo(()=>
    <View style={tw`flex-row items-center justify-center mt-4`}>
      <View style={tw`relative mr-4`}>
        <Image
          source={profileImageUrl?{uri:profileImageUrl}:placeholderProfileImage}
          style={tw`rounded-full w-[80px] h-[80px]`}
        />
      </View>
      <Text style={tw`flex-1 text-white text-xl font-bold`}>{name}</Text>
    </View>
  ,[profileImageUrl,name]);

  return (
    <ProfileLayout
      title="Profile"
      additionalTopContent={additionalTopContent}
    >
      <View style={tw`container mt-8`}> 
        <Text style={tw`font-medium text-lg text-dark pb-3`}>Profile Options</Text>
        {profileOptions.map(opt => (
          <TouchableOpacity
            key={opt.key}
            style={tw`bg-white gap-5 rounded-lg px-5 py-4 mb-3 flex-row items-center justify-between`}
            onPress={() => router.push('/profile/'+opt.screen as any)}
          >
            <View style={tw`bg-[${opt.color}] centered w-[32px] h-[32px] rounded-full `}>
              <MaterialIcons name={opt.icon as any} size={16} color='white'/>
            </View>
            <Text style={tw`text-base font-light text-soft flex-1`}>{opt.label}</Text>
            <MaterialIcons name="chevron-right" size={22} color={tw.color('soft')} />
          </TouchableOpacity>
        ))}
      </View>
    </ProfileLayout>
  );
};

export default ProfileMainScreen; 