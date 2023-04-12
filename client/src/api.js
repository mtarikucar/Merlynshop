import axios from 'axios'


export const getProducts =async()=>{

    const {data} = await axios.get(`https://dummyjson.com/products`);
    return data;
};

/* const { isLoading, error, data } = useQuery(['product', id],()=> getProductId(id)) */
export const fetchRegister = async(input)=>{

    const {data} = await axios.post(`https://node-fake-api-server.herokuapp.com` ,input);
    return data;
};

export const fetchLogin =async(input)=>{

    const {data} = await axios.post(`https://dummyjson.com/auth/login` ,input);
    return data;
};