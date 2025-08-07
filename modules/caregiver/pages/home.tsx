import BlurredCircles from '@/components/blurred-circles';
import PendingActions from '@/components/global/PendingActions';
import { Section } from '@/components/global/Section';
import GreetingHeader from '@/components/greeting-header';
import { QuickActionCard } from '@/components/quick-action-card';
import tw from '@/lib/tailwind';
import showToast from '@/utils/toast';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import CaregiverStatusCard from '../components/caregiver-status';

// Placeholder image
const placeholderProfileImage = require('@/assets/images/avatar.jpg');

const CaregiverHomeScreen = () => {
  const router = useRouter();

  // Quick actions with functions
  const quickActions = [
    { 
      title: 'Patients', 
      icon: 'people', 
      route: '/chat', 
      color: '#4A90E2',
      onPress: () => router.push('/chat' as any)
    },
    { 
      title: 'Records', 
      icon: 'description', 
      route: '/caregiver-user/records', 
      color: '#7ED321',
      onPress: () => showToast.info('Coming soon')
    },
    { 
      title: 'Appointments', 
      icon: 'event', 
      route: '/caregiver-user/appointments', 
      color: '#F5A623',
      onPress: () => showToast.info('Coming soon')
    },
    { 
      title: 'Profile', 
      icon: 'person', 
      route: '/caregiver-user/profile', 
      color: '#9B59B6',
      onPress: () => router.push('/caregiver-user/profile' as any)
    },
  ];

  return (
    <>
      <View style={tw`flex-1 bg-medical-neutral`}>
        <BlurredCircles />
        <ScrollView style={tw`flex-1`}>
          {/* Medical Header */}
          <View style={tw`medical-header pb-8`}>
            <View style={tw`container medical-safe`}>
            <GreetingHeader/>

            <CaregiverStatusCard/>
            </View>
          </View>

          <View style={tw`container mt-4`}>
            {/* Pending Actions Section */}
            <PendingActions userRole="caregiver" />

            {/* Quick Actions Section */}
            <Section
              title="Quick Actions"
            >
              <View style={tw`flex-row flex-wrap gap-4`}>
                {quickActions.map((action, index) => (
                  <QuickActionCard
                    key={index}
                    action={action}
                    onPress={action.onPress}
                  />
                ))}
              </View>
            </Section>

            {/* Overview/Stats Section */}
            <Section
              title="Overview"
            >
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
            </Section>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default CaregiverHomeScreen; 