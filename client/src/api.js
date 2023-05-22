import axios from "axios";

const baseAPI = axios.create({
  baseURL: "http://localhost:3000/api",
});


export const getProducts = async () => {
  try {
    const { data } = await baseAPI.get(`/product`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id, token) => {
  const data = await axios.delete(`http://localhost:3000/api/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getUser = async (id) => {
  const { data } = await axios.get(`http://localhost:3000/api/user/${id}`);
  return data;
};

export const getUsers = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/user/`);
  return data;
};

export const deleteUsers = async (id) => {
  const { data } = await axios.delete(`http://localhost:3000/api/user/${id}`);
  return data;
};

/* const { isLoading, error, data } = useQuery(['product', id],()=> getProductId(id)) */
export const fetchRegister = async (input) => {
  const { data } = await axios.post(
    `https://node-fake-api-server.herokuapp.com`,
    input
  );
  return data;
};

export const fetchLogin = async (input) => {
  const { data } = await axios.post(`https://dummyjson.com/auth/login`, input);
  return data;
};

export const getOrders = async () => {
  const data = await axios.get(`http://localhost:3000/api/order/`);
  return data;
};