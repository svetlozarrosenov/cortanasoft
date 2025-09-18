import axios from 'axios';
import useSWR from 'swr';

const urls = {
    createLots: `${process.env.NEXT_PUBLIC_BACK_END_URL}/lots/create`,
    fetchLots: `${process.env.NEXT_PUBLIC_BACK_END_URL}/lots`,
    fetchAvailableLots: `${process.env.NEXT_PUBLIC_BACK_END_URL}/lots/available`,
};

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

export const createLots = async (lotsData: any) => {
    try {
      const result = await axios.post(urls.createLots, lotsData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };


export function useLots() {
  const { data: lots, error, mutate } = useSWR(urls.fetchLots, fetcher);

  return {
    lots,
    isLoading: !error && !lots,
    error,
    mutate,
  };
}

export function useAvailableLots() {
  const { data: lots, error, mutate } = useSWR(urls.fetchAvailableLots, fetcher);

  return {
    lots,
    isLoading: !error && !lots,
    error,
    mutate,
  };
}