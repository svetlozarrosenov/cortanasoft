import useSWR from 'swr';
import axios from 'axios';

const urls = {
  subscribe: `${process.env.NEXT_PUBLIC_BACK_END_URL}/subscribe`,
};

export const subscribeMutate = async (email: any) => {
    try {
        const result = await axios.post<any>(urls.subscribe, {email}, { withCredentials: true });
        return result.data;
      } catch (error) {
        console.error('Error subscribing:', error);
        throw error;
      }
}