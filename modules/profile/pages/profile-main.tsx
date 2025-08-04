import BlurredCircles from '@/components/blurred-circles';
import Loading from '@/components/loading';
import tw from '@/lib/tailwind';
import { deleteTokens } from '@/modules/auth/auth-token-utils';
import { useUserStore } from '@/stores/user-store';
import { extractApiError } from '@/utils/api-error';
import showToast from '@/utils/toast';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { placeholderProfileImage } from '../data';

const getProfileOptions = (userRole: string) => {
  const baseOptions = [
    {
      key: 'personal',
      label: 'Personal Information',
      screen: 'personal-info',
      icon: 'person',
      color: '#4A90E2',
      description: 'Update your basic details',
    },
  ];

  if (userRole === 'caregiver') {
    return [
      ...baseOptions,
      {
        key: 'caregiver-details',
        label: 'Caregiver Details',
        screen: 'caregiver-details',
        icon: 'work',
        color: '#FF6B35',
        description: 'Manage your work information',
      },
      {
        key: 'identity',
        label: 'Identity Verification',
        screen: 'identity-verification',
        icon: 'verified-user',
        color: '#F5A623',
        description: 'Verify your identity',
      },
    ];
  } else if (userRole === 'patient') {
    return [
      ...baseOptions,
      {
        key: 'medical',
        label: 'Medical Information',
        screen: 'medical-info',
        icon: 'healing',
        color: '#7ED321',
        description: 'Manage your health records',
      },
    ];
  } else {
    return baseOptions;
  }
};

const ProfileMainScreen = () => {
  const user = useUserStore((s) => s.user);
  const logout = useUserStore(s => s.logout);
  const loadProfile = useUserStore(s => s.loadProfile);

  useEffect(() => {
    loadProfile();
  }, []);

  const name = user?.fullname || 'Invalid Profile';
  const profileImageUrl = user?.photoUrl;
  const email = user?.email || 'No email provided';
  const role = user?.role || 'User';

  const profileOptions = getProfileOptions(role);

  const handleLogout = async () => {
    try {
      await deleteTokens();
      logout();
      showToast.success('Logged out successfully');
      router.replace('/login');
    } catch (e) {
      showToast.error("Logout Error", extractApiError(e, "Error logging you out"));
    }
  };

  const getAccountOverview = () => {
    if (role === 'caregiver') {
      return [
        {
          label: 'Settings',
          value: profileOptions.length.toString(),
          color: 'text-medical-primary',
        },
        {
          label: 'Status',
          value: user?.isAvailable ? 'Active' : 'Inactive',
          color: 'text-medical-secondary',
        },
        {
          label: 'Role',
          value: 'Caregiver',
          color: 'text-medical-accent',
        },
      ];
    } else if (role === 'patient') {
      return [
        {
          label: 'Settings',
          value: profileOptions.length.toString(),
          color: 'text-medical-primary',
        },
        {
          label: 'Status',
          value: 'Patient',
          color: 'text-medical-secondary',
        },
        {
          label: 'Role',
          value: 'Patient',
          color: 'text-medical-accent',
        },
      ];
    } else {
      return [
        {
          label: 'Settings',
          value: profileOptions.length.toString(),
          color: 'text-medical-primary',
        },
        {
          label: 'Status',
          value: 'Loading...',
          color: 'text-medical-secondary',
        },
        {
          label: 'Role',
          value: 'Loading...',
          color: 'text-medical-accent',
        },
      ];
    }
  };

  // Show loading state if user role is not available
  if (!user?.role) {
    return <Loading message="Loading profile..." />;
  }

  return (
    <>
      <View style={tw`flex-1 bg-medical-neutral`}>
        <BlurredCircles />
        
        <ScrollView style={tw`flex-1`}>
          {/* Medical Header */}
          <View style={tw`medical-header pb-8`}>
            <View style={tw`container medical-safe`}>
              <View style={tw`flex-row items-center justify-between mb-6`}>
                <View>
                  <Text style={tw`text-white text-2xl font-bold`}>Profile</Text>
                  <Text style={tw`text-white/80 text-sm font-normal`}>
                    Manage your account settings
                  </Text>
                </View>
                <TouchableOpacity
                  style={tw`bg-white/20 rounded-full p-3`}
                  onPress={handleLogout}
                >
                  <MaterialIcons name="logout" size={24} color="white" />
                </TouchableOpacity>
              </View>

              {/* Profile Card */}
              <View style={tw`medical-card p-4`}>
                <View style={tw`flex-row items-center`}>
                  <Image
                    source={profileImageUrl ? { uri: profileImageUrl } : placeholderProfileImage}
                    style={tw`w-16 h-16 rounded-full mr-4 border-2 border-white`}
                  />
                  <View style={tw`flex-1`}>
                    <Text style={tw`medical-text text-lg font-semibold`}>{name}</Text>
                    <Text numberOfLines={1} style={tw`medical-text-light text-xs font-normal`}>{email}</Text>
                    <View style={tw`flex-row items-center mt-1`}>
                      <MaterialIcons 
                        name="badge" 
                        size={16} 
                        color={tw.color('medical-primary')} 
                      />
                      <Text style={tw`medical-text-light text-xs font-normal ml-1`}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </Text>
                    </View>
                    <View style={tw`flex-row items-center mt-1`}>
                      <MaterialIcons 
                        name="phone" 
                        size={16} 
                        color={tw.color('medical-primary')} 
                      />
                      <Text style={tw`medical-text-light text-xs font-normal ml-1`}>
                        {user?.contact|| '-'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={tw`container mt-4`}>
            {/* Profile Options */}
            <Text style={tw`medical-text text-xl font-semibold mb-4`}>Account Settings</Text>
            <View style={tw`medical-card p-4 mb-6`}>
              <View style={tw`flex-col gap-4`}>
                {profileOptions.map((opt) => (
                  <TouchableOpacity
                    key={opt.key}
                    style={tw`bg-medical-neutral rounded-2xl p-4 flex-row items-center`}
                    onPress={() => router.push(`/profile/${opt.screen}` as any)}
                    activeOpacity={0.7}
                  >
                    <View 
                      style={[
                        tw`w-12 h-12 rounded-full centered mr-4`,
                        { backgroundColor: opt.color + '20' }
                      ]}
                    >
                      <MaterialIcons name={opt.icon as any} size={24} color={opt.color} />
                    </View>
                    <View style={tw`flex-1`}>
                      <Text style={tw`medical-text text-base font-semibold`}>
                        {opt.label}
                      </Text>
                      <Text style={tw`medical-text-light text-sm font-normal`}>
                        {opt.description}
                      </Text>
                    </View>
                    <MaterialIcons 
                      name="chevron-right" 
                      size={24} 
                      color={tw.color('medical-text-light')} 
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Quick Stats */}
            <View style={tw`medical-card p-6 mb-6`}>
              <Text style={tw`medical-text text-lg font-semibold mb-4`}>Account Overview</Text>
              <View style={tw`flex-row justify-between`}>
                {getAccountOverview().map((item, index) => (
                  <View key={index} style={tw`items-center`}>
                    <Text style={tw`${item.color} text-2xl font-bold`}>
                      {item.value}
                    </Text>
                    <Text style={tw`medical-text-light text-sm font-normal`}>{item.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ProfileMainScreen; 
