import useSWR from 'swr';
import axios from 'axios';

const urls = {
    fetchOrders: `${process.env.NEXT_PUBLIC_BACK_END_URL}/orders/list`,
};
const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

export function useOrders() {
  const { data: orders, error } = useSWR(urls.fetchOrders, fetcher);

  return {
    orders,
    isLoading: !error && !orders,
    error
  };
}