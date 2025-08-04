import BlurredCircles from '@/components/blurred-circles';
import Loading from '@/components/loading';
import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { CaregiverCard } from '../components/caregiver-card';
import { FilterModal, FilterOptions } from '../components/filter-modal';
import { SearchBar } from '../components/search-bar';
import patientsService from '../services/patients-service';
import { Caregiver } from '../types';

const PatientSearchScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(params.search as string || '');
  const [filteredCaregivers, setFilteredCaregivers] = useState<Caregiver[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    availability: 'all',
    specialization: undefined,
    location: undefined,
    rating: undefined
  });

  // Get viewing parameter from query params or default to 'available'
  const viewing = (params.viewing as 'available' | 'all') || 'available';

  // Debounced search function
  const debouncedSearch = useCallback(
    async (query: string) => {
      if (query.trim() === '') {
        // If no search query, get all available caregivers
        try {
          const caregivers = await patientsService.getAvailableCaregivers();
          setFilteredCaregivers(caregivers);
        } catch (err) {
          setError('Failed to load caregivers');
          console.error('Error loading caregivers:', err);
        }
      } else {
        // Search with query
        try {
          const caregivers = await patientsService.searchCaregivers(query, viewing);
          setFilteredCaregivers(caregivers);
        } catch (err) {
          setError('Failed to search caregivers');
          console.error('Error searching caregivers:', err);
        }
      }
    },
    [viewing]
  );

  // Handle search input changes
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setError(null);
    
    // Clear results immediately if query is empty
    if (query.trim() === '') {
      setFilteredCaregivers([]);
      return;
    }

    // Debounce the API call
    const timeoutId = setTimeout(() => {
      setIsLoading(true);
      debouncedSearch(query).finally(() => setIsLoading(false));
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  // Handle filter changes
  const handleFilterApply = (filters: FilterOptions) => {
    setActiveFilters(filters);
    // TODO: Apply filters to API call
    console.log('Applied filters:', filters);
  };

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsInitialLoading(true);
      setError(null);
      
      try {
        if (searchQuery.trim()) {
          // If there's a search query from params, search
          const caregivers = await patientsService.searchCaregivers(searchQuery, viewing);
          setFilteredCaregivers(caregivers);
        } else {
          // Otherwise load all available caregivers
          const caregivers = await patientsService.getAvailableCaregivers();
          setFilteredCaregivers(caregivers);
        }
      } catch (err) {
        setError('Failed to load caregivers');
        console.error('Error loading initial caregivers:', err);
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadInitialData();
  }, [searchQuery, viewing]);

  const renderCaregiverCard = ({ item: caregiver }: { item: Caregiver }) => (
    <CaregiverCard
      caregiver={caregiver}
      showAvailability={true}
      showVerified={true}
    />
  );

  const renderHeader = () => {
    if (searchQuery.trim() !== '') {
      return null; // Don't show header when searching
    }

    return (
      <View style={tw`mb-6`}>
        <View style={tw`flex-row items-center justify-between mb-6`}>
          <View>
            <Text style={tw`medical-text text-2xl font-bold`}>Search Caregivers</Text>
            <Text style={tw`medical-text-light text-sm font-normal`}>
              Find the perfect caregiver for your needs
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderEmptyComponent = () => {
    if (searchQuery.trim() === '') {
      return null; // Don't show empty state when no search
    }

    if (error) {
      return (
        <View style={tw`items-center py-8`}>
          <MaterialIcons 
            name="error" 
            size={48} 
            color={tw.color('medical-error')} 
          />
          <Text style={tw`medical-text text-lg font-semibold mt-4`}>
            Error Loading Caregivers
          </Text>
          <Text style={tw`medical-text-light text-sm font-normal text-center mt-2`}>
            {error}
          </Text>
        </View>
      );
    }

    return (
      <View style={tw`items-center py-8`}>
        <MaterialIcons 
          name="search-off" 
          size={48} 
          color={tw.color('medical-text-light')} 
        />
        <Text style={tw`medical-text text-lg font-semibold mt-4`}>
          No Caregivers Found
        </Text>
        <Text style={tw`medical-text-light text-sm font-normal text-center mt-2`}>
          Try adjusting your search criteria
        </Text>
      </View>
    );
  };

  const renderFooter = () => {
    if (searchQuery.trim() !== '' && !isLoading && !error) {
      return (
        <View style={tw`flex-row items-center justify-between mb-4`}>
          <Text style={tw`medical-text text-lg font-semibold`}>
            {filteredCaregivers.length} Caregivers Found
          </Text>
        </View>
      );
    }
    return null;
  };

  const renderLoadingFooter = () => {
    if (isLoading && searchQuery.trim() !== '') {
      return (
        <View style={tw`items-center py-4`}>
          <Text style={tw`medical-text-light text-sm font-normal`}>
            Searching caregivers...
          </Text>
        </View>
      );
    }
    return null;
  };

  // Check if any filters are active
  const hasActiveFilters = activeFilters.availability !== 'all' || 
    activeFilters.specialization || 
    activeFilters.location || 
    activeFilters.rating;

  if (isInitialLoading) {
    return <Loading message="Loading caregivers..." />;
  }

  return (
    <View style={tw`flex-1 bg-medical-neutral`}>
      <BlurredCircles />
      
      <View style={tw`container mt-4`}>
        {/* Search Bar with Filter */}
        <SearchBar
          autoFocus
          value={searchQuery}
          onChangeText={handleSearch}
          showFilter={true}
          onFilterPress={() => setShowFilterModal(true)}
          showBackButton={true}
          onBackPress={() => router.back()}
        />

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <View style={tw`flex-row items-center mb-4`}>
            <MaterialIcons name="filter-list" size={16} color={tw.color('medical-primary')} />
            <Text style={tw`medical-text text-sm font-medium ml-2`}>
              Filters applied
            </Text>
            <TouchableOpacity
              style={tw`ml-auto`}
              onPress={() => setActiveFilters({
                availability: 'all',
                specialization: undefined,
                location: undefined,
                rating: undefined
              })}
            >
              <Text style={tw`medical-text-light text-sm`}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Results */}
        <View style={tw`p-4 flex-1`}>
          <FlatList
            data={filteredCaregivers}
            renderItem={renderCaregiverCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={renderEmptyComponent}
            ListFooterComponent={renderFooter}
            contentContainerStyle={tw`flex-grow`}
          />
        </View>
      </View>

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleFilterApply}
        currentFilters={activeFilters}
      />
    </View>
  );
};

export default PatientSearchScreen; 