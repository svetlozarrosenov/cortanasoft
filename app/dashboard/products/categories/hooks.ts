import axios from 'axios';
import useSWR from 'swr';

const urls = {
    addCategory: `${process.env.NEXT_PUBLIC_BACK_END_URL}/products/categories/create`,
    updateCategory: (id: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/products/categories/update/${id}`,
    fetchCategories: `${process.env.NEXT_PUBLIC_BACK_END_URL}/products/categories`,
};

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

export const createProductCategory = async (productCategoryData: any) => {
    try {
      const result = await axios.post(urls.addCategory, productCategoryData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  export const updateProductCategory = async (productCategoryData: any) => {
    try {
      const result = await axios.put(urls.updateCategory(productCategoryData._id), productCategoryData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };


export function useProductCategories() {
  const { data: categories, error, mutate } = useSWR(urls.fetchCategories, fetcher);

  return {
    categories,
    isLoading: !error && !categories,
    error,
    mutate,
  };
}