import tw from '@/lib/tailwind';
import { updateAvailability } from '@/services/caregiver-service';
import { useUserStore } from '@/stores/user-store';
import { User } from '@/types';
import { extractApiError } from '@/utils/api-error';
import showToast from '@/utils/toast';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
const CaregiverStatusCard = () => {
    const updateUser = useUserStore(s => s.updateUser);
    const user = useUserStore(s => s.user);
    const isAvailable = ( user?.caregiver?.isAvailable && user?.caregiver?.isActive )?? false;
    const [loading, setLoading] = React.useState(false);
    const loadProfile = useUserStore(s => s.loadProfile);

    const toggleAvailability = async () => {
        if (!user?.caregiver?.id) return;
        setLoading(true);
        try {
            const user = await loadProfile();
            const updatedAvailability = !user?.caregiver?.isAvailable;
            await updateAvailability(updatedAvailability);
            updateUser({
                ...user,
                caregiver: {
                    ...user?.caregiver,
                    isAvailable: updatedAvailability
                },
            } as User);
        } catch (error) {
            const errMsg = extractApiError(error, 'Failed to update availability');
            showToast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={tw`medical-card p-4`}>
            <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-col gap-0`}>
                    <Text style={tw`medical-text text-base font-semibold`}>Status</Text>
                    <Text style={tw`medical-text-light text-xs font-normal`}>
                        {isAvailable ? 'Available for patients' : 'Currently unavailable'}
                    </Text>
                </View>
                <TouchableOpacity
                    style={tw`${!isAvailable ? 'bg-medical-error/40 text-medical-text' : 'bg-medical-success'} rounded-2xl px-4 py-2 centered`}
                    onPress={toggleAvailability}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={tw.color('white')} />
                    ) : (
                        <Text style={tw`text-white font-medium text-sm`}>
                            {isAvailable ? 'Available' : 'Unavailable'}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CaregiverStatusCard