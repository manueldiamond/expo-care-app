import { createNotificationSocket } from '@/lib/socket';
import tw from '@/lib/tailwind';
import { getUnreadNotifications } from '@/modules/notifications/notifications-service';
import { useUserStore } from '@/stores/user-store';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

const NotificationBell = () => {
  const user = useUserStore(s => s.user);
  const [hasNew, setHasNew] = useState(false);

useEffect(() => {
    if (!user) {
        console.log('No user found, skipping socket setup');
        return;
    }
    const loadNotifications = async () => {
        try {
            const notifications = await getUnreadNotifications();
            setHasNew( notifications.length > 0)
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };
    loadNotifications();

    console.log('Creating notification socket for user:', user.id);
    const socket = createNotificationSocket(String(user?.id));
    socket.on('connect', () => {
        console.log('Notification socket connected');
    });
    socket.on('notification', (data: { type: string; message: string }) => {
        console.log('New notification received:', data);
        setHasNew(true);
    });
    return () => {
        console.log('Disconnecting notification socket');
        socket.disconnect();
    };
}, [user]);

  return (
    <TouchableOpacity
      style={tw`bg-white/20 rounded-full p-3`}
      onPress={() => {
        setHasNew(false);
        router.push('/notifications');
      }}
    >
      <MaterialIcons name="notifications" size={24} color="white" />
      {hasNew && (
        <View
          style={tw`absolute top-1 right-0 w-3 h-3 rounded-full bg-red-500`}
        />
      )}
    </TouchableOpacity>
  );
};

export default NotificationBell;
