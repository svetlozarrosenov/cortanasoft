import axios from 'axios';
import useSWR from 'swr';

const urls = {
    addSupply: `${process.env.NEXT_PUBLIC_BACK_END_URL}/supplies/create`,
    updateSupply: (id: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/supplies/update/${id}`,
    fetchSupplies: `${process.env.NEXT_PUBLIC_BACK_END_URL}/supplies`,
    fetchCurrencies: `${process.env.NEXT_PUBLIC_BACK_END_URL}/currency`,
};

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

export const createSupply = async (supplyData: any) => {
    try {
      const result = await axios.post(urls.addSupply, supplyData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  export const updateSupply = async (supplyData: any) => {
    try {
      const result = await axios.put(urls.updateSupply(supplyData._id), supplyData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };


export function useSupplies() {
  const { data: supplies, error, mutate } = useSWR(urls.fetchSupplies, fetcher);

  return {
    supplies,
    isLoading: !error && !supplies,
    error,
    mutate,
  };
}

export function useCurrency() {
  const { data: currency, error, mutate } = useSWR(urls.fetchCurrencies, fetcher);

  return {
    currency,
    isLoading: !error && !currency,
    error,
    mutate,
  };
}