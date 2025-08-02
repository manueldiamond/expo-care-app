import BottomSheet from '@/components/bottom-sheet';
import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const caregiverImg = require('@/assets/images/intro-1.jpg');
const patientImg = require('@/assets/images/intro-2.jpg');

const roleData = [
  {
    key: 'caregiver',
    label: 'Caregiver',
    image: caregiverImg,
    confirmTitle: 'Confirm Role',
    confirmText: 'Are you sure you want to offer compassionate, home-based care services to those in need?',
    buttonText: 'Yes, I am a Caregiver',
  },
  {
    key: 'patient',
    label: 'Patient',
    image: patientImg,
    confirmTitle: 'Confirm Role',
    confirmText: 'Are you looking to find trusted caregivers for yourself or your loved ones on our platform?',
    buttonText: 'Yes, I am a Patient',
  },
];

export default function RoleSelect() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const router = useRouter();

  const handleSelect = (role: string) => {
    setSelectedRole(role);
    setSheetVisible(true);
  };
  const handleClose = () => {
    setSheetVisible(false);
    setSelectedRole(null);
  };
  const confirmRole = () => {
    if (selectedRole) {
      setSheetVisible(false);
      router.push(`/register?role=${selectedRole}`);
    }
  };

  const role = roleData.find(r => r.key === selectedRole);

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-2xl font-bold mb-8`}>Who are you?</Text>
      <View style={tw`flex-row gap-6 mb-12`}>
        {roleData.map(r => (
          <TouchableOpacity
            key={r.key}
            style={tw`items-center`}
            onPress={() => handleSelect(r.key)}
            activeOpacity={0.8}
          >
            <Image source={r.image} style={tw`w-[120px] h-[120px] rounded-full mb-3`} />
            <Text style={tw`text-lg font-medium`}>{r.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <BottomSheet visible={sheetVisible} onClose={handleClose}>
        {role && (
          <View style={tw`p-6 pb-10`}> 
            <Text style={tw`text-xl font-bold mb-2`}>{role.confirmTitle}</Text>
            <Text style={tw`text-base text-soft mb-8 font-normal`}>{role.confirmText}</Text>
            <Button text={role.buttonText} onPress={confirmRole} />
            <Button ghost text={'No'} onPress={handleClose} />
          </View>
        )}
      </BottomSheet>
      <TouchableOpacity onPress={() => router.push('/login')} style={tw`absolute bottom-10`}>
        <Text style={tw`text-good text-base font-medium`}>I already have an account</Text>
      </TouchableOpacity>
    </View>
  );
} 