import React from 'react'
import { AiOutlineSearch } from 'react-icons/Ai';
import { HiOutlineShoppingCart, HiUser } from 'react-icons/Hi';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function Navbar() {

    let location = useLocation();

    React.useEffect(() => {

    }, [location]);

    console.log(location.pathname);

    return (
        <div className=' sticky w-full shadow-lg  z-40 top-0 left-0  '>
            <nav className="bg-white  ">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="/" className="flex items-center">
                        <img src="https://nurlightllc.com/image/logo2.png" className="h-12 mr-3" alt="Flowbite Logo" />
                        {/* <span className="self-center text-xl font-thin whitespace-nowrap    ">Nurlight</span> */}
                    </a>
                    <div className="flex items-center ">
                        <a href="tel:5541251234" className="mr-6 text-sm  text-gray-500  hover:underline">(555) 412-1234</a>
                        <button type="button" className="text-white bg-[#008037] hover:bg-white hover:text-[#008037] hover:border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">Login</button>

                    </div>
                </div>
            </nav>
            <nav className="bg-gray-100 ">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex flex-row  lg:justify-between justify-center items-center">
                        <ul className="flex flex-row font-medium mt-0 mr-6   lg:space-x-8 space-x-4 text-sm">
                            <li >

                                <NavLink
                                    to="/"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "text-red-400" : isActive ? " text-green-500 " : "text-black"
                                    }
                                >
                                    <span className='text-lg'>Home</span>

                                    <hr class={`${location.pathname == '/' ? 'w-full h-1  bg-green-500 border-0 rounded ' : 'w-full h-1 hidden '}  `} />
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

                                    <hr class={`${location.pathname == '/product' ? 'w-full h-1  bg-green-500 border-0 rounded ' : 'w-full h-1 hidden '}  `} />
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

                                    <hr class={`${location.pathname == '/about' ? 'w-full h-1  bg-green-500 border-0 rounded ' : 'w-full h-1 hidden '}  `} />
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

                                    <hr class={`${location.pathname == '/contact' ? 'w-full h-1  bg-green-500 border-0 rounded ' : 'w-full h-1 hidden '}  `} />
                                </NavLink>
                            </li>
                        </ul>
                        <ul className='flex flex-row font-medium mt-0 mr-6 space-x-8 justify-center items-center text-sm' >
                            <li>
                                <a href="">

                                    <div className="  flex ju ">
                                        <div className="relative">
                                            <div className=" -top-2 absolute left-5">
                                                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-green-500 p-3 text-xs text-white">3</p>
                                            </div>
                                            <HiOutlineShoppingCart className='h-8 w-8  ' />
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <HiUser className='h-8 w-8 ' />
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

        </div>

    )
}

export default Navbar