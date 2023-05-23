import React from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import axios from "axios";
import LoadingPage from "../../components/LoadingPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminOrder() {

  const { user } = useSelector((state) => state.auth);



  const {
    isLoading,
    isError,
    data: orders,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => axios.get(`https://whale-app-952oz.ondigitalocean.app/api/order/`, {
      headers: {
        Authorization: `Bearer ${user.token}`,

      },
    }),
  });


  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`https://whale-app-952oz.ondigitalocean.app/api/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      // Invalidate the 'orders' query to trigger a refetch and update the UI


      // Optional: Show a success message or perform any action after deletion
    } catch (error) {
      console.error('Error deleting order:', error);
      // Optional: Show an error message or perform any error handling
    }
  };
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(handleDeleteOrder, {
    onSuccess: () => {
      // Optional: Perform any action after the order is deleted successfully
      console.log("seradsbdrbab");
      toast.info(`Order canceled`, {
        position: "bottom-left",
      });
      queryClient.invalidateQueries("orders");
    },
  });

  const handleDeleteButtonClick = (orderId) => {
    deleteMutation.mutate(orderId);
  };

  if (isLoading) return <LoadingPage />;

  if (error) return "An error has occurred: " + error.message;
  console.log(orders, "orders");
  return (

    <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
      <h1 className="text-center text-4xl">orders</h1>
      <div className="grid  px-6 ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between pb-4 bg-white ">
            <div>
              <button
                id="dropdownActionButton"
                data-dropdown-toggle="dropdownAction"
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 "
                type="button"
              >
                <span className="sr-only">Action button</span>
                Action
                <svg
                  className="w-3 h-3 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </div>
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 "
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search for users"
              />
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  total price
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.data?.map((order) => (
                  <tr
                    key={order.id}
                    className="bg-white border-b  hover:bg-gray-50 "
                  >
                    <th
                      scope="row"
                      className="flex items-center  py-4whitespace-nowrap "
                    >
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {order.user.name}
                        </div>
                        <div className="font-normal text-gray-500">
                          {order.user.email}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4 w-1/2">{order.location.address}</td>
                    <td className="px-6 py-4">${order.total_price / 100}.00</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${order.status == "canceled" ? "bg-red-500" : "bg-green-500 "} bg-green-500 mr-2`}
                        ></div>
                        {order.status}
                      </div>
                    </td>
                    {
                      order.status == "canceled" ? (
                        <td className="px-6 py-4">

                          <button
                            onClick={() => handleDeleteButtonClick(order.id)}
                            className="font-medium text-red-500  hover:underline"
                          >
                            Delete Order
                          </button>
                        </td>
                      ) : (
                        <td className="px-6 py-4">

                          <Link
                            to={`/admin/order/${order.id}`}
                            className="font-medium text-green-500  hover:underline"
                          >
                            Order Details
                          </Link>
                        </td>
                      )
                    }
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div >
    </div >

  );
}

export default AdminOrder;
