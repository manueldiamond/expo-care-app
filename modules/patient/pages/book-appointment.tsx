import BackHeader from '@/components/back-header';
import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const BookAppointment = () => {
  const date = 'February 21';
  const time = '02:00 PM';
  const person = 'Hannah';
  const currentDate = date;
  return (
    <View>
      <BackHeader title='Appointment' />
      <ScrollView style={tw`container`}>
        <View style={tw`flex-row justify-between bg-green-300 ss`}>
          <Text style={tw`font-semibold text-xl`}>{currentDate}</Text>
          <View style={tw`flex-row gap-5 centered bg-red-500`}>
            <TouchableOpacity onPress={() => {}}>
              <MaterialIcons name="chevron-left" size={20} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <MaterialIcons name="chevron-right" size={20} color={'white'} />
            </TouchableOpacity>
          </View>
        </View> 
        <Button text="Confirm" onPress={() => {}} />
      </ScrollView >
      <Modal
        visible={false}
        animationType="fade"
        // backdropColor={tw.color('black/50')}
      >
        <View style={tw`centered flex-1 container`}>
          <View style={tw`container bg-white rounded-2xl`}>
            <View style={tw`w-[156px] h-[156px] centered bg-[#E7F8F2]`}>
              <MaterialIcons name="thumb-up" size={72} color={tw.color('good')} />
            </View>
            <Text style={tw`font-medium text-[38px] mb-1 text-dark`}>Thank you !</Text>
            <Text style={tw`text-xl text-soft font-normal`}> Appointment Successfull</Text>
            <Text style={tw`text-sm py-7 font-normal`}>{`
                You booked an appointment with ${person}
                Family on ${date},
                at ${time}
              ` }</Text>
            <View>
              <Button text="Done" style={tw`w-full`} onPress={() => {}} />
              <Button text="Edit your appointment" style={tw`w-full`} ghost onPress={() => {}} />
            </View>
          </View>
        </View>
      </Modal >
    </View >
  );
};

export default BookAppointment; 