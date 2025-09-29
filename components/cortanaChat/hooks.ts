import axios from "axios";

const urls = {
    ask: `${process.env.NEXT_PUBLIC_BACK_END_URL}/cortana/ask-test`,
}

export const askCortana = async (conversation: any) => {
    try {
      const result = await axios.post(urls.ask, conversation);
      return result?.data?.response;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };