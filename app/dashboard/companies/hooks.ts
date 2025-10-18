import axios from 'axios';
import useSWR from 'swr';

const urls = {
    addCompany: `${process.env.NEXT_PUBLIC_BACK_END_URL}/company/create`,
    updateCompany: (id: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/company/update/${id}`,
    fetchCompanies: `${process.env.NEXT_PUBLIC_BACK_END_URL}/company`,
    fetchCompanySystemRoles: `${process.env.NEXT_PUBLIC_BACK_END_URL}/company-roles`,
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


  export const updateCompany = async (currentCompanyId: any, ordersData: any) => {
    try {
      const result = await axios.put(urls.updateCompany(currentCompanyId), ordersData, { withCredentials: true });
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

export function useCompanySystemRoles() {
  const { data: systemRoles, error, mutate } = useSWR(urls.fetchCompanySystemRoles, fetcher);

  return {
    systemRoles,
    isLoading: !error && !systemRoles,
    error,
    mutate,
  };
}