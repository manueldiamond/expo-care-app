import BlurredCircles from '@/components/blurred-circles';
import CaregiverActionSheet from '@/components/caregiver-action-sheet';
import { Section } from '@/components/global/Section';
import Loading from '@/components/loading';
import tw from '@/lib/tailwind';
import { CaregiverProfile } from '@/types';
import { API_ENDPOINTS } from '@/utils/api';
import api from '@/utils/axios';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '@react-navigation/elements';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View, useWindowDimensions } from 'react-native';

const CaregiverDetailsScreen: React.FC = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [caregiver, setCaregiver] = useState<CaregiverProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const { height } = useWindowDimensions();

  useEffect(() => {
    if (id) {
      loadCaregiverDetails();
    }
  }, [id]);

  const loadCaregiverDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<CaregiverProfile>(API_ENDPOINTS.GET_CAREGIVER(Number(id)));
      setCaregiver(response.data);
    } catch (err) {
      console.error('Error loading caregiver details:', err);
      setError('Failed to load caregiver details');
    } finally {
      setLoading(false);
    }
  };

  const handleConnectCaregiver = () => {
    setShowActionSheet(true);
  };

  if (loading) {
    return <Loading message="Loading caregiver details..." />;
  }

  if (error || !caregiver) {
    return (
      <View style={tw`flex-1 bg-medical-neutral centered`}>
        <BlurredCircles />
        <Text style={tw`medical-text text-lg font-semibold mb-2`}>
          {error || 'Caregiver not found'}
        </Text>
        <Button children="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  const stats = [
    { 
      icon: 'people', 
      value: caregiver.assignments?.length || 0, 
      title: 'Patients' 
    },
    { 
      icon: 'school', 
      value: caregiver.qualifications?.length || 0, 
      title: 'Qualifications' 
    },
    { 
      icon: 'verified', 
      value: caregiver.isVerified ? 'Verified' : 'Pending', 
      title: '' 
    },
    { 
      icon: 'schedule', 
      value: caregiver.isAvailable ? 'Available' : 'Busy', 
      title: '' 
    },
  ];

  return (
    <View style={tw`flex-1 bg-medical-neutral`}>
      <BlurredCircles />
      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <View style={tw`container py-6`}>
          {/* Header Section */}
          <View style={tw`items-center mb-6`}>
            <Image
              source={
                caregiver.user.photoUrl 
                  ? { uri: caregiver.user.photoUrl }
                  : require('@/assets/images/avatar.jpg')
              }
              style={tw`w-32 h-32 rounded-full mb-4 border-4 border-white shadow-lg`}
            />
            <View style={tw`flex-row items-center mb-2`}>
              <Text style={tw`medical-text text-2xl font-bold text-center`}>
                {caregiver.user.fullname}
              </Text>
              {caregiver.isVerified && (
                <MaterialIcons 
                  name="verified" 
                  size={24} 
                  color={tw.color('medical-success')} 
                  style={tw`ml-2`}
                />
              )}
            </View>
            <Text style={tw`medical-text-light text-lg font-medium text-center mb-2`}>
              {caregiver.type || 'Professional Caregiver'}
            </Text>
            {caregiver.educationLevel && (
              <Text style={tw`medical-text-light text-sm font-normal text-center`}>
                {caregiver.educationLevel}
              </Text>
            )}
          </View>

          {/* Stats Section */}
          <Section title="Overview">
            <View style={tw`flex-row flex-wrap justify-between gap-4`}>
              {stats.map((stat, index) => (
                <View key={index} style={tw`bg-white rounded-lg p-4 items-center flex-1 min-w-[45%]`}>
                  <View style={tw`w-12 h-12 rounded-full bg-medical-primary/10 items-center justify-center mb-3`}>
                    <MaterialIcons name={stat.icon as any} color={tw.color('medical-primary')} size={24} />
                  </View>
                  <Text style={tw`medical-text text-lg font-semibold`}>{stat.value}</Text>
                  <Text style={tw`medical-text-light text-xs font-normal mt-1`}>{stat.title}</Text>
                </View>
              ))}
            </View>
          </Section>

          {/* About Section */}
          {caregiver.bio && (
            <Section title="About">
              <Text style={tw`medical-text text-sm font-normal leading-6`}>
                {caregiver.bio}
              </Text>
            </Section>
          )}

          {/* Contact Information */}
          <Section title="Contact Information">
            <View style={tw`gap-3`}>
              {caregiver.user.contact && (
                <View style={tw`flex-row items-center`}>
                  <MaterialIcons name="phone" size={20} color={tw.color('medical-primary')} />
                  <Text style={tw`medical-text text-sm font-normal ml-3`}>
                    {caregiver.user.contact}
                  </Text>
                </View>
              )}
              {caregiver.user.location && (
                <View style={tw`flex-row items-center`}>
                  <MaterialIcons name="location-on" size={20} color={tw.color('medical-primary')} />
                  <Text style={tw`medical-text text-sm font-normal ml-3`}>
                    {caregiver.user.location}
                  </Text>
                </View>
              )}
              <View style={tw`flex-row items-center`}>
                <MaterialIcons name="email" size={20} color={tw.color('medical-primary')} />
                <Text style={tw`medical-text text-sm font-normal ml-3`}>
                  {caregiver.user.email}
                </Text>
              </View>
            </View>
          </Section>

          {/* Schedule Section */}
          {caregiver.schedule && (
            <Section title="Schedule">
              <Text style={tw`medical-text text-sm font-normal`}>
                {caregiver.schedule}
              </Text>
            </Section>
          )}

          {/* Qualifications Section */}
          {caregiver.qualifications && caregiver.qualifications.length > 0 && (
            <Section title="Qualifications">
              <View style={tw`gap-3`}>
                {caregiver.qualifications.map((qualification, index) => (
                  <View 
                    key={qualification.id} 
                    style={tw`bg-white rounded-lg p-4 ${
                      index !== (caregiver.qualifications?.length || 0) - 1 
                        ? 'border-b border-b-medical-primary/20' 
                        : ''
                    }`}
                  >
                    <Text style={tw`medical-text text-base font-semibold mb-1`}>
                      {qualification.title}
                    </Text>
                    <Text style={tw`medical-text-light text-xs font-normal`}>
                      Added {new Date(qualification.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                ))}
              </View>
            </Section>
          )}
        </View>
      </ScrollView>
      
      {/* Connect Button */}
      <View style={tw`container pb-6`}>
        <Button
          onPress={handleConnectCaregiver}
          children="Connect with Caregiver"
          style={tw`shadow-lg`}
        />
      </View>

      {/* Action Sheet */}
      {caregiver && (
        <CaregiverActionSheet
          visible={showActionSheet}
          onClose={() => setShowActionSheet(false)}
          caregiver={caregiver}
        />
      )}
    </View>
  );
};

export default CaregiverDetailsScreen; 