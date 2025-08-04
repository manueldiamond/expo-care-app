import tw from '@/lib/tailwind';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

interface LoadingProps {
  message?: string;
  showLogo?: boolean;
  size?: 'small' | 'large';
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({
  message = 'Loading...',
  showLogo = true,
  size = 'large',
  color
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    // Scale and opacity animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value }
      ],
      opacity: opacity.value,
    };
  });

  const logoContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: interpolate(scale.value, [1, 1.2], [1, 1.1]) }
      ],
    };
  });

  const defaultColor = color || tw.color('medical-primary');

  return (
    <View style={tw`flex-1 justify-center items-center bg-medical-neutral`}>
      <View style={tw`items-center`}>
        {showLogo && (
          <Animated.View style={[tw`mb-6`, logoContainerStyle]}>
            <Animated.View style={[tw`items-center justify-center`, logoAnimatedStyle]}>
              <View style={[
                tw`w-20 h-20 rounded-full items-center justify-center`,
              ]}>
              {/* App logo icon in the loading spinner */}
              <Image
                source={require('@/assets/images/icon.png')}
                style={tw`w-10 h-10`}
                resizeMode="contain"
              />
              </View>
            </Animated.View>
          </Animated.View>
        )}
        
        <ActivityIndicator 
          size={size} 
          color={defaultColor} 
          style={tw`mb-4`}
        />
        
        <Text style={tw`text-medical-text/40 text-xs capitalize font-semibold text-center`}>
          {message}
        </Text>
      </View>
    </View>
  );
};

export default Loading; 