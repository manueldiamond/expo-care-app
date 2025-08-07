import API_ENDPOINTS from '@/utils/api';
import api from '@/utils/axios';

export interface Notification {
  id: number;
  userId: number;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// Get unread notifications for the current user
export const getUnreadNotifications = async (): Promise<Notification[]> => {
  const response = await api.get(API_ENDPOINTS.GET_UNREAD_NOTIFICATIONS);
  return response.data;
};

// Get all notifications for the current user
export const getAllNotifications = async (): Promise<Notification[]> => {
  const response = await api.get(API_ENDPOINTS.GET_ALL_NOTIFICATIONS);
  return response.data;
};

// Mark all notifications as read
export const markAllNotificationsRead = async (): Promise<boolean> => {
  const response = await api.patch(API_ENDPOINTS.MARK_ALL_READ);
  return response.data.success === true;
};

// Mark a specific notification as read
export const markNotificationRead = async (notificationId: number): Promise<boolean> => {
  const response = await api.patch(API_ENDPOINTS.MARK_READ(notificationId));
  return response.data.success === true;
};

// Delete a specific notification
export const deleteNotification = async (notificationId: number): Promise<boolean> => {
  const response = await api.delete(API_ENDPOINTS.DELETE_NOTIFICATION(notificationId));
  return response.data.success === true;
};