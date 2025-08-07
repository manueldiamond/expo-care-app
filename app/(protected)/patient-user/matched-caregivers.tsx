import BlurredCircles from '@/components/blurred-circles';
import tw from '@/lib/tailwind';
import { CaregiverCard } from '@/modules/patients/components/caregiver-card';
import { SearchBar } from '@/modules/patients/components/search-bar';
import { SectionHeader } from '@/modules/patients/components/section-header';
import patientsService from '@/modules/patients/services/patients-service';
import { Caregiver } from '@/modules/patients/types';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

const PAGE_SIZE = 10;

const MatchedCaregiversScreen = () => {
  const router = useRouter();
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchCaregivers = useCallback(async (reset = false) => {
    if (reset) {
      setOffset(0);
      setHasMore(true);
      setCaregivers([]);
    }
    const currentOffset = reset ? 0 : offset;
    try {
      if (reset) setIsLoading(true);
      else setIsLoadingMore(true);
      // Simulate offset support if not available
      const newCaregivers = await patientsService.getMatchedCaregivers(PAGE_SIZE, currentOffset);
      if (newCaregivers.length < PAGE_SIZE) setHasMore(false);
      setCaregivers(prev => reset ? newCaregivers : [...prev, ...newCaregivers]);
      setOffset(currentOffset + newCaregivers.length);
    } catch (err) {
      setError('Failed to load matched caregivers');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [offset]);

  useEffect(() => {
    fetchCaregivers(true);
  }, []);

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore) {
      fetchCaregivers();
    }
  };

  const renderFooter = () => {
    if (isLoadingMore) {
      return <ActivityIndicator style={tw`my-4`} color={tw.color('medical-primary')} />;
    }
    if (!hasMore) {
      return <Text style={tw`text-center text-medical-text-light my-4`}>No more matches</Text>;
    }
    return null;
  };

  return (
    <View style={tw`flex-1 bg-medical-neutral`}>
      <BlurredCircles/>
      <View style={tw`container mt-4`}>
        <SearchBar
          value={''}
          onChangeText={() => {}}
          placeholder="Search caregivers..."
          editable={false}
          showBackButton
          onBackPress={router.canGoBack()?router.back:()=>router.push('/home')}
          onPress={() => router.push('/patient-user/search')}
        />
        <SectionHeader title="Matched Caregivers For You" />
        {isLoading ? (
          <View style={tw`items-center py-8`}>
            <ActivityIndicator size="large" color={tw.color('medical-primary')} />
            <Text style={tw`medical-text-light text-sm font-normal mt-2`}>Loading matched caregivers...</Text>
          </View>
        ) : error ? (
          <View style={tw`items-center py-8`}>
            <Text style={tw`medical-text text-lg font-semibold mt-4`}>Error Loading Caregivers</Text>
            <Text style={tw`medical-text-light text-sm font-normal text-center mt-2`}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={caregivers}
            renderItem={({ item }) => (
              <CaregiverCard
                key={item.id}
                caregiver={item}
                showAvailability={false}
                showVerified={false}
              />
            )}
            keyExtractor={item => String(item.id)}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            contentContainerStyle={tw`pb-8`}
          />
        )}
      </View>
    </View>
  );
};

export default MatchedCaregiversScreen; 