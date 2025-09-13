import axios from 'axios';
import useSWR from 'swr';

const urls = {
    addCompany: `${process.env.NEXT_PUBLIC_BACK_END_URL}/company/create`,
    updateCompany: (id: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/company/update/${id}`,
    fetchCompanies: `${process.env.NEXT_PUBLIC_BACK_END_URL}/company`,
};

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

export const createCompany = async (clientData: any) => {
    try {
      const result = await axios.post(urls.addCompany, clientData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };


  export const updateCompany = async (ordersData: any) => {
    try {
      const result = await axios.put(urls.updateCompany(ordersData._id), ordersData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };


export function useCompanies() {
  const { data: companies, error, mutate } = useSWR(urls.fetchCompanies, fetcher);

  return {
    companies,
    isLoading: !error && !companies,
    error,
    mutate,
  };
}

export function useUsers() {
  const { data: users, error, mutate } = useSWR(urls.fetchCompanies, fetcher);

  return {
    users,
    isLoading: !error && !users,
    error,
    mutate,
  };
}