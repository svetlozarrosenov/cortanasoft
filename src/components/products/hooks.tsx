import axios from "axios";
import useSWR from "swr";

export const urls = {
  fetchProduct: (id: string) => `${import.meta.env.VITE_BACK_END_URL}/products/product/${id}`,
    fetchAllProducts: `${import.meta.env.VITE_BACK_END_URL}/products/list`,
    createProduct: `${import.meta.env.VITE_BACK_END_URL}/products/create`,
};

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

export function useProducts() {
    const { data: products, error, mutate } = useSWR(urls.fetchAllProducts, fetcher);
  
    return {
      products,
      isLoading: !error && !products,
      error,
      mutate
    };
  }

  export function useProduct(id: any) {
    const { data: product, error, mutate } = useSWR(urls.fetchProduct(id), fetcher);
  
    return {
      product,
      isLoading: !error && !product,
      error,
      mutate
    };
  }

  export const useCreateProduct = async (productData: any) => {
    try {
      const result = await axios.post<any>(urls.createProduct, productData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  };