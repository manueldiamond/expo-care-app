import tw from '@/lib/tailwind';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Notification } from '../notifications-service';

interface NotificationItemProps {
  notification: Notification;
  onPress: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onPress }) => {
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

  return (
    <TouchableOpacity
      style={tw`bg-medical-card rounded-lg p-4 mb-3 ${!notification.isRead ? 'border-l-4 border-medical-primary' : ''}`}
      onPress={() => onPress(notification.id)}
      activeOpacity={0.7}
    >
      <View style={tw`flex-row items-start`}>
        <View 
          style={[
            tw`w-10 h-10 rounded-full centered mr-3`,
            { backgroundColor: getNotificationColor(notification.type) + '20' }
          ]}
        >
          <MaterialIcons 
            name={getNotificationIcon(notification.type) as any} 
            size={20} 
            color={getNotificationColor(notification.type)} 
          />
        </View>
        <View style={tw`flex-1`}>
          <View style={tw`flex-row items-center justify-between mb-1`}>
            <Text style={tw`medical-text text-base font-semibold ${!notification.isRead ? 'font-bold' : ''}`}>
              {notification.title}
            </Text>
            {!notification.isRead && (
              <View style={tw`w-2 h-2 rounded-full bg-medical-primary`} />
            )}
          </View>
          <Text style={tw`medical-text-light text-sm font-normal mb-2`}>
            {notification.message}
          </Text>
          <Text style={tw`medical-text-light text-xs font-normal`}>
            {notification.timestamp}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem; 