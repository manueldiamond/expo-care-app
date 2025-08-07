import BlurredCircles from '@/components/blurred-circles';
import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { CaregiverCard } from '../components/caregiver-card';
import { SearchBar } from '../components/search-bar';
import patientsService from '../services/patients-service';
import { Caregiver } from '../types';

const PatientSearchScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced search function
  const debouncedSearch = useCallback(
    async (query: string) => {
      setIsLoading(true);
      setError(null);
      try {
        let results: Caregiver[] = [];
        if (query.trim() === '') {
          results = await patientsService.getAvailableCaregivers();
        } else {
          results = await patientsService.searchCaregivers(query, 'available');
        }
        console.log('results',results)
        setCaregivers(results);
      } catch (err) {
        setError('Failed to load caregivers');
        setCaregivers([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Handle search input changes
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setError(null);
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      debouncedSearch(query);
    }, 400);
    return () => clearTimeout(timeoutId);
  };

  // Load initial data
  useEffect(() => {
    debouncedSearch('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCaregiverCard = ({ item }: { item: Caregiver }) => (
    <CaregiverCard
      caregiver={item}
      showAvailability={true}
      showVerified={true}
    />
  );

  return (
    <View style={tw`flex-1 bg-medical-neutral`}>
      <BlurredCircles />
      <View style={tw`container mt-4`}>
        <SearchBar
          autoFocus
          value={searchQuery}
          onChangeText={handleSearch}
          showBackButton={true}
          onBackPress={router.canGoBack() ? router.back : () => router.replace('/home')}
      />
        <View style={tw`p-4 flex-grow h-full`}>
          {isLoading ? (
            <View style={tw`items-center py-8`}>
              <ActivityIndicator size="large" color={tw.color('medical-primary')} />
              <Text style={tw`medical-text-light text-sm font-normal mt-2`}>Searching caregivers...</Text>
            </View>
          ) : error ? (
            <View style={tw`items-center py-8`}>
              <MaterialIcons name="error" size={48} color={tw.color('medical-error')} />
              <Text style={tw`medical-text text-lg font-semibold mt-4`}>Error Loading Caregivers</Text>
              <Text style={tw`medical-text-light text-sm font-normal text-center mt-2`}>{error}</Text>
            </View>
          ) : caregivers.length === 0 ? (
            <View style={tw`items-center py-8`}>
              <MaterialIcons name="search-off" size={48} color={tw.color('medical-text-light')} />
              <Text style={tw`medical-text text-lg font-semibold mt-4`}>No Caregivers Found</Text>
            </View>
          ) : (
            <>
              <FlatList
                data={caregivers}
                renderItem={renderCaregiverCard}
                keyExtractor={(item) => String(item.id)}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={tw`flex-grow`}
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default PatientSearchScreen; 