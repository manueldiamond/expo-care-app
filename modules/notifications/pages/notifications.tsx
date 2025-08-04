import BlurredCircles from '@/components/blurred-circles';
import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Sarah Johnson has been confirmed for tomorrow at 2:00 PM.',
    type: 'success',
    timestamp: '2 hours ago',
    isRead: false,
  },
  {
    id: '2',
    title: 'New Message',
    message: 'You have a new message from your caregiver regarding your medication schedule.',
    type: 'info',
    timestamp: '4 hours ago',
    isRead: false,
  },
  {
    id: '3',
    title: 'Profile Update Required',
    message: 'Please update your medical information to ensure we can provide the best care.',
    type: 'warning',
    timestamp: '1 day ago',
    isRead: true,
  },
  {
    id: '4',
    title: 'Payment Successful',
    message: 'Your payment of $150 has been processed successfully.',
    type: 'success',
    timestamp: '2 days ago',
    isRead: true,
  },
  {
    id: '5',
    title: 'Care Plan Updated',
    message: 'Your care plan has been updated with new recommendations from your healthcare team.',
    type: 'info',
    timestamp: '3 days ago',
    isRead: true,
  },
];

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'info';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return tw.color('medical-success');
      case 'warning':
        return tw.color('medical-accent');
      case 'error':
        return tw.color('medical-error');
      default:
        return tw.color('medical-primary');
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={tw`bg-medical-card rounded-lg p-4 mb-3 ${!item.isRead ? 'border-l-4 border-medical-primary' : ''}`}
      onPress={() => markAsRead(item.id)}
      activeOpacity={0.7}
    >
      <View style={tw`flex-row items-start`}>
        <View 
          style={[
            tw`w-10 h-10 rounded-full centered mr-3`,
            { backgroundColor: getNotificationColor(item.type) + '20' }
          ]}
        >
          <MaterialIcons 
            name={getNotificationIcon(item.type) as any} 
            size={20} 
            color={getNotificationColor(item.type)} 
          />
        </View>
        <View style={tw`flex-1`}>
          <View style={tw`flex-row items-center justify-between mb-1`}>
            <Text style={tw`medical-text text-base font-semibold ${!item.isRead ? 'font-bold' : ''}`}>
              {item.title}
            </Text>
            {!item.isRead && (
              <View style={tw`w-2 h-2 rounded-full bg-medical-primary`} />
            )}
          </View>
          <Text style={tw`medical-text-light text-sm font-normal mb-2`}>
            {item.message}
          </Text>
          <Text style={tw`medical-text-light text-xs font-normal`}>
            {item.timestamp}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <View style={tw`flex-1 bg-medical-neutral`}>
      <BlurredCircles />
      
      <ScrollView style={tw`flex-1`}>
        <View style={tw`container mt-4`}>
          {/* Header */}
          <View style={tw`flex-row items-center justify-between mb-6`}>
            <View>
              <Text style={tw`medical-text text-2xl font-bold`}>Notifications</Text>
              <Text style={tw`medical-text-light text-sm font-normal`}>
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </Text>
            </View>
            {unreadCount > 0 && (
              <TouchableOpacity
                style={tw`bg-medical-primary rounded-lg px-4 py-2`}
                onPress={markAllAsRead}
              >
                <Text style={tw`text-white font-medium text-sm`}>Mark All Read</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Notifications List */}
          {notifications.length === 0 ? (
            <View style={tw`medical-card p-8 items-center`}>
              <MaterialIcons 
                name="notifications-none" 
                size={48} 
                color={tw.color('medical-text-light')} 
              />
              <Text style={tw`medical-text text-lg font-semibold mt-4`}>
                No Notifications
              </Text>
              <Text style={tw`medical-text-light text-sm font-normal text-center mt-2`}>
                You're all caught up! Check back later for updates.
              </Text>
            </View>
          ) : (
            <View style={tw`medical-card p-4`}>
              <FlatList
                data={notifications}
                renderItem={renderNotification}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen; 