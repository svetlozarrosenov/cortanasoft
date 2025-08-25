import axios from 'axios';

const urls = {
    resetPassword: `${import.meta.env.VITE_BACK_END_URL}/auth/reset/password`,
};

  export async function resetPasswordMutate(email: string) {
    try {
      await axios.post(urls.resetPassword, {email});
            
      return true;
    } catch (error) {
      console.error('Error deleting the alarms:', error);
      throw error;
    }
  }; 
