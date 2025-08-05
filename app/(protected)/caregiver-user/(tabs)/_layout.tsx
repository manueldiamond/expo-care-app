import tw from '@/lib/tailwind';
import { useUserStore } from '@/stores/user-store';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabsLayout() {
  const user = useUserStore(s => s.user);
  const isPatient = user?.role === 'patient';

  console.log("TABBED LAYOUT TRIGGERED")

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: tw`bg-[#EEE] h-16 border-t border-medical-border py-1 rounded-t-4xl`,
        tabBarInactiveTintColor: tw.color('soft/35'),
        tabBarActiveTintColor: tw.color('medical-primary'),
        tabBarLabelStyle: tw`text-[10px] font-semibold`,
        tabBarBackground: () => <View />,
        animation: 'shift'
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
              name="chat-bubble" 
              size={size} 
              color={color} 
            />
          ),
        }}
      />
      {!isPatient && (
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
      )}
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