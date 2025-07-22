import BlurredCircles from '@/components/blurred-circles';
import { Button } from '@/components/ui';
import tw from '@/lib/tailwind';
import { deleteTokens } from '@/modules/auth/auth-token-utils';
import { placeholderProfileImage } from '@/modules/profile/data';
import { useUserStore } from '@/stores/user-store';
import { extractApiError } from '@/utils/api-error';
import showToast from '@/utils/toast';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const quickActions = [
  { title: 'My Patients', icon: 'people', route: '/patients', color: '#4C4DDC' },
  { title: 'Medical Records', icon: 'folder', route: '/records', color: '#F59E42' },
  { title: 'Payments', icon: 'payment', route: '/payments', color: '#34A853' },
  { title: 'Privacy & Policy', icon: 'security', route: '/privacy', color: '#607D8B' },
  { title: 'Help Center', icon: 'help', route: '/help', color: '#FF9800' },
  { title: 'Settings', icon: 'settings', route: '/settings', color: '#795548' },
];

const supportActions = [
  { title: 'FAQs', icon: 'question-answer', route: '/faqs' },
  { title: 'Contact Admin', icon: 'admin-panel-settings', route: '/contact-admin' },
  { title: 'How to Use App', icon: 'help-outline', route: '/how-to-use' },
];

const DashboardScreen = () => {
  const user = useUserStore(s => s.user);
  const updateUser = useUserStore(s => s.updateUser);

  const toggleAvailability = () => {
    updateUser({ isAvailable: !user?.isAvailable });
  };

  const handleLogout = async () => {
    // TODO: Implement logout logic
    try{
        //await revokeTokens()
    await deleteTokens()
    router.replace('/login');
    }catch(e){
      showToast.error("Logout Error",extractApiError(e,"Error Logging you out"))
    }
  };

  const displayName = user?.fullname || user?.fullname|| user?.email || 'Caregiver';
  const profileImageUrl = user?.photoUrl
  const isAvailable = user?.isAvailable?? false;

  return (
    <View style={tw`flex-1 bg-[#F9F8F8] `}>
      <StatusBar hidden={false} backgroundColor={tw.color('good')} />
      <BlurredCircles/>
      <ScrollView style={tw`flex-1  `}>
        {/* Header with Welcome and Status */}
        <View style={tw`bg-good rounded-b-[30px] pb-6`}>
          <View style={tw`container pt-12 pb-4`}>
            <View style={tw`flex-row items-center justify-between`}>
              <View style={tw`flex-row items-center`}>
                <View style={tw`relative`}>
                  <Image
                    source={profileImageUrl?{uri:profileImageUrl}:placeholderProfileImage}
                    style={tw`rounded-full w-[60px] h-[60px] mr-4`}
                  />
                  <View style={tw`w-3 h-3 bg-white rounded-full absolute right-4 top-2`}/>
                </View>
                <View>
                  <Text style={tw`text-white text-lg font-bold`}>
                    Welcome, {displayName}!
                  </Text>
                  <Text style={tw`text-white/80 text-sm`}>
                    Ready to provide excellent care
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={tw`bg-white/20 rounded-full p-2`}
                onPress={() => router.push('/notifications' as any)}
              >
                <MaterialIcons name="notifications" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={tw`container mt-6`}>
          {/* Availability Status */}
          <View style={tw`bg-white rounded-lg p-4 mb-6 sshadow-lg shadow-black/20`}>
            <View style={tw`flex-row items-center justify-between`}>
              <View>
                <Text style={tw`text-lg font-semibold text-dark`}>Status</Text>
                <Text style={tw`text-sm text-soft`}>
                  {isAvailable ? 'Available for new patients' : 'Currently unavailable'}
                </Text>
              </View>
              <Button
                text={isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                onPress={toggleAvailability}
                style={tw`${isAvailable ? 'bg-red-500' : 'bg-good'}`}
                sm
              />
            </View>
          </View>

          {/* Quick Stats */}
          <View style={tw`flex-row gap-3 mb-6`}>
            <View style={tw`bg-white rounded-lg p-4 flex-1 sshadow-sm`}>
              <Text style={tw`text-2xl font-bold text-good`}>12</Text>
              <Text style={tw`text-sm text-soft`}>Patients</Text>
            </View>
            <View style={tw`bg-white rounded-lg p-4 flex-1 sshadow-sm`}>
              <Text style={tw`text-2xl font-bold text-blue-500`}>8</Text>
              <Text style={tw`text-sm text-soft`}>Visits</Text>
            </View>
            <View style={tw`bg-white rounded-lg p-4 flex-1 sshadow-sm`}>
              <Text style={tw`text-2xl font-bold text-orange-500`}>4.9</Text>
              <Text style={tw`text-sm text-soft`}>Rating</Text>
            </View>
          </View>

          {/* Quick Actions */}
          <Text style={tw`text-lg font-semibold text-dark mb-3`}>Quick Actions</Text>
          <View style={tw`bg-white rounded-lg p-4 mb-6 sshadow-sm`}>
            <View style={tw`flex-row flex-wrap gap-3`}>
              {quickActions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={tw`flex-row items-center bg-gray-50 rounded-lg px-3 py-2 flex-1 min-w-[45%]`}
                  onPress={() => router.push(action.route as any)}
                >
                  <View style={[tw`w-8 h-8 rounded-full items-center justify-center mr-2`, { backgroundColor: action.color + '20' }]}> 
                    <MaterialIcons name={action.icon as any} size={16} color={action.color} />
                  </View>
                  <Text style={tw`text-sm font-medium text-dark flex-1`}>{action.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Support & Help */}
          <Text style={tw`text-lg font-semibold text-dark mb-3`}>Support & Help</Text>
          <View style={tw`bg-white rounded-lg p-4 mb-6 sshadow-sm`}>
            {supportActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={tw`flex-row items-center py-3 ${index !== supportActions.length - 1 ? 'border-b border-gray-100' : ''}`}
                onPress={() => router.push(action.route as any)}
              >
                <MaterialIcons name={action.icon as any} size={20} color={tw.color('soft')} />
                <Text style={tw`text-dark ml-3 flex-1`}>{action.title}</Text>
                <MaterialIcons name="chevron-right" size={20} color={tw.color('soft')} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={tw`bg-red-500 rounded-lg p-4 items-center mb-6`}
            onPress={handleLogout}
          >
            <Text style={tw`text-white font-semibold`}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;
