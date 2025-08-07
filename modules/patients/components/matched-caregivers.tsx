import Loading from '@/components/loading';
import tw from '@/lib/tailwind';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import patientsService from '../services/patients-service';
import { Caregiver } from '../types';
import { CaregiverCard } from './caregiver-card';
import { SectionHeader } from './section-header';

interface MatchedCaregiversProps {
  limit?: number;
  showHeader?: boolean;
  onViewAll?: () => void;
}

export const MatchedCaregivers: React.FC<MatchedCaregiversProps> = ({
  limit = 3,
  showHeader = true,
  onViewAll
}) => {
  const [matchedCaregivers, setMatchedCaregivers] = useState<Caregiver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadMatchedCaregivers = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const caregivers = await patientsService.getMatchedCaregivers(limit);
        setMatchedCaregivers(caregivers);
      } catch (err) {
        setError('Failed to load matched caregivers');
        console.error('Error loading matched caregivers:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMatchedCaregivers();
  }, [limit]);

  if (isLoading) {
    return (
      <View style={tw`medical-card p-4 mb-6`}>
        <Loading style={tw`bg-transparent`} message="Loading matched caregivers..." size="small" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`medical-card p-4 mb-6`}>
        <View style={tw`items-center py-8`}>
          <Text style={tw`medical-text-light text-sm font-normal text-center`}>
            {error}
          </Text>
        </View>
      </View>
    );
  }

  if (matchedCaregivers.length === 0) {
    return (
      <View style={tw`medical-card p-4 mb-6`}>
        <View style={tw`items-center py-8`}>
          <Text style={tw`medical-text text-lg font-semibold`}>
            No Matched Caregivers
          </Text>
          <Text style={tw`medical-text-light text-sm font-normal text-center mt-2`}>
            We'll find the perfect caregivers for you soon
          </Text>
        </View>
      </View>
    );
  }

  return (
    <>
      {showHeader && (
        <SectionHeader
          title="Matched Caregivers"
          actionText="View All"
          onActionPress={() => router.push('/patient-user/matched-caregivers')}
          showAction={true}
        />
      )}
      <View style={tw`rounded-3xl bg-medical-primary/10 p-4 mb-6`}>
        <View style={tw`gap-3`}>
          {matchedCaregivers.map((caregiver) => (
            <CaregiverCard
              key={caregiver.id}
              caregiver={caregiver}
              showAvailability={false}
              showVerified={false}
            />
          ))}
        </View>
      </View>
    </>
  );
};