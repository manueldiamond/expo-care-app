import BlurredCircles from '@/components/blurred-circles';
import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const IdentityVerificationScreen = () => {
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'rejected'>('pending');

  const getStatusColor = () => {
    switch (verificationStatus) {
      case 'verified':
        return tw.color('medical-success');
      case 'rejected':
        return tw.color('medical-error');
      default:
        return tw.color('medical-accent');
    }
  };

  const getStatusText = () => {
    switch (verificationStatus) {
      case 'verified':
        return 'Verified';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  const getStatusDescription = () => {
    switch (verificationStatus) {
      case 'verified':
        return 'Your identity has been successfully verified';
      case 'rejected':
        return 'Please resubmit your documents for verification';
      default:
        return 'Your verification is currently under review';
    }
  };

  return (
    <>
      <StatusBar hidden={false} backgroundColor={tw.color('medical-primary')} />
      <View style={tw`flex-1 bg-medical-neutral`}>
        <BlurredCircles />
        
        <ScrollView style={tw`flex-1`}>
          {/* Medical Header */}
          <View style={tw`medical-header pb-8`}>
            <View style={tw`container medical-safe`}>
              <View style={tw`flex-row items-center justify-between mb-6`}>
                <View style={tw`flex-row items-center flex-1`}>
                  <TouchableOpacity
                    style={tw`bg-white/20 rounded-full p-3 mr-4`}
                    onPress={() => router.back()}
                  >
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                  </TouchableOpacity>
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-white text-2xl font-bold`}>Identity Verification</Text>
                    <Text style={tw`text-white/80 text-sm font-normal`}>
                      Verify your identity for secure access
                    </Text>
                  </View>
                </View>
              </View>

              {/* Verification Status Card */}
              <View style={tw`medical-card p-4`}>
                <View style={tw`flex-row items-center`}>
                  <View 
                    style={[
                      tw`w-12 h-12 rounded-full centered mr-4`,
                      { backgroundColor: getStatusColor() + '20' }
                    ]}
                  >
                    <MaterialIcons 
                      name="verified-user" 
                      size={24} 
                      color={getStatusColor()} 
                    />
                  </View>
                  <View style={tw`flex-1`}>
                    <Text style={tw`medical-text text-base font-semibold`}>
                      {getStatusText()}
                    </Text>
                    <Text style={tw`medical-text-light text-sm font-normal`}>
                      {getStatusDescription()}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={tw`container mt-4`}>
            {/* Verification Steps */}
            <Text style={tw`medical-text text-xl font-semibold mb-4`}>Verification Steps</Text>
            <View style={tw`medical-card p-6 mb-6`}>
              <View style={tw`space-y-4`}>
                {/* Step 1 */}
                <View style={tw`flex-row items-center`}>
                  <View style={tw`w-8 h-8 rounded-full bg-medical-primary centered mr-4`}>
                    <Text style={tw`text-white font-bold text-sm`}>1</Text>
                  </View>
                  <View style={tw`flex-1`}>
                    <Text style={tw`medical-text text-base font-semibold`}>
                      Upload ID Document
                    </Text>
                    <Text style={tw`medical-text-light text-sm font-normal`}>
                      Provide a valid government-issued ID
                    </Text>
                  </View>
                  <MaterialIcons 
                    name="check-circle" 
                    size={24} 
                    color={tw.color('medical-success')} 
                  />
                </View>

                {/* Step 2 */}
                <View style={tw`flex-row items-center`}>
                  <View style={tw`w-8 h-8 rounded-full bg-medical-primary centered mr-4`}>
                    <Text style={tw`text-white font-bold text-sm`}>2</Text>
                  </View>
                  <View style={tw`flex-1`}>
                    <Text style={tw`medical-text text-base font-semibold`}>
                      Selfie Verification
                    </Text>
                    <Text style={tw`medical-text-light text-sm font-normal`}>
                      Take a photo for identity confirmation
                    </Text>
                  </View>
                  <MaterialIcons 
                    name="check-circle" 
                    size={24} 
                    color={tw.color('medical-success')} 
                  />
                </View>

                {/* Step 3 */}
                <View style={tw`flex-row items-center`}>
                  <View style={tw`w-8 h-8 rounded-full bg-medical-primary centered mr-4`}>
                    <Text style={tw`text-white font-bold text-sm`}>3</Text>
                  </View>
                  <View style={tw`flex-1`}>
                    <Text style={tw`medical-text text-base font-semibold`}>
                      Background Check
                    </Text>
                    <Text style={tw`medical-text-light text-sm font-normal`}>
                      We'll verify your background and credentials
                    </Text>
                  </View>
                  <MaterialIcons 
                    name="pending" 
                    size={24} 
                    color={tw.color('medical-accent')} 
                  />
                </View>
              </View>
            </View>

            {/* Required Documents */}
            <Text style={tw`medical-text text-xl font-semibold mb-4`}>Required Documents</Text>
            <View style={tw`medical-card p-6 mb-6`}>
              <View style={tw`space-y-4`}>
                <View style={tw`flex-row items-center`}>
                  <MaterialIcons name="description" size={24} color={tw.color('medical-primary')} />
                  <Text style={tw`medical-text text-base font-normal ml-3`}>
                    Government-issued ID (Passport, Driver's License, etc.)
                  </Text>
                </View>
                <View style={tw`flex-row items-center`}>
                  <MaterialIcons name="camera-alt" size={24} color={tw.color('medical-primary')} />
                  <Text style={tw`medical-text text-base font-normal ml-3`}>
                    Recent passport-style photo
                  </Text>
                </View>
                <View style={tw`flex-row items-center`}>
                  <MaterialIcons name="verified-user" size={24} color={tw.color('medical-primary')} />
                  <Text style={tw`medical-text text-base font-normal ml-3`}>
                    Professional license (if applicable)
                  </Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            {verificationStatus === 'rejected' && (
              <Button
                text="Resubmit Documents"
                onPress={() => console.log('Resubmit')}
                style={tw`mb-4`}
              />
            )}
            
            {verificationStatus === 'pending' && (
              <Button
                text="Upload Documents"
                onPress={() => console.log('Upload')}
                style={tw`mb-4`}
              />
            )}

            <Button
              text="Contact Support"
              onPress={() => console.log('Contact support')}
              ghost
              style={tw`mb-6`}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default IdentityVerificationScreen; 