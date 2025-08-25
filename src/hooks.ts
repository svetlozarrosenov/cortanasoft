import useSWR from 'swr';
import { requestNotificationPermission } from './notifications';

interface Permission {
  permission: NotificationPermission | null;
  token: string | null;
}

const key = 'notification-permission'
export const useNotificationPermission = () => {
  const { data: permission, error, mutate } = useSWR<Permission>(
    key,
    async () => {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
          const token = await requestNotificationPermission();
          if (token) {
            console.log('Firebase Token received:', token);
            return { permission, token };
          }
        }
        return { permission, token: null };
      }
      return { permission: null, token: null };
    }
  );

  return {
    permission,
    error,
    mutate
  };
};