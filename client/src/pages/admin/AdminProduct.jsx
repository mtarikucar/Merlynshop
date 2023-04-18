import React, { useState } from 'react'
import AdminNavbar from '../../Layout/Admin/AdminNavbar'
import AdminSidebar from '../../Layout/Admin/AdminSidebar'
import AdminAddProduct from '../../components/Admin/AdminAddProduct'
import { useQuery } from 'react-query'
import { getProducts ,deleteProduct } from '../../api'
import { ToastContainer } from 'react-toastify';
function AdminProduct() {
    const [open, setOpen] = useState(false)





    const { isLoading, error, data } = useQuery('products', getProducts)
    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message
    data && console.log(data, 'admin');


    


    return (
        
        <div className="min-h-screen flex flex-col w-full flex-auto flex-shrink-0 antialiased bg-white  text-black ">
             <ToastContainer />
            <AdminNavbar />
            <AdminSidebar />
            <AdminAddProduct open={open} setOpen={setOpen} />
            <div className="h-full ml-14 mt-14 mb-10 md:ml-64 ">
                <div className="grid  px-6 ">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <div className="flex items-center justify-between pb-4 bg-white  px-5">

                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 " aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                </div>
                                <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-green-500 focus:border-green-500 " placeholder="Search for users" />
                            </div>
                            <button
                                onClick={() => setOpen(true)}
                                className="inline-flex items-center text-white  bg-green-500 border hover:bg-white border-green-500 hover:text-gray-900  outline-none  font-medium rounded-lg text-sm px-3 py-1.5 " type="button">
                                Add product
                            </button>
                        </div>
                        <table className="w-full text-sm text-left text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                                <tr>

                                    <th scope="col" className="px-6 py-3">
                                        image
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        descireption
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data &&
                                    data?.map((product) => (

                                        <tr key={product.id} className="bg-white border-b  hover:bg-gray-50 ">
                                            <th scope="row" className="flex items-center px-6 py-4whitespace-nowrap">
                                                <img className="w-32 h-32 rounded" src={product.thumbnail} alt="Jese image" />
                                            </th>
                                            <td>
                                                <div className="pl-3">
                                                    <div className="text-base font-semibold">{product.name}</div>
                                                   
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 max-w-md">
                                                {product.description}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2">
                                                    </div>
                                                        ${product.price}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                  
                                                        {product.quantity}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 space-x-2 text-center">
                                                <button className="font-medium bg-green-600  px-2 py-1 rounded-lg text-white ">Edit</button>
                                                <button type='submit' onClick={()=> deleteProduct(product.id)} className="font-medium bg-red-600 px-2 py-1 rounded-lg text-white">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }






                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminProduct