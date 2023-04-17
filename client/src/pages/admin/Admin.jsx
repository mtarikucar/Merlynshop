import React from 'react'
import AdminNavabr from '../../Layout/Admin/AdminNavabr'
import AdminSidebar from '../../Layout/Admin/AdminSidebar'
import { Routes, Route } from "react-router-dom";

function Admin() {
  return (
    <div className="min-h-screen flex flex-col w-full flex-auto flex-shrink-0 antialiased bg-white  text-black ">
      <AdminNavabr />
      <AdminSidebar />
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
          
        </div>
      </div>
    </div>
  )
}

export default Admin