import axios from 'axios';
import useSWR from 'swr';

const urls = {
    fetchLots: `${process.env.NEXT_PUBLIC_BACK_END_URL}/lots`,
    fetchAvailableLots: `${process.env.NEXT_PUBLIC_BACK_END_URL}/lots/available`,
};

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

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