import tw from '@/lib/tailwind';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {

    console.log("TABBED LAYOUT TRIGGERED")

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          tw`bg-white h-20 py-2`,
          {
            shadowColor: '#FFF',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 8, // for Android
          }
        ],
        tabBarActiveTintColor: tw.color('good'),
        tabBarInactiveTintColor: tw.color('soft'),
        tabBarLabelStyle: tw`text-xs font-medium`,
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
        name="patients"
        options={{
          title: 'Patients',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people" size={size} color={color} />
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