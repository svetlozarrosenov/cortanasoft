import axios from 'axios';

const urls = {
    subscribe: `${import.meta.env.VITE_BACK_END_URL}/subscribe`,
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