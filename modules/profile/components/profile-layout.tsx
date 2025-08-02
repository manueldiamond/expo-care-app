import BackHeader from '@/components/back-header';
import BlurredCircles from '@/components/blurred-circles';
import tw from '@/lib/tailwind';
import React from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';

interface ProfileLayoutProps {
  heading?: string;
  title?: string;
  subtext?: string;
  additionalTopContent?: React.ReactNode;
  children: React.ReactNode;
  hideHeader?: boolean;
  backVisible?: boolean;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  heading,
  title,
  subtext,
  additionalTopContent,
  children,
  hideHeader,
  backVisible,
}) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={tw`flex-1`}
    >
      <View style={tw`flex-1 bg-light`}>
        <BlurredCircles />
        <View style={tw`bg-good w-full rounded-b-[30px]`}>

          {!hideHeader && <BackHeader backVisible={backVisible} title={title} bbackColor={tw.color('good')} titleStyle={tw`text-light`} />}

          <View style={tw`pb-[30px] centered container`}>
            {heading && <Text style={tw`text-base text-light font-medium`}>{heading}</Text>}
            {subtext && <Text style={tw`text-sm text-center text-light leading-[1.68] mt-2.5 mb-5 font-normal`}>
              {subtext}
            </Text>}
            {additionalTopContent}
          </View>
        </View>
        {children}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ProfileLayout; 
