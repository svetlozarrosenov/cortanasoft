import axios from 'axios';
import useSWR from 'swr';

const urls = {
    addLocations: `${process.env.NEXT_PUBLIC_BACK_END_URL}/locations/create`,
    updateLocations: (id: string | undefined) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/locations/update/${id}`,
    fetchLocations: `${process.env.NEXT_PUBLIC_BACK_END_URL}/locations`,
    deleteLocation: (id: string) => `${process.env.NEXT_PUBLIC_BACK_END_URL}/locations/delete/${id}`,
};

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);

export const deleteLocation = async (locId: string) => {
  try {
    const result = await axios.delete(urls.deleteLocation(locId), { withCredentials: true });
    return result.data;
  } catch (error) {
    console.error('Error deleting location:', error);
    throw error;
  }
}

export const createLocation = async (locationsData: any) => {
    try {
      const result = await axios.post(urls.addLocations, locationsData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  export const updateLocation = async (_id: string | undefined, locationsData: any) => {
    try {
      console.log('crb_locationsData', _id)
      const result = await axios.put(urls.updateLocations(_id), locationsData, { withCredentials: true });
      return result.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };


export function useLocations() {
  const { data: locations, error, mutate } = useSWR(urls.fetchLocations, fetcher);

  return {
    locations,
    isLoading: !error && !locations,
    error,
    mutate,
  };
}