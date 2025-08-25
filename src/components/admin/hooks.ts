import useSWR from 'swr';
import axios from 'axios';

export const urls = {
    fetchDevices: `${import.meta.env.VITE_BACK_END_URL}/devices/admin/list`,
    installDevice: (id: string) => `${import.meta.env.VITE_BACK_END_URL}/devices/install/${id}`,
    fetchClients: `${import.meta.env.VITE_BACK_END_URL}/clients/list`,
    generateQRToeknResell: () => `${import.meta.env.VITE_BACK_END_URL}/devices/qr/token/resell`,
    createDevice: `${import.meta.env.VITE_BACK_END_URL}/devices/admin/create`,
};
const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

export const generateQaTokenResellMutate = async (id: string,) => {
  try {
    console.log('crb_id', id)
    const result = await axios.post(urls.generateQRToeknResell(), {
      id
    }, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error installing device software:', error);
      throw error;
    }
}

export function useDevices() {
  const { data: devices, error } = useSWR(urls.fetchDevices, fetcher);

  return {
    devices,
    isLoading: !error && !devices,
    error
  };
}

export const installDeviceSoftwareMutate = async (id: string,) => {
  try {
    const result = await axios.put(urls.installDevice(id), null, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error installing device software:', error);
      throw error;
    }
}

export function useClients() {
  const { data: clients, error, mutate } = useSWR(urls.fetchClients, fetcher);

  return {
    clients,
    isLoading: !error && !clients,
    error,
    mutate
  };
}

export const createDeviceMutate = async (type='sensor') => {
    try {
        const result = await axios.post<any>(urls.createDevice, {type}, { withCredentials: true });
        return result.data;
      } catch (error) {
        console.error('Error creating product:', error);
        throw error;
      }
}