import useSWR from 'swr';
import { mutate } from 'swr';
import axios from 'axios';

const urls = {
    fetchAlarms: `${import.meta.env.VITE_BACK_END_URL}/alarm/list`,
    deleteAllAlarms: `${import.meta.env.VITE_BACK_END_URL}/alarm/delete`,
    deleteAllAlarm: (alarmId: string) => `${import.meta.env.VITE_BACK_END_URL}/alarm/delete/${alarmId}`
};
const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

export function useAlarms() {
  const { data: alarms, error, mutate } = useSWR(urls.fetchAlarms, fetcher);

  return {
    alarms,
    isLoading: !error && !alarms,
    error,
    mutate,
  };
}

export async function deleteAlarmsMutate() {
    try {
      await axios.post(urls.deleteAllAlarms, {}, { withCredentials: true });
      
      mutate(urls.fetchAlarms, [], false);
      
      return true;
    } catch (error) {
      console.error('Error deleting the alarms:', error);
      throw error;
    }
  };

  export async function deleteAlarmMutate(alarmId: string) {
    try {
      await axios.post(urls.deleteAllAlarm(alarmId), {}, { withCredentials: true });
      
      mutate(urls.fetchAlarms);
      
      return true;
    } catch (error) {
      console.error('Error deleting the alarms:', error);
      throw error;
    }
  }; 
