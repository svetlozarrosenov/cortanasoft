import useSWR, { mutate } from 'swr';
import axios from 'axios';

export const URLs = {
    fetchUserDevices: `${import.meta.env.VITE_BACK_END_URL}/devices/client/list`,
    fetchDeviceSubscribers: (deviceId: string) => `${import.meta.env.VITE_BACK_END_URL}/devices/subscribers/${deviceId}`,
    editDevice: (deviceId: string) => `${import.meta.env.VITE_BACK_END_URL}/devices/client/edit/${deviceId}`,
    shareDevice: `${import.meta.env.VITE_BACK_END_URL}/devices/qr/token`,
    subscribeToDevice: `${import.meta.env.VITE_BACK_END_URL}/devices/subscribe`,
    unsubscribeToDevice: (deviceId: string) => `${import.meta.env.VITE_BACK_END_URL}/devices/unsubscribe/${deviceId}`,
    removeDeviceSubscriber: (subscriberEmail: string) => `${import.meta.env.VITE_BACK_END_URL}/devices/remove/subscriber/${subscriberEmail}`,

};
const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

export function useUserDevices() {
    const { data: devices, error } = useSWR(URLs.fetchUserDevices, fetcher);
  
    return {
      devices,
      isLoading: !error && !devices,
      error
    };
  }

  export const subscribeToDeviceMutate = async (token: string) => {
    try {
      const result = await axios.post(URLs.subscribeToDevice, {token}, { withCredentials: true });
        return result.data;
      } catch (error) {
        console.error('Error installing device software:', error);
        throw error;
      }
  }
  
  export const unsubscribeFromDeviceMutate = async (deviceId: string) => {
    try {
      await axios.post(URLs.unsubscribeToDevice(deviceId), {}, { withCredentials: true });
      mutate(URLs.fetchUserDevices);
    } catch (error) {
      console.error('Error unsubscribing from device:', error);
      throw error;
    }
  };