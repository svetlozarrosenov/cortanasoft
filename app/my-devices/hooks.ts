import useSWR, { mutate } from 'swr';
import axios from 'axios';

export const URLs = {
    fetchUserDevices: `${process.env.NEXT_PUBLIC_BACK_END_URL}/devices/client/list`,
    fetchDeviceSubscribers: (deviceId: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/devices/subscribers/${deviceId}`,
    editDevice: (deviceId: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/devices/client/edit/${deviceId}`,
    shareDevice: `${process.env.NEXT_PUBLIC_BACK_END_URL}/devices/qr/token`,
    acquireDevice: `${process.env.NEXT_PUBLIC_BACK_END_URL}/devices/acquire`,
    unsubscribeToDevice: (deviceId: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/devices/unsubscribe/${deviceId}`,
    removeDeviceSubscriber: (subscriberEmail: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/devices/remove/subscriber/${subscriberEmail}`,

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

export function useDeviceSubscribers(deviceId: string) {
  const { data: subscribers, error } = useSWR(URLs.fetchDeviceSubscribers(deviceId), fetcher);

  return {
    subscribers,
    isLoading: !error && !subscribers,
    error
  };
}

export const editDeviceMutate = async (id: string, protectedItem: string) => {
  try {
    const result = await axios.put(URLs.editDevice(id), {protectedItem}, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error installing device software:', error);
      throw error;
    }
}

export const shareDeviceMutate = async (deviceId: string) => {
  try {
    const result = await axios.post(URLs.shareDevice, {deviceId}, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error installing device software:', error);
      throw error;
    }
}

export const removeDeviceSubscriber = async (deviceId: string) => {
  try {
    await axios.post(URLs.removeDeviceSubscriber(deviceId), {}, { withCredentials: true });
    mutate(URLs.fetchUserDevices);
  } catch (error) {
    console.error('Error unsubscribing from device:', error);
    throw error;
  }
};

export const acquireDeviceMutate = async (token: string) => {
  try {
    const result = await axios.post(URLs.acquireDevice, {token}, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error installing device software:', error);
      throw error;
    }
}