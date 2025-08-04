import BlurredCircles from '@/components/blurred-circles';
import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import showToast from '@/utils/toast';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';

const IdentityVerificationScreen = () => {
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'rejected'>('pending');

  const {next, setup} = useLocalSearchParams();

  const { handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log('Identity Verification Data:', data);
    // TODO: Save identity verification
    showToast.success('Identity verification submitted successfully');
    
    // Handle navigation based on setup flag
    if (setup === 'true') {
      // In setup mode, navigate to home
      router.push('/home');
    } else if (next) {
      // Manual navigation with next parameter
      router.push(next as any);
    } else {
      router.push('/home');
    }
  });

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
    <View style={tw`flex-1 bg-medical-neutral`}>
      <BlurredCircles />
      
      <ScrollView style={tw`flex-1`}>
        <View style={tw`container mt-4`}>
          {/* Verification Status Card */}
          <View style={tw`medical-card p-4 mb-6`}>
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
              text={setup === 'true' ? "Next Step" : "Submit Verification"} 
              onPress={onSubmit}
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
  );
};

export default IdentityVerificationScreen; 