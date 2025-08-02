import tw from '@/lib/tailwind';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabsLayout() {

    console.log("TABBED LAYOUT TRIGGERED")

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: tw` bg-white h-16 border-t border-medical-border py-1 rounded-t-4xl`,
        tabBarInactiveTintColor: tw.color('soft/50'),
        tabBarActiveTintColor:tw.color('medical-primary'),
        tabBarLabelStyle: tw`text-xs font-medium`,
        tabBarBackground:()=><View />,
        animation:'shift'
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons 
              name="chat-bubble-outline" 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen 
        name="records"
        options={{
          title: 'Records',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons 
              name="folder" 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome 
              name="user" 
              size={size} 
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
} 