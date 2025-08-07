import BlurredCircles from '@/components/blurred-circles';
import PendingActions from '@/components/global/PendingActions';
import tw from '@/lib/tailwind';
import { useUserStore } from '@/stores/user-store';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { QuickActionCard } from '../../../components/quick-action-card';
import { MatchedCaregivers } from '../components/matched-caregivers';
import { PatientHeader } from '../components/patient-header';
import { SearchBar } from '../components/search-bar';
import { QuickAction } from '../types';

const PatientHomeScreen = () => {
  const user = useUserStore(s => s.user);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const displayName = user?.fullname || user?.email || 'Patient';

  // Quick actions for patients
  const quickActions: QuickAction[] = [
    { title: 'Search Caregivers', icon: 'search', route: '/patient-user/search', color: '#4A90E2' },
    { title: 'Medical Records', icon: 'description', route: '/records', color: '#7ED321' },
    { title: 'Appointments', icon: 'event', route: '/book-appointment', color: '#F5A623' },
    { title: 'Profile', icon: 'person', route: '/profile', color: '#9B59B6' },
  ];

  const handleSearchPress = () => {
    router.push('/patient-user/search');
  };

  const handleViewAllMatchedCaregivers = () => {
    router.push('/patient-user/search?viewing=matched');
  };

  return (
    <View style={tw`flex-1 bg-medical-neutral`}>
      <BlurredCircles />
      
      <ScrollView style={tw`flex-1`}>
        {/* Medical Header */}
        <View style={tw`medical-header pb-8`}>
          <View style={tw`container medical-safe`}>
            <PatientHeader displayName={displayName} />
            
            {/* Search Bar */}
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search caregivers..."
              onPress={handleSearchPress}
              editable={false}
            />
          </View>
        </View>

        <View style={tw`container mt-4`}>
          {/* Matched Caregivers Section */}
          <MatchedCaregivers
            limit={3}
            showHeader={true}
            onViewAll={handleViewAllMatchedCaregivers}
                  />

          {/* Pending Actions */}
          <PendingActions userRole="patient" />

          {/* Quick Actions */}
          <Text style={tw`medical-text text-xl font-semibold mb-4`}>Quick Actions</Text>
          <View style={tw`medical-card p-4 mb-6`}>
            <View style={tw`flex-row flex-wrap gap-4`}>
              {quickActions.map((action, index) => (
                <QuickActionCard key={index} action={action} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PatientHomeScreen; 