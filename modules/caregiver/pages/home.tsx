import BlurredCircles from '@/components/blurred-circles';
import tw from '@/lib/tailwind';
import { deleteTokens } from '@/modules/auth/auth-token-utils';
import { useUserStore } from '@/stores/user-store';
import { extractApiError } from '@/utils/api-error';
import { isProfileComplete } from '@/utils/profile-utils';
import showToast from '@/utils/toast';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Placeholder image
const placeholderProfileImage = require('@/assets/images/avatar.jpg');

const CaregiverHomeScreen = () => {
  const user = useUserStore(s => s.user);
  const updateUser = useUserStore(s => s.updateUser);
  const router = useRouter();

  const toggleAvailability = () => {
    
    //updateUser({: !user?.?caisAvailable });
  };

  const handleLogout = async () => {
    try {
      await deleteTokens();
      router.replace('/login');
    } catch (e) {
      showToast.error("Logout Error", extractApiError(e, "Error logging you out"));
    }
  };

  const displayName = user?.fullname || user?.email || 'Caregiver';
  const profileImageUrl = user?.photoUrl;
  const isAvailable = user?.caregiver?.isAvailable ?? false;

  // Internal variables to check profile completion and verification
  const profileComplete = isProfileComplete(user);
  const showVerify=user?.role==='caregiver'&&!user.caregiver?.verification;
  

  // Pending actions with priority - filter out falsy values
  let pendingActions = [
    !profileComplete && { 
      title: 'Complete Profile Setup', 
      description: 'Add your personal and caregiver information',
      priority: 'high',
      icon: 'person-add',
      route: '/profile/personal-info?setup=true',
      color: '#FF6B35'
    },
   showVerify && { 
      title: 'Verify Identity', 
      description: 'Upload required documents',
      priority: 'medium',
      icon: 'verified-user',
      route: '/profile/identity-verification',
      color: '#F5A623'
    },
  ].filter(Boolean) as Array<{
    title: string;
    description: string;
    priority: string;
    icon: string;
    route: string;
    color: string;
  }>;

  // Simplified quick actions
  const quickActions = [
    { title: 'Patients', icon: 'people', route: '/patients', color: '#4A90E2' },
    { title: 'Records', icon: 'description', route: '/records', color: '#7ED321' },
    { title: 'Appointments', icon: 'event', route: '/book-appointment', color: '#F5A623' },
    { title: 'Profile', icon: 'person', route: '/profile', color: '#9B59B6' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return tw.color('medical-error');
      case 'medium':
        return tw.color('medical-accent');
      case 'low':
        return tw.color('medical-success');
      default:
        return tw.color('medical-text-light');
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Medium Priority';
      case 'low':
        return 'Low Priority';
      default:
        return 'Priority';
    }
  };

  return (
    <>
      <View style={tw`flex-1 bg-medical-neutral`}>
        <BlurredCircles />
        
        <ScrollView style={tw`flex-1`}>
          {/* Medical Header */}
          <View style={tw`medical-header pb-8`}>
            <View style={tw`container medical-safe`}>
              <View style={tw`flex-row items-center justify-between mb-6`}>
                <View style={tw`flex-row items-center`}>
                  <Image
                    source={profileImageUrl ? { uri: profileImageUrl } : placeholderProfileImage}
                    style={tw`w-16 h-16 rounded-full mr-4 border-2 border-white`}
                  />
                  <View>
                    <Text style={tw`text-white text-xl font-semibold`}>
                      Welcome back
                    </Text>
                    <Text style={tw`text-white/80 text-sm font-normal`}>
                      {displayName}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={tw`bg-white/20 rounded-full p-3`}
                  onPress={() => router.push('/notifications' as any)}
                >
                  <MaterialIcons name="notifications" size={24} color="white" />
                </TouchableOpacity>
              </View>

              {/* Status Card */}
              <View style={tw`medical-card p-4`}>
                <View style={tw`flex-row items-center justify-between`}>
                  <View style={tw`flex-col gap-0`}>
                    <Text style={tw`medical-text text-base font-semibold`}>Status</Text>
                    <Text style={tw`medical-text-light text-xs font-normal`}>
                      {isAvailable ? 'Available for patients' : 'Currently unavailable'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={tw`${!isAvailable ? 'bg-medical-error/40 text-medical-text' : 'bg-medical-success'} rounded-2xl px-4 py-2 centered`}
                    onPress={toggleAvailability}
                  >
                    <Text style={tw`text-white font-medium text-sm`}>
                      {isAvailable ? 'Available' : 'Unavailable'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={tw`container mt-4`}>
            {/* Pending Actions */}
            <Text style={tw`medical-text text-xl font-semibold mb-4`}>Pending Actions</Text>
            <View style={tw`medical-card p-4 mb-6`}>
              <View style={tw`flex-col gap-3`}>
                {pendingActions.map((action, index) => (
                  <TouchableOpacity
                    key={index}
                    style={tw`bg-medical-neutral rounded-2xl p-4 flex-row items-center`}
                    onPress={() => router.push(action.route as any)}
                    activeOpacity={0.7}
                  >
                    <View 
                      style={[
                        tw`w-12 h-12 rounded-full centered mr-4`,
                        { backgroundColor: action.color + '20' }
                      ]}
                    >
                      <MaterialIcons name={action.icon as any} size={24} color={action.color} />
                    </View>
                    <View style={tw`flex-1`}>
                      <Text style={tw`medical-text text-base font-semibold`}>
                        {action.title}
                      </Text>
                      <Text style={tw`medical-text-light text-sm font-normal`}>
                        {action.description}
                      </Text>
                      <View style={tw`flex-row items-center mt-1`}>
                        <View 
                          style={[
                            tw`w-2 h-2 rounded-full mr-2`,
                            { backgroundColor: getPriorityColor(action.priority) }
                          ]}
                        />
                        <Text style={tw`medical-text-light text-xs font-normal`}>
                          {getPriorityText(action.priority)}
                        </Text>
                      </View>
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

            {/* Quick Actions */}
            <Text style={tw`medical-text text-xl font-semibold mb-4`}>Quick Actions</Text>
            <View style={tw`medical-card p-4 mb-6`}>
              <View style={tw`flex-row flex-wrap gap-4`}>
                {quickActions.map((action, index) => (
                  <TouchableOpacity
                    key={index}
                    style={tw`bg-medical-neutral flex-1 min-w-[40%]  rounded-2xl p-4 items-center`}
                    onPress={() => router.push(action.route as any)}
                  >
                    <View style={[tw`w-12 h-12 rounded-full centered mb-3`, { backgroundColor: action.color + '20' }]}>
                      <MaterialIcons name={action.icon as any} size={24} color={action.color} />
                    </View>
                    <Text style={tw`medical-text text-sm font-medium text-center`}>
                      {action.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Simple Stats */}
            <View style={tw`medical-card p-6 mb-6`}>
              <Text style={tw`medical-text text-lg font-semibold mb-4`}>Overview</Text>
              <View style={tw`flex-row justify-between`}>
                <View style={tw`items-center`}>
                  <Text style={tw`text-medical-primary text-2xl font-bold`}>8</Text>
                  <Text style={tw`medical-text-light text-sm font-normal`}>Patients</Text>
                </View>
                <View style={tw`items-center`}>
                  <Text style={tw`text-medical-secondary text-2xl font-bold`}>3</Text>
                  <Text style={tw`medical-text-light text-sm font-normal`}>Appointments</Text>
                </View>
                <View style={tw`items-center`}>
                  <Text style={tw`text-medical-accent text-2xl font-bold`}>4.9</Text>
                  <Text style={tw`medical-text-light text-sm font-normal`}>Rating</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default CaregiverHomeScreen; 