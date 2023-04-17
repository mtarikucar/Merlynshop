import React from 'react'
import AdminNavbar from '../../Layout/Admin/AdminNavbar'
import AdminSidebar from '../../Layout/Admin/AdminSidebar'

function AdminMessage() {
    return (
        <div className="min-h-screen flex flex-col w-full flex-auto flex-shrink-0 antialiased bg-white  text-black ">
            <AdminNavbar />
            <AdminSidebar />
            <div className="h-full w-full ml-14 mt-14 mb-10 md:ml-64">
               
                 <div className='w-full text-center mr-24 '>
                    <h1> yakında gelecek </h1>
               
                </div>
            </div>
        </div>
    )
}

export default AdminMessage