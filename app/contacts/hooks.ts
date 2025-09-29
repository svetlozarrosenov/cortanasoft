import axios from 'axios';

const urls = {
    contact: `${process.env.NEXT_PUBLIC_BACK_END_URL}/contact-form/create-message`,
};

export const contact = async (clientData: any) => {
    try {
      const result = await axios.post(urls.contact, clientData);
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

