import BlurredCircles from '@/components/blurred-circles';
import tw from '@/lib/tailwind';
import { getQualifications } from '@/services/caregiver-service';
import { useUserStore } from '@/stores/user-store';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Qualification {
  id: number;
  title: string;
  fileURL: string;
  createdAt: string;
}

const QualificationDetailsScreen = () => {
  const params = useLocalSearchParams();
  const caregiverId = useUserStore(s => s.user?.caregiver?.id);
  const qualificationId = params.qualificationId ? Number(params.qualificationId) : null;
  const [qualification, setQualification] = useState<Qualification | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (caregiverId && qualificationId) {
      loadQualification();
    }
  }, [caregiverId, qualificationId]);

  const loadQualification = async () => {
    setLoading(true);
    try {
      const allQualifications = await getQualifications(caregiverId!);
      const found = allQualifications.find((q: Qualification) => q.id === qualificationId);
      setQualification(found || null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={tw`flex-1 bg-medical-neutral`}>
        <BlurredCircles />
        <View style={tw`container mt-4 items-center justify-center flex-1`}>
          <Text style={tw`medical-text text-lg font-semibold`}>Loading...</Text>
        </View>
      </View>
    );
  }

  if (!qualification) {
    return (
      <View style={tw`flex-1 bg-medical-neutral`}>
        <BlurredCircles />
        <View style={tw`container mt-4 items-center justify-center flex-1`}>
          <Text style={tw`medical-text text-lg font-semibold`}>Qualification not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-medical-neutral`}>
      <BlurredCircles />
      <ScrollView style={tw`flex-1`}>
        <View style={tw`container mt-4`}>
          {/* Header */}
          <View style={tw`flex-row items-center justify-between mb-6`}>
            <View>
              <Text style={tw`medical-text text-2xl font-bold`}>Qualification Details</Text>
              <Text style={tw`medical-text-light text-sm font-normal`}>
                View qualification information
              </Text>
            </View>
            <TouchableOpacity
              style={tw`bg-medical-primary rounded-full p-3`}
              onPress={() => router.back()}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </View>
          {/* Qualification Info */}
          <View style={tw`medical-card p-6 mb-6`}>
            <Text style={tw`medical-text text-xl font-semibold mb-4`}>{qualification.title}</Text>
            <View style={tw`gap-4`}>
              <Text style={tw`medical-text text-base font-semibold mb-2`}>Document</Text>
              <View style={tw`gap-3`}>
                <View style={tw`bg-medical-neutral rounded-lg p-4`}>
                  <Image
                    source={{ uri: qualification.fileURL }}
                    style={tw`w-full h-48 rounded-lg`}
                    resizeMode="cover"
                  />
                  <Text style={tw`medical-text-light text-sm font-normal mt-2 text-center`}>
                    Uploaded on {qualification.createdAt}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default QualificationDetailsScreen; 