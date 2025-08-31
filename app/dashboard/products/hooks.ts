import axios from 'axios';
import useSWR from 'swr';

const urls = {
    addProduct: `${process.env.NEXT_PUBLIC_BACK_END_URL}/products/create`,
    updateProduct: (id: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/products/update/${id}`,
    fetchProducts: `${process.env.NEXT_PUBLIC_BACK_END_URL}/products`,
};

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

export const createProduct = async (productData: any) => {
    try {
      const result = await axios.post(urls.addProduct, productData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  export const updateProduct = async (productData: any) => {
    try {
      const result = await axios.put(urls.updateProduct(productData._id), productData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };


export function useProducts() {
  const { data: products, error, mutate } = useSWR(urls.fetchProducts, fetcher);

  return {
    products,
    isLoading: !error && !products,
    error,
    mutate,
  };
}