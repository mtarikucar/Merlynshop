import React from 'react'

function AdminNavabr() {
    return (
        <div className="sticky top-0 z-50 w-full flex items-center justify-between h-14 text-white ">
            <div className="flex items-center justify-start md:justify-start px-3  w-14 md:w-64 h-14 bg-gray-700  border-none">
                <img className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden" src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg" />
                <span className="hidden md:block">ADMIN</span>
            </div>
            <div className="flex justify-end w-full items-center h-14 bg-gray-700 header-right">
                
                <ul className="flex flex-row items-center ">
                   
                    
                    <li>
                        <a href="/" className="flex items-center mr-4 hover:text-green-100">
                            <span className="inline-flex mr-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                            </span>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div >

    )
}

export default AdminNavabr