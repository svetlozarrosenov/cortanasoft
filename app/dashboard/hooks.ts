import axios from 'axios';
import useSWR from 'swr';

const urls = {
    fetchCurrentCompany: `${process.env.NEXT_PUBLIC_BACK_END_URL}/company/current`,
};

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

export function useCurrentCompany() {
  const { data: company, error, mutate } = useSWR(urls.fetchCurrentCompany, fetcher);

  return {
    company,
    isLoading: !error && !company,
    error,
    mutate,
  };
}