import API_ENDPOINTS from '@/utils/api';
import api from '@/utils/axios';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  isRead: boolean;
}

// Get all notifications for the current user
export const getNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await api.get(API_ENDPOINTS.NOTIFICATIONS);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    return [];
  }
};

// Mark a notification as read
export const markNotificationAsRead = async (notificationId: string): Promise<boolean> => {
  try {
    await api.patch(`${API_ENDPOINTS.NOTIFICATIONS}/${notificationId}/read`);
    return true;
  } catch (error) {
    console.error('Failed to mark notification as read:', error);
    return false;
  }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (): Promise<boolean> => {
  try {
    await api.patch(`${API_ENDPOINTS.NOTIFICATIONS}/read-all`);
    return true;
  } catch (error) {
    console.error('Failed to mark all notifications as read:', error);
    return false;
  }
};

// Delete a notification
export const deleteNotification = async (notificationId: string): Promise<boolean> => {
  try {
    await api.delete(`${API_ENDPOINTS.NOTIFICATIONS}/${notificationId}`);
    return true;
  } catch (error) {
    console.error('Failed to delete notification:', error);
    return false;
  }
}; 