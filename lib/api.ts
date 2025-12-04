import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACK_END_URL!;

export async function getAllProducts() {
  const res = await axios.get(`${API_URL}/products/list`);
  return res.data;
}

export async function getProductById(id: string) {
  const res = await axios.get(`${API_URL}/products/product/${id}`);
  return res.data;
}