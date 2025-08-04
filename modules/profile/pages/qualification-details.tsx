import BlurredCircles from '@/components/blurred-circles';
import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Qualification {
  id: string;
  title: string;
  images: string[];
}

const QualificationDetailsScreen = () => {
  const params = useLocalSearchParams();
  const qualification: Qualification = params.qualification ? JSON.parse(params.qualification as string) : null;

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
            
            {qualification.images.length > 0 ? (
              <View style={tw`gap-4`}>
                <Text style={tw`medical-text text-base font-semibold mb-2`}>Documents & Certificates</Text>
                <View style={tw`gap-3`}>
                  {qualification.images.map((image, index) => (
                    <View key={index} style={tw`bg-medical-neutral rounded-lg p-4`}>
                      <Image 
                        source={{ uri: image }} 
                        style={tw`w-full h-48 rounded-lg`}
                        resizeMode="cover"
                      />
                      <Text style={tw`medical-text-light text-sm font-normal mt-2 text-center`}>
                        Document {index + 1}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              <View style={tw`items-center py-8`}>
                <MaterialIcons 
                  name="image" 
                  size={48} 
                  color={tw.color('medical-text-light')} 
                />
                <Text style={tw`medical-text text-base font-semibold mt-2`}>
                  No Images
                </Text>
                <Text style={tw`medical-text-light text-sm font-normal text-center mt-1`}>
                  No documents or certificates uploaded for this qualification
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default QualificationDetailsScreen; 