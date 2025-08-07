import BlurredCircles from '@/components/blurred-circles';
import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import { getVerification } from '@/services/caregiver-service';
import { useUserStore } from '@/stores/user-store';
import { $Enums, type Verification } from '@/types';
import showToast from '@/utils/toast';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const STATUS_MAP = {
  not_started: {
    color: tw.color('medical-accent'),
    text: 'Not Started',
    desc: 'You have not started the verification process.',
  },
  pending: {
    color: tw.color('medical-accent'),
    text: 'Pending',
    desc: 'Your verification is currently under review.',
  },
  verified: {
    color: tw.color('medical-success'),
    text: 'Verified',
    desc: 'Your identity has been successfully verified.',
  },
  rejected: {
    color: tw.color('medical-error'),
    text: 'Rejected',
    desc: 'Please resubmit your documents for verification.',
  },
};

const IdentityVerificationScreen = () => {
  const { next, setup } = useLocalSearchParams();
  const { handleSubmit } = useForm();
  const user = useUserStore(s => s.user);

  const [status, setStatus] = useState<'not_started' | 'pending' | 'verified' | 'rejected'>('not_started');
  const [verification, setVerification] = useState<Verification | null | undefined>(undefined);

  // Get caregiver id
  const caregiverId = user?.caregiver?.id;

  // Function to get step status based on verification data
  const getStepStatus = (step: number) => {
    if (!verification) return 'pending';
    if (verification.status===$Enums.VerificationStatus.REJECTED) return 'rejected';
    switch (step) {
      case 1: // Upload ID Document
        return verification.document ? 'completed' : 'pending';
      case 2: // Selfie Verification
        return verification.photo ? 'completed' : 'pending';
      case 3: // Background Check
        return user?.caregiver?.isVerified ? 'completed' : 'pending';
      default:
        return 'pending';
    }
  };

  // Function to get icon and color for step status
  const getStepIcon = (stepStatus: string) => {
    switch (stepStatus) {
      case 'completed':
        return { name: 'check-circle', color: tw.color('medical-success') };
      case 'rejected':
        return { name: 'error', color: tw.color('medical-error') };
      case 'pending':
      default:
        return { name: 'pending', color: tw.color('medical-accent') };
    }
  };

  // Function to get step background color
  const getStepBackgroundColor = (stepStatus: string) => {
    switch (stepStatus) {
      case 'completed':
        return tw.color('medical-success');
      case 'rejected':
        return tw.color('medical-error');
      case 'pending':
      default:
        return tw.color('medical-primary');
    }
  };

  useEffect(() => {
    let ignore = false;
    const fetchVerification = async () => {
      if (!caregiverId) {
        setStatus('not_started');
        setVerification(undefined);
        return;
      }
      try {
        const verificationData = await getVerification(caregiverId);
        
        console.log('Verification Data:', verificationData);
        if (ignore) return;
        setVerification(verificationData);
        if (!verificationData) {
          setStatus('not_started');
        } else if (user?.caregiver?.isVerified) {
          setStatus('verified');
        } else if (verificationData.status === $Enums.VerificationStatus.REJECTED) 
          setStatus('rejected');
        else if (verificationData.status === $Enums.VerificationStatus.PENDING) {
          setStatus('pending'); 
        }else{
          setStatus('pending');
        }
      } catch (e) {
        setStatus('not_started');
        setVerification(undefined);
      }
    };
    fetchVerification();
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caregiverId, user?.caregiver?.isVerified]);

  // If status is pending, navigate to begin-verification screen
  const onSubmit = handleSubmit((data) => {
    // This is a placeholder, as the actual submission is not handled here
    showToast.success('Identity verification submitted successfully');
    if (setup === 'true') {
      router.push('/home');
    } else if (next) {
      router.push(next as any);
    } else {
      router.push('/home');
    }
  });

  const statusInfo = STATUS_MAP[status];

  return (
    <View style={tw`flex-1 bg-medical-neutral`}>
      <BlurredCircles />
      <ScrollView style={tw`flex-1`}>
        <View style={tw`container mt-4`}>
          {/* Verification Status Card */}
          <TouchableOpacity onPress={()=>status!=='verified'&&router.push('/profile/begin-verification')}>
            <View style={tw`medical-card p-4 mb-6`}>
              <View style={tw`flex-row items-center`}>
                <View
                  style={[
                    tw`w-12 h-12 rounded-full centered mr-4`,
                    { backgroundColor: statusInfo.color + '20' }
                  ]}
                >
                  <MaterialIcons
                    name="verified-user"
                    size={24}
                    color={statusInfo.color}
                  />
                </View>
                <View style={tw`flex-1`}>
                  <Text style={tw`medical-text text-base font-semibold`}>
                    {statusInfo.text}
                  </Text>
                  <Text style={tw`medical-text-light text-sm font-normal`}>
                    {statusInfo.desc}
                  </Text>
                </View>
                    {status!=='verified'&&<MaterialIcons 
                      name='chevron-right'
                      size={24}
                      color={tw.color('medical-text/50')}
                    />}
              </View>
            </View>
          </TouchableOpacity>
          {/* Verification Steps */}
          <Text style={tw`medical-text text-xl font-semibold mb-4`}>Verification Steps</Text>
          <View style={tw`medical-card p-6 mb-6`}>
            <View style={tw`space-y-4`}>
              {/* Step 1 */}
              <View style={tw`flex-row items-center`}>
                <View 
                  style={[
                    tw`w-8 h-8 rounded-full centered mr-4`,
                    { backgroundColor: getStepBackgroundColor(getStepStatus(1)) }
                  ]}
                >
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
                  name={getStepIcon(getStepStatus(1)).name as any}
                  size={24}
                  color={getStepIcon(getStepStatus(1)).color}
                />
              </View>
              {/* Step 2 */}
              <View style={tw`flex-row items-center`}>
                <View 
                  style={[
                    tw`w-8 h-8 rounded-full centered mr-4`,
                    { backgroundColor: getStepBackgroundColor(getStepStatus(2)) }
                  ]}
                >
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
                  name={getStepIcon(getStepStatus(2)).name as any}
                  size={24}
                  color={getStepIcon(getStepStatus(2)).color}
                />
              </View>
              {/* Step 3 */}
              <View style={tw`flex-row items-center`}>
                <View 
                  style={[
                    tw`w-8 h-8 rounded-full centered mr-4`,
                    { backgroundColor: getStepBackgroundColor(getStepStatus(3)) }
                  ]}
                >
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
                  name={getStepIcon(getStepStatus(3)).name as any}
                  size={24}
                  color={getStepIcon(getStepStatus(3)).color}
                />
              </View>
            </View>
          </View>
          {/* Required Documents */}
          {status==='not_started'&& <> 
            <Text style={tw`medical-text text-xl font-semibold mb-4`}>Required Documents</Text>
            <View style={tw`medical-card p-6 mb-6`}>
              <View style={tw`space-y-4`}>
                <View style={tw`flex-row items-center`}>
                  <MaterialIcons name="description" size={24} color={tw.color('medical-primary')} />
                  <Text style={tw`medical-text text-base font-normal ml-3`}>
                    Government-issued ID (Ghana Card Passport, etc.)
                  </Text>
                </View>
                <View style={tw`flex-row items-center`}>
                  <MaterialIcons name="camera-alt" size={24} color={tw.color('medical-primary')} />
                  <Text style={tw`medical-text text-base font-normal ml-3`}>
                    Recent passport-style photo
                  </Text>
                </View>
              </View>
            </View>
          </> }
          {/* Action Buttons */}
          {status !== 'verified' && (
            <Button
              text={status==='pending' ? "Update Verification" : "Begin Verification"}
              onPress={() => router.push('/profile/begin-verification')}
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
  );
};

export default IdentityVerificationScreen;