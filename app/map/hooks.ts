import useSWR from 'swr';
import axios from 'axios';

const urls = {
    devicesLocations: `${process.env.REACT_APP_BACK_END_URL}/devices/wifi/location/get-all`,
};
const fetcher = (url: string) => axios.get(url).then(res => res.data);

export function useDevicesLocations() {
  const { data: locations, error } = useSWR(urls.devicesLocations, fetcher);

  return {
    locations,
    isLoading: !error && !locations,
    error
  };
}

