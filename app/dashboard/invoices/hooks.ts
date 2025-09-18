import axios from 'axios';
import useSWR from 'swr';

const urls = {
    addinvoice: `${process.env.NEXT_PUBLIC_BACK_END_URL}/invoices/create`,
    fetchinvoices: `${process.env.NEXT_PUBLIC_BACK_END_URL}/invoices`,
};

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

export const createinvoice = async (invoicesData: any) => {
    try {
      const result = await axios.post(urls.addinvoice, invoicesData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

export function useInvoices() {
  const { data: invoices, error, mutate } = useSWR(urls.fetchinvoices, fetcher);

  return {
    invoices,
    isLoading: !error && !invoices,
    error,
    mutate,
  };
}