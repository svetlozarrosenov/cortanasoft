import axios from 'axios';

const urls = {
    fetchAlarms: `${import.meta.env.VITE_BACK_END_URL}/contact-form/create-message`,
};

export async function addContactMessageMutate(messageData: {name: string, subject: string, email: string, phone: string, message: string}) {
    try {
      await axios.post(urls.fetchAlarms, messageData);
            
      return true;
    } catch (error) {
      console.error('Error deleting the alarms:', error);
      throw error;
    }
  };