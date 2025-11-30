import axios from "axios";

const urls = {
    createDevice: `${process.env.NEXT_PUBLIC_BACK_END_URL}/devices/create`,
    createOrder: `${process.env.NEXT_PUBLIC_BACK_END_URL}/orders/create`,
}

export const createDevicesMutate = async (devices: any) => {
    try {
        const result = await axios.post<any>(urls.createDevice, devices, { withCredentials: true });
        return result.data;
      } catch (error) {
        console.error('Error creating product:', error);
        throw error;
      }
}

export const createOrderMutate = async (formData: any, products: any) => {
    try {
        const order = {...formData, products}
        const result = await axios.post<any>(urls.createOrder, order, { withCredentials: true });
        return result.data;
      } catch (error) {
        console.error('Error creating product:', error);
        throw error;
      }
}