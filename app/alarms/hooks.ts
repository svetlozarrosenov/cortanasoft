import useSWR from 'swr';
import { mutate } from 'swr';
import axios from 'axios';

const urls = {
    fetchAlarms: `${process.env.NEXT_PUBLIC_BACK_END_URL}/alarm/list`,
    deleteAllAlarms: `${process.env.NEXT_PUBLIC_BACK_END_URL}/alarm/delete`,
    deleteAllAlarm: (alarmId: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/alarm/delete/${alarmId}`
};
const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

export function useAlarms() {
  console.log('crb_urls.fetchAlarms', urls.fetchAlarms)
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
