import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Modal component
function DeleteOrderModal({ close, setClose,orderId }) {
    const queryClient = useQueryClient();

    // Update user mutation using react-query
    console.log(orderId,"order");
    const updateStatus = useMutation(
        async (status) => {
            try {
                const response = await axios.patch(
                    `https://squid-app-wtk8l.ondigitalocean.app/api/order/${orderId.id}`,
                    status
                );

                return response.data;
            } catch (error) {
                throw error;
            }
        },
        {
            onSuccess: () => {
                toast.info(`Order canceled`, {
                    position: "bottom-left",
                });
                queryClient.invalidateQueries("orders");
                setClose(false);
            },
        }
    );

    const handleCancelOrder = () => {
        updateStatus.mutate({ status: "canceled" });
    };

    return (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
            <div className="absolute top-0 left-0 z-40 w-full h-full bg-gray-900 opacity-50"></div>
            <div className="z-50 flex flex-col  px-6 py-4 bg-white rounded shadow-lg">
                <h2 className="mb-4 text-xl font-bold">
                    Are you sure you want to cancel the order?
                </h2>
                <div className="flex w-full justify-between">
                    <button
                        className="text-red-500 border-2 px-3 rounded-lg py-1 hover:text-red-700"
                        onClick={handleCancelOrder}
                    >
                        OK
                    </button>
                    <button
                        className=" hover:text-gray-500-700 border-2 px-3 rounded-lg py-1 "
                        onClick={()=>setClose(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}


export default DeleteOrderModal;