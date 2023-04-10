import { useEffect, useState } from 'react'
import { AiOutlineHome, AiOutlineExclamationCircle } from 'react-icons/Ai';
import { HiOutlineShoppingCart, HiUser } from 'react-icons/Hi';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ShoppingCarts from './ShoppingCarts';
import { FcAbout } from 'react-icons/Fc';
import { FaProductHunt } from 'react-icons/fa';
import { MdProductionQuantityLimits, MdOutlineContacts } from 'react-icons/Md';
import { GrContact } from 'react-icons/Gr';
function Navbar({ open, setOpen }) {

    let location = useLocation();

    useEffect(() => {

    }, [location]);



    return (
        <div className=' sticky w-full shadow-lg  z-40 top-0 left-0  '>

            <nav className="bg-white  ">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="/" className="flex items-center">
                        <img src="https://nurlightllc.com/image/logo2.png" className="h-12 mr-3" alt="Flowbite Logo" />

                    </a>
                    <div className="flex items-center ">
                        <a href="tel:5541251234" className="mr-6 text-sm  text-gray-500  hover:underline">(555) 412-1234</a>
                        
                        <NavLink
                            to="/login"
                            className="text-white bg-[#008037] hover:bg-white hover:text-[#008037] hover:border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
                        >

                            Login


                        </NavLink>

                    </div>
                </div>
            </nav>
            <nav className="bg-gray-100 ">

                <div className=" lg:sticky  xl:sticky md:sticky fixed  lg:top-0  xl:top-0 md:top-0  bottom-0 z-50 w-full h-16  flex bg-white border-t border-gray-200 ">
                    <div className=' container mx-auto flex flex-row items-center max-w-screen-xl '>

                        <ul className="flex lg:justify-start md:justify-start justify-between  xl:justify-start h-full w-full  font-medium mx-2 p-2 lg:space-x-10" >
                            <li className='inline-flex flex-col items-center justify-center  p-3  rounded-lg  hover:bg-gray-50  group'>
                                <NavLink
                                    to="/"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "text-red-400" : isActive ? " text-green-500 text-center " : "text-black"
                                    }
                                >
                                    <AiOutlineHome className='text-center w-full text-2xl' />
                                    <span className='text-sm mb-2'>Home</span>

                                    <hr className={`${location.pathname == '/' ? 'w-full h-0.5  bg-green-500 border-0 rounded ' : 'w-full h-1 hidden '}  `} />
                                </NavLink>
                            </li>

                            <li className="inline-flex flex-col items-center justify-center p-3 hover:bg-gray-50 group  rounded-lg  ">
                                <NavLink
                                    to="/product"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "text-red-400" : isActive ? " text-green-500 " : "text-gray-800"
                                    }
                                >
                                    <MdProductionQuantityLimits className='text-center w-full text-2xl' />
                                    <span className='text-sm mb-2'>Product</span>

                                    <hr className={`${location.pathname == '/product' ? 'w-full h-0.5  bg-green-500 border-0 rounded ' : 'w-full h-1 hidden '}  `} />
                                </NavLink>
                            </li>
                            <li className="inline-flex flex-col items-center justify-center p-3 hover:bg-gray-50 group  rounded-lg ">
                                <NavLink
                                    to="/about"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "text-red-400" : isActive ? " text-green-500 " : "text-gray-800"
                                    }
                                >
                                    <AiOutlineExclamationCircle className='text-center w-full text-2xl' />
                                    <span className='text-sm mb-2'>About</span>

                                    <hr className={`${location.pathname == '/about' ? 'w-full h-0.5  bg-green-500 border-0 rounded ' : 'w-full h-1 hidden '}  `} />
                                </NavLink>
                            </li>
                            <li className="inline-flex flex-col items-center justify-center p-3 hover:bg-gray-50 group  rounded-lg  ">
                                <NavLink
                                    to="/contact"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "text-red-400" : isActive ? " text-green-500 " : "text-gray-800"
                                    }
                                >
                                    <MdOutlineContacts className='text-center w-full text-2xl' />
                                    <span className='text-sm mb-2'>Contact</span>

                                    <hr className={`${location.pathname == '/contact' ? 'w-full h-0.5  bg-green-500 border-0 rounded ' : 'w-full h-1 hidden '}  `} />
                                </NavLink>
                            </li>
                        </ul>
                        <div className=' lg:flex w-full justify-end hidden  '>
                            <ul className='lg:flex hidden   flex-row font-medium mt-0 mr-6 space-x-8 justify-start items-center text-sm' >
                                <li>


                                    <button onClick={() => setOpen(!open)}>
                                        <div className="  flex ">
                                            <div className="relative">
                                                <div className=" -top-2 absolute left-5">
                                                    <p className="flex h-2 w-2 items-center justify-center rounded-full bg-green-500 p-3 text-xs text-white">3</p>
                                                </div>

                                                <HiOutlineShoppingCart className='h-8 w-8  ' />
                                            </div>
                                        </div>
                                    </button>

                                </li>
                                

                            </ul>
                        </div>
                    </div>
                </div>

                {/* <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex flex-row  lg:justify-between justify-center items-center">
                        <ul className="flex flex-row font-medium mt-0 mr-6   lg:space-x-8 space-x-4 text-sm">
                            <li >

                                <NavLink
                                    to="/"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "text-red-400" : isActive ? " text-green-500 " : "text-gray-800"
                                    }
                                >
                                    <span className='text-lg'>Home</span>

                                    <hr className={`${location.pathname == '/' ? 'w-full h-1  bg-green-500 border-0 rounded ' : 'w-full h-1 hidden '}  `} />
                                </NavLink>
                            </li>
                            <li>

                                <NavLink
                                    to="/product"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "text-red-400" : isActive ? " text-green-500 " : "text-black"
                                    }
                                >
                                    <span className='text-lg'>Product</span>

                                    <hr className={`${location.pathname == '/product' ? 'w-full h-1  bg-green-500 border-0 rounded ' : 'w-full h-1 hidden '}  `} />
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "text-red-400" : isActive ? " text-green-500 " : "text-black"
                                    }
                                >
                                    <span className='text-lg'>About</span>

                                    <hr className={`${location.pathname == '/about' ? 'w-full h-1  bg-green-500 border-0 rounded ' : 'w-full h-1 hidden '}  `} />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "text-red-400" : isActive ? " text-green-500 " : "text-black"
                                    }
                                >
                                    <span className='text-lg'>Contact</span>

                                    <hr className={`${location.pathname == '/contact' ? 'w-full h-1  bg-green-500 border-0 rounded ' : 'w-full h-1 hidden '}  `} />
                                </NavLink>
                            </li>
                        </ul>
                        <ul className='flex flex-row font-medium mt-0 mr-6 space-x-8 justify-center items-center text-sm' >
                            <li>


                                <button onClick={() => setOpen(!open)}>
                                    <div className="  flex ju ">
                                        <div className="relative">
                                            <div className=" -top-2 absolute left-5">
                                                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-green-500 p-3 text-xs text-white">3</p>
                                            </div>

                                            <HiOutlineShoppingCart className='h-8 w-8  ' />
                                        </div>
                                    </div>
                                </button>

                            </li>
                            <li>
                                
                            </li>

                        </ul>
                    </div>
                </div> */}
            </nav >

        </div >

    )
}

export default Navbar