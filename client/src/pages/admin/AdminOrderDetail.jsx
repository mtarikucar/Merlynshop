import { useEffect, useState, useRef } from 'react'

import axios from 'axios';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from "react-query";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingPage from '../../components/LoadingPage';
function AdminOrderDetail() {
    const [status, setStatus] = useState("");
    const statusRef = useRef()
    const notify = () => toast("giriş başarılı");
    const { id } = useParams()
    const { user } = useSelector((state) => state.auth);
    const { isLoading, error, data } = useQuery('order', () => {

        return fetch(`http://localhost:3000/api/order/${id}`).then(res =>
            res.json()
        )
    }

    )
    console.log(data, "data");


    const updateStatus = useMutation(async (status) => {
        try {
            const response = await axios.patch(`http://localhost:3000/api/order/${id}`, status, {

                headers: {
                    Authorization: `Bearer ${user.token}`,

                },

            },


            );

            return response.data;

        } catch (error) {
            throw error;
        }
    }
        , {
            onSuccess: () => {

                toast.info(`Status uptated`, {
                    position: 'bottom-left'
                })
                console.log("sdvsdbvs");
            },
        }
    );

    /*     const handleSubmit = (e) => {
            e.preventDefault();
            console.log('geldi');
            updateStatus.mutate(formState);
        }; */


    useEffect(() => {
        if (data) {
            setStatus(data.status);
        }
    }, [data]);

    const handleChange = (event) => {
        setStatus(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateStatus.mutate({ status: status });
    };

    if (isLoading) return <LoadingPage/>

    if (error) return 'An error has occurred: ' + error.message


    return (

        <div className="h-full  m-2 ml-14 mt-14 mb-10 md:ml-64">
            <ToastContainer />
            <div className=' text-center  '>
                <div className="w-full">
                    <div className="flex justify-start item-start space-y-2 flex-col ">
                        <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">Order : {data.id}</h1>
                        <p className="text-base font-medium leading-6 text-gray-600">createdAt :{data.createdAt}</p>
                    </div>
                    <div className="mt-10 flex flex-col xl:flex-col jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                            <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>
                                {
                                    data &&
                                    data?.products.map((product) => (

                                        <div key={product.id} className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
                                            <div className="pb-4 md:pb-8 w-full md:w-40">
                                                <img className="w-full hidden md:block" src={product.thumbnail} alt="dress" />

                                            </div>
                                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                    <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">{product.name}</h3>
                                                    <div className="flex justify-start items-start flex-col space-y-2">
                                                        <p className="text-sm leading-none text-gray-800">
                                                            <span className="text-gray-500">description: </span> {product.description}
                                                        </p>


                                                    </div>
                                                </div>
                                                <div className="flex justify-between space-x-8 items-start w-full">
                                                    <p className="text-base xl:text-lg leading-6">
                                                        ${product.price}.00 {/* <span className="text-red-300 line-through"> $45.00</span> */}
                                                    </p>
                                                    <p className="text-base xl:text-lg leading-6 text-gray-800">{product.order_product.quantity}</p>
                                                    <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">${product.price * product.order_product.quantity}.00</p>

                                                </div>
                                            </div>
                                        </div>
                                    ))

                                }
                            </div>
                            <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                                    <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
                                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                        <div className="flex justify-between  w-full">
                                            <p className="text-base leading-4 text-gray-800">Subtotal</p>
                                            <p className="text-base leading-4 text-gray-600">${data.total_price / 100}.00</p>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <p className="text-base leading-4 text-gray-800">
                                                Discount <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">STUDENT</span>
                                            </p>
                                            <p className="text-base leading-4 text-gray-600">-$00.00 (00%)</p>
                                        </div>
                                        <div className="flex justify-between items-center w-full">
                                            <p className="text-base leading-4 text-gray-800">Shipping</p>
                                            <p className="text-base leading-4 text-gray-600">$0.00</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
                                        <p className="text-base font-semibold leading-4 text-gray-600">${data.total_price / 100}.00</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                                    <h3 className="text-xl font-semibold leading-5 text-gray-800">Shipping</h3>
                                    <form action="">



                                        <div className="flex justify-between items-start py-4 w-full">
                                            <div className="flex justify-center items-center space-x-4">
                                                <div className="w-8 h-8">
                                                    <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                                                </div>
                                                <div className="flex flex-col justify-start items-center">
                                                    <p className="text-lg leading-6 font-semibold w-2/3 text-gray-800">
                                                        Location
                                                        <br />
                                                        <span className="font-normal "> {data.location.address} </span>
                                                    </p>

                                                </div>

                                                <div className="flex flex-col justify-start items-center">
                                                    <p className="text-lg leading-6 font-semibold text-gray-800">
                                                        Status
                                                        <br />

                                                        <select
                                                            id="status"
                                                            name="status"
                                                            className="mt-1 block w-full py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            value={status}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="pending">pending</option>
                                                            <option value="processing">processing</option>
                                                            <option value="delivered">delivered</option>
                                                        </select>
                                                    </p>

                                                </div>
                                            </div>

                                        </div>
                                        <div className="w-full flex justify-center items-center">
                                            <button
                                                disabled={updateStatus.isLoading}
                                                type='submit' onClick={handleSubmit} className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                                                {updateStatus.isLoading ? 'Saving...' : 'update status'}

                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </div>

    )
}

export default AdminOrderDetail