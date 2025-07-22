import Toast from 'react-native-toast-message';

/**
 * Toast notification utility for displaying messages throughout the app
 * 
 * Usage:
 * import { showToast } from '@/utils/toast'
 * 
 * // Success message
 * showToast.success('Success!', 'Operation completed successfully')
 * 
 * // Error message  
 * showToast.error('Error', 'Please try again later')
 * 
 * // Info message
 * showToast.info('Info', 'Check your email')
 * 
 * // Warning message
 * showToast.warning('Warning', 'Please review your input')
 */

export const showToast = {
  success: (title: string, message?: string) => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 3000,
    });
  },

  error: (title: string, message?: string) => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
      position: 'bottom',
      visibilityTime: 4000,
    });
  },

  info: (title: string, message?: string) => {
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 3000,
    });
  },

  warning: (title: string, message?: string) => {
    Toast.show({
      type: 'warning',
      text1: title,
      text2: message,
      position: 'top',
      visibilityTime: 3500,
    });
  },
};

export default showToast; 
