import axios from "axios";

const baseAPI = axios.create({
  baseURL: "http://localhost:3000/api"
});


export const getProducts = async () => {
  try {
    const { data } = await baseAPI.get(`/product`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteUsers = async (id) => {
  const { data } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/user/${id}`);
  return data;
};


