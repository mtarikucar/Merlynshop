import axios from 'axios'


export const getProducts =async()=>{

    const {data} = await axios.get(`https://dummyjson.com/products`);
    return data;
};

export const getProductId =async(id)=>{

    const {data} = await axios.get(`https://dummyjson.com/products/${id}`);
    return data;
};
/* const { isLoading, error, data } = useQuery(['product', id],()=> getProductId(id)) */
