import BackHeader from '@/components/back-header';
import tw from '@/lib/tailwind';
import React from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';

interface ProfileLayoutProps {
  heading?: string;
  title?: string;
  subtext?: string;
  additionalTopContent?: React.ReactNode;
  children: React.ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  heading,
  title,
  subtext,
  additionalTopContent,
  children,
}) => {
  return (
    <KeyboardAvoidingView
			behavior="padding"
			style={tw`flex-1`}
  	>
    <View style={tw`flex-1 bg-[#F9F8F8]`}>
      <View style={tw`bg-good w-full rounded-b-[30px]`}>
        <BackHeader title={title} backColor={tw.color('good')} titleStyle={tw`text-white`}/>
        <View style={tw`py-[30px] centered container`}>
          {heading && <Text style={tw`text-base text-white font-medium`}>{heading}</Text>}
          {subtext && <Text style={tw`text-sm text-center text-white leading-[1.68] mt-2.5 mb-5`}>
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