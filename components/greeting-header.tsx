import tw from '@/lib/tailwind'
import { placeholderProfileImage } from '@/modules/profile/data'
import { useUserStore } from '@/stores/user-store'
import { $Enums } from '@/types'
import showToast from '@/utils/toast'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import NotificationBell from './NotificationBell'
import BottomSheet from './bottom-sheet'
import Button from './ui/button'
const GreetingHeader = ({role}:{role?:$Enums.Role}) => {
    const [showVerificationSheet, setShowVerificationSheet] = useState(false)
    const user = useUserStore(s => s.user)
    const displayName = user?.fullname || user?.email || 'Caregiver'
    const profileImageUrl = user?.photoUrl
    let tag = user?.caregiver?.type || role===$Enums.Role.CAREGIVER?'Caregiver':'Patient'
    tag = tag.charAt(0).toUpperCase() + tag.slice(1)
    const loadProfile = useUserStore(s => s.loadProfile)
    const [loading, setLoading] = useState(false)
    const handleCheckVerification = async () => {
        setLoading(true)
        const user= await loadProfile()
        if(user?.caregiver?.isVerified){
            setShowVerificationSheet(false)
        }else{
            showToast.error('You are not verified') 
        }
        setLoading(false)
    }
    return (
        <View style={tw`flex-row items-center justify-between mb-6`}>
            <View style={tw`flex-row items-center`}>
                <Image
                    source={profileImageUrl ? { uri: profileImageUrl } : placeholderProfileImage}
                    style={tw`w-16 h-16 rounded-full mr-4 border-2 border-white`}
                />
                <View>
                    <Text style={tw`text-white text-xl font-semibold`}>
                        Welcome back
                    </Text>
                    <Text style={tw`text-white/80 text-sm font-normal`}>
                        {displayName}
                    </Text>
                    {(user?.caregiver?.isVerified||user?.role!==$Enums.Role.CAREGIVER) ? (
                        <Text style={tw`capitalize text-white/50 text-xs font-semibold`}>
                            {tag}
                        </Text>
                    ) : (
                        <>
                            <TouchableOpacity
                                onPress={() => setShowVerificationSheet(true)}
                                style={tw`flex-row items-center centered mt-1 bg-medical-error/20 px-2 py-1 rounded-full`}
                            >
                                <MaterialIcons name="error-outline" size={16} color={tw.color('medical-error')} style={tw`mr-1`} />
                                <Text style={tw`text-medical-error text-xs font-semibold mr-2`}>
                                    Not Verified!
                                </Text>
                            </TouchableOpacity>
                            <BottomSheet
                                visible={showVerificationSheet}
                                onClose={() => setShowVerificationSheet(false)}
                            >
                                <View style={tw`p-6`}>
                                    <Text style={tw`text-lg font-bold mb-2 text-center`}>
                                        You're not listed on the platform yet
                                    </Text>
                                    <Text style={tw`text-base text-center mb-4`}>
                                        You are not verified.
                                        Ensure that all verification documents are submitted and an admin will approve you on the platform.
                                    </Text>
                                    <Button
                                        disabled={loading}
                                        text="Check Verification"
                                        onPress={handleCheckVerification}
                                        style={tw`mb-2`}
                                    />
                                    <Button
                                        text="View Verification"
                                        onPress={() => {
                                            setShowVerificationSheet(false)
                                            router.push('/profile/identity-verification')
                                        }}
                                        style={tw`mb-2`}
                                    />
                                    <Button
                                        text="Close"
                                        onPress={() => setShowVerificationSheet(false)}
                                        ghost
                                    />
                                </View>
                            </BottomSheet>
                        </>
                    )}
                </View>
            </View>
            <NotificationBell />
        </View>
    )
}

export default GreetingHeader
