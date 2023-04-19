import React from 'react'
import AdminNavbar from '../../Layout/Admin/AdminNavbar'
import AdminSidebar from '../../Layout/Admin/AdminSidebar'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from "react-query";

import { getOrders, getUser } from "../../api";
import { ToastContainer } from "react-toastify";

function AdminOrder() {

    const queryClient = useQueryClient();

    const {
        isLoading,
        isError,
        data: orders,
        error,
    } = useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
    });

/*     const { data } = useQuery('user', getUser(id) ) */

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;
    orders && console.log(orders.data);

    return (
        <div className="min-h-screen flex flex-col w-full flex-auto flex-shrink-0 antialiased bg-white text-black ">
            <AdminNavbar />
            <AdminSidebar />
            <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
                <h1 className='text-center text-4xl'>
                    orders
                </h1>
                <div className="grid  px-6 ">


                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <div className="flex items-center justify-between pb-4 bg-white ">
                            <div>
                                <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 " type="button">
                                    <span className="sr-only">Action button</span>
                                    Action
                                    <svg className="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>

                            </div>
                            <label htmlFor="table-search" className="sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 " aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                </div>
                                <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search for users" />
                            </div>
                        </div>
                        <table className="w-full text-sm text-left text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>

                                    <th scope="col" className="px-6 py-3">
                                        Name
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

                                {

                                    orders &&
                                    orders.data?.map((order) => (
                                        <tr key={order.id} className="bg-white border-b  hover:bg-gray-50 ">

                                            <th scope="row" className="flex items-center  py-4whitespace-nowrap ">

                                                <div className="pl-3">
                                                    <div className="text-base font-semibold">{order.user.name}</div>
                                                    <div className="font-normal text-gray-500">{order.user.email}</div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                {order.total_price}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className={`h-2.5 w-2.5 rounded-full bg-green-500 mr-2`}></div>
                                                    {order.status}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link  to={`/admin/order/${order.id}`}
                                                    className="font-medium text-green-500  hover:underline">Order Details</Link>
                                            </td>
                                        </tr>
                                    ))
                                }






                            </tbody>
                        </table>
                    </div>
                </div>
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">

                    {
                        orders &&
                        orders?.data.map((order) => (


                            <Link
                            key={order.id}
                                to={`/admin/order/${order.id}`}
                                className="relative flex items-start justify-between rounded-xl border border-gray-100 p-4 shadow-xl sm:p-6 lg:p-8"

                            >
                                <div className="pt-4 text-gray-500">
                                    <svg
                                        className="h-8 w-8 sm:h-10 sm:w-10"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                        ></path>
                                    </svg>

                                    <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
                                        Science of Chemistry
                                    </h3>

                                    <p className="mt-2 hidden text-sm sm:block">
                                        You can manage phone, email and chat conversations all from a single
                                        mailbox.
                                    </p>
                                </div>

                                <span
                                    className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600"
                                >
                                    4.3
                                </span>
                            </Link>

                        ))
                    }


                </div> */}
            </div>
        </div>
    )
}

export default AdminOrder