import tw from '@/lib/tailwind';
import { useUserStore } from '@/stores/user-store';
import { $Enums, Verification } from '@/types';
import API_ENDPOINTS from '@/utils/api';
import api from '@/utils/axios';
import { isProfileComplete } from '@/utils/profile-utils';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Section } from './Section';

export type PendingAction = {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: string;
  route: string;
  color: string;
};

interface PendingActionsProps {
  userRole: 'caregiver' | 'patient';
  customActions?: PendingAction[];
}

const PendingActions: React.FC<PendingActionsProps> = ({ userRole, customActions = [] }) => {
  const user = useUserStore(s => s.user);
  const router = useRouter();
  const [showVerify, setShowVerify] = useState(false);

  // Fetch verification status for caregivers
  useEffect(() => {
    const fetchVerification = async () => {
      if (userRole === 'caregiver' && user?.role === 'caregiver' && user.caregiver?.id) {
        try {
          const { data } = await api.get<{ verification: Verification }>(
            API_ENDPOINTS.GET_VERIFICATION(user.caregiver.id)
          );
          setShowVerify(
            (!data?.verification || (data.verification?.status===$Enums.VerificationStatus.REJECTED)) 
              ? true 
              : !user.caregiver.isVerified
          );
        } catch (e) {
          setShowVerify(false);
        }
      } else {
        setShowVerify(false);
      }
    };
    fetchVerification();
  }, [userRole, user?.role, user?.caregiver?.id, user?.caregiver?.isVerified]);

  // Internal variables to check profile completion
  const profileComplete = isProfileComplete(user);

  // Generate pending actions based on user role and state
  const generatePendingActions = (): PendingAction[] => {
    const baseActions: PendingAction[] = [];

    // Common actions for both roles
    if (!profileComplete) {
      baseActions.push({
        title: 'Complete Profile Setup',
        description: 'Add your personal information',
        priority: 'high',
        icon: 'person-add',
        route: userRole === 'caregiver' 
          ? '/profile/personal-info?setup=true'
          : '/profile/medical-info',
        color: '#FF6B35'
      });
    }

    // Caregiver-specific actions
    if (userRole === 'caregiver') {
      if (showVerify) {
        baseActions.push({
          title: 'Verify Identity',
          description: 'Upload required documents',
          priority: 'medium',
          icon: 'verified-user',
          route: '/profile/identity-verification',
          color: '#F5A623'
        });
      }
    }

    // Add custom actions
    return [...baseActions, ...customActions];
  };

  const pendingActions = generatePendingActions();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return tw.color('medical-error');
      case 'medium':
        return tw.color('medical-accent');
      case 'low':
        return tw.color('medical-success');
      default:
        return tw.color('medical-text-light');
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Medium Priority';
      case 'low':
        return 'Low Priority';
      default:
        return 'Priority';
    }
  };

  // Don't render if no pending actions
  if (pendingActions.length === 0) {
    return null;
  }

  return (
    <Section title="Pending Actions">
      <View style={tw`flex-col gap-3`}>
        {pendingActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={tw`bg-medical-neutral rounded-2xl p-4 flex-row items-center`}
            onPress={() => router.push(action.route as any)}
            activeOpacity={0.7}
          >
            <View 
              style={[
                tw`w-12 h-12 rounded-full centered mr-4`,
                { backgroundColor: action.color + '20' }
              ]}
            >
              <MaterialIcons name={action.icon as any} size={24} color={action.color} />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`medical-text text-base font-semibold`}>
                {action.title}
              </Text>
              <Text style={tw`medical-text-light text-sm font-normal`}>
                {action.description}
              </Text>
              <View style={tw`flex-row items-center mt-1`}>
                <View 
                  style={[
                    tw`w-2 h-2 rounded-full mr-2`,
                    { backgroundColor: getPriorityColor(action.priority) }
                  ]}
                />
                <Text style={tw`medical-text-light text-xs font-normal`}>
                  {getPriorityText(action.priority)}
                </Text>
              </View>
            </View>
            <MaterialIcons 
              name="chevron-right" 
              size={24} 
              color={tw.color('medical-text-light')} 
            />
          </TouchableOpacity>
        ))}
      </View>
    </Section>
  );
};

export default PendingActions; 