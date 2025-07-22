
// components/BottomSheet.tsx
import tw from '@/lib/tailwind';
import React from 'react';
import { Modal, StyleProp, View, ViewStyle } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  //runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  style,
}) => {
  const containerRef = useAnimatedRef();
  const measuredHeight = useSharedValue(0);
  const translateY = useSharedValue(999);

  // Measure height on mount and when visible
  const gesture = Gesture.Pan()
    .onStart(() => {
      // No-op
    })
    .onUpdate(event => {
      translateY.value = Math.max(0, event.translationY);
    })
    .onEnd(event => {
      if (event.velocityY > 600 && Math.abs(translateY.value) > (measuredHeight.value / 3)) {
        // Animate out
        translateY.value = withTiming(measuredHeight.value, { duration: .5, }, runOnJS(onClose));
      } else {
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Modal transparent
      animationType="fade"
      statusBarTranslucent
      visible={visible}
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={tw`bg-black/50 flex-1 justify-end`}>
        <Toast avoidKeyboard/>
        <GestureDetector gesture={gesture}>
          <Animated.View
            ref={containerRef}
            onLayout={event => {
              measuredHeight.value = event.nativeEvent.layout.height
              translateY.value = withTiming(0);
            }}
            style={[
              animatedStyle,
              tw`relative rounded-t-[30px] bg-white`,
              style,
            ]}
          >
            <View style={tw`bg-white top-full flex-1 h-full w-full absolute`} />
            <Animated.View style={tw`bg-soft w-[35%] rounded-full h-[5px] mx-auto my-5`} />
            {children}
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
      
    </Modal>
  );
};

export default BottomSheet;

