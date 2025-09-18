import axios from 'axios';
import useSWR from 'swr';

const urls = {
    addClient: `${process.env.NEXT_PUBLIC_BACK_END_URL}/client/create`,
    fetchClients: `${process.env.NEXT_PUBLIC_BACK_END_URL}/client`,
};

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

export const createClient = async (clientData: any) => {
    try {
      const result = await axios.post(urls.addClient, clientData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };


export function useClients() {
  const { data: clients, error, mutate } = useSWR(urls.fetchClients, fetcher);

  return {
    clients,
    isLoading: !error && !clients,
    error,
    mutate,
  };
}