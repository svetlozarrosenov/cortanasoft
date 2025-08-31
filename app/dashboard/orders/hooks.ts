import axios from 'axios';
import useSWR from 'swr';

const urls = {
    addOrder: `${process.env.NEXT_PUBLIC_BACK_END_URL}/orders/create`,
    updateOrder: (id: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/orders/update/${id}`,
    fetchOrders: `${process.env.NEXT_PUBLIC_BACK_END_URL}/orders`,
};

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

export const createOrder = async (ordersData: any) => {
    try {
      const result = await axios.post(urls.addOrder, ordersData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  export const updateOrder = async (ordersData: any) => {
    try {
      const result = await axios.put(urls.updateOrder(ordersData._id), ordersData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };


export function useOrders() {
  const { data: orders, error, mutate } = useSWR(urls.fetchOrders, fetcher);

  return {
    orders,
    isLoading: !error && !orders,
    error,
    mutate,
  };
}