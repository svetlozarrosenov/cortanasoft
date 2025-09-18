import axios from 'axios';
import useSWR from 'swr';

const urls = {
    register: `${process.env.NEXT_PUBLIC_BACK_END_URL}/user/register`,
    currentUser: `${process.env.NEXT_PUBLIC_BACK_END_URL}/user/current`,
    login: `${process.env.NEXT_PUBLIC_BACK_END_URL}/auth/login`,
    logout: `${process.env.NEXT_PUBLIC_BACK_END_URL}/auth/logout`,
};

interface UserData {
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
}

export const useRegisterMutate = async (userData: UserData) => {
    try {
      const result = await axios.post<RegisterResponse>(urls.register, userData);
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

export function useAuth() {
  const { data: user, error, mutate } = useSWR(urls.currentUser, async (): Promise<any> => {
    return user;
  });

  const login = async (credentials: any) => {
    const res = await axios.post(urls.login, credentials, { withCredentials: true });
    mutate(res.data.user);
  };

  const logout = async () => {
    await axios.post(urls.logout, {}, { withCredentials: true });
    mutate(null);
  };

  return {
    user,
    isLoading: !error && !user,
    isError: error,
    login,
    logout,
  };
}


export function useUser() {
  const fetcher = async (url: string) => 
    await axios.get(url, { withCredentials: true })
      .then(res => res.data)
      .catch(error => {
        if (error.response && error.response.status === 401) {
          return null;
        }
        throw error;
      });
  
  const { data: user, error, mutate, isLoading } = useSWR(urls.currentUser, fetcher);

  return {
    user,
    isLoading,
    isError: error && error.response && error.response.status !== 401,
    isUnauthorized: !user && !error,
    mutate
  };
};