import BlurredCircles from '@/components/blurred-circles';
import tw from '@/lib/tailwind';
import { useUserStore } from '@/stores/user-store';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { CaregiverCard } from '../components/caregiver-card';
import { PatientHeader } from '../components/patient-header';
import { PendingActionCard } from '../components/pending-action-card';
import { QuickActionCard } from '../components/quick-action-card';
import { SearchBar } from '../components/search-bar';
import { SectionHeader } from '../components/section-header';
import patientsService from '../services/patients-service';
import { Caregiver, PendingAction, QuickAction } from '../types';

const PatientHomeScreen = () => {
  const user = useUserStore(s => s.user);
  const router = useRouter();
  const [availableCaregivers, setAvailableCaregivers] = useState<Caregiver[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const displayName = user?.fullname || user?.email || 'Patient';

  // Load limited available caregivers from API
  useEffect(() => {
    const loadCaregivers = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const caregivers = await patientsService.getLimitedAvailableCaregivers(3);
        setAvailableCaregivers(caregivers);
      } catch (err) {
        setError('Failed to load caregivers');
        console.error('Error loading caregivers:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCaregivers();
  }, []);

  // Pending actions for patients
  const pendingActions: PendingAction[] = [
    {
      title: 'Complete Medical Info',
      description: 'Update your health information',
      priority: 'high',
      icon: 'healing',
      route: '/profile/medical-info',
      color: '#7ED321'
    },
    {
      title: 'Book Appointment',
      description: 'Schedule with a caregiver',
      priority: 'medium',
      icon: 'event',
      route: '/book-appointment',
      color: '#F5A623'
    }
  ];

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

  const handleViewAllCaregivers = () => {
    router.push('/patient-user/search?viewing=available');
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
          {/* Available Caregivers Section */}
          <SectionHeader
            title="Available Caregivers"
            actionText="View All"
            onActionPress={handleViewAllCaregivers}
            showAction={true}
          />
          <View style={tw`medical-card p-4 mb-6`}>
            {isLoading ? (
              <View style={tw`items-center py-8`}>
                <ActivityIndicator size="large" color={tw.color('medical-primary')} />
                <Text style={tw`medical-text-light text-sm font-normal text-center mt-2`}>
                  Loading caregivers...
                </Text>
              </View>
            ) : error ? (
              <View style={tw`items-center py-8`}>
                <Text style={tw`medical-text-light text-sm font-normal text-center`}>
                  {error}
                </Text>
              </View>
            ) : availableCaregivers.length === 0 ? (
              <View style={tw`items-center py-8`}>
                <Text style={tw`medical-text text-lg font-semibold`}>
                  No Available Caregivers
                </Text>
                <Text style={tw`medical-text-light text-sm font-normal text-center mt-2`}>
                  Check back later for available caregivers
                </Text>
              </View>
            ) : (
              <View style={tw`gap-3`}>
                {availableCaregivers.map((caregiver) => (
                  <CaregiverCard
                    key={caregiver.id}
                    caregiver={caregiver}
                    showAvailability={false}
                    showVerified={false}
                  />
                ))}
              </View>
            )}
          </View>

          {/* Pending Actions */}
          <Text style={tw`medical-text text-xl font-semibold mb-4`}>Pending Actions</Text>
          <View style={tw`medical-card p-4 mb-6`}>
            <View style={tw`flex-col gap-3`}>
              {pendingActions.map((action, index) => (
                <PendingActionCard key={index} action={action} />
              ))}
            </View>
          </View>

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