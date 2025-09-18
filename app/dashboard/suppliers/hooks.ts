import axios from 'axios';
import useSWR from 'swr';

const urls = {
    addSupplier: `${process.env.NEXT_PUBLIC_BACK_END_URL}/supplies/supplier/create`,
    updateSupplier: (id: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/supplies/suppliers/update/${id}`,
    fetchSuppliers: `${process.env.NEXT_PUBLIC_BACK_END_URL}/supplies/suppliers`,
};

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

export const createSupplier = async (SupplierData: any) => {
    try {
      const result = await axios.post(urls.addSupplier, SupplierData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  export const updateSupplier = async (SupplierData: any) => {
    try {
      const result = await axios.put(urls.updateSupplier(SupplierData._id), SupplierData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };


export function useSuppliers() {
  const { data: suppliers, error, mutate } = useSWR(urls.fetchSuppliers, fetcher);

  return {
    suppliers,
    isLoading: !error && !suppliers,
    error,
    mutate,
  };
}