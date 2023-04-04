import React from 'react'
import { AiOutlineSearch } from 'react-icons/Ai';
import { HiOutlineShoppingCart,HiUser } from 'react-icons/Hi';


function Navbar() {
    return (
        <div className=' sticky w-full shadow-lg  z-50 top-0 left-0  '>
            <nav class="bg-white  ">
                <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="/" class="flex items-center">
                        <img src="https://nurlightllc.com/image/logo2.png" className="h-12 mr-3" alt="Flowbite Logo" />
                        {/* <span class="self-center text-xl font-thin whitespace-nowrap    ">Nurlight</span> */}
                    </a>
                    <div class="flex items-center ">
                        <a href="tel:5541251234" class="mr-6 text-sm  text-gray-500  hover:underline">(555) 412-1234</a>
                        <button type="button" class="text-white bg-[#008037] hover:bg-white hover:text-[#008037] hover:border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">Login</button>

                    </div>
                </div>
            </nav>
            <nav class="bg-gray-100 ">
                <div class="max-w-screen-xl px-4 py-3 mx-auto">
                    <div class="flex flex-row  lg:justify-between justify-center items-center">
                        <ul class="flex flex-row font-medium mt-0 mr-6  lg:space-x-8 space-x-4 text-sm">
                            <li>
                                <a href="#" class="text-gray-900  hover:text-[#008037]  hover:underline" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" class="text-gray-900  hover:text-[#008037]  hover:underline">Product</a>
                            </li>

                            <li>
                                <a href="#" class="text-gray-900  hover:text-[#008037]  hover:underline">About</a>
                            </li>
                            <li>
                                <a href="#" class="text-gray-900  hover:text-[#008037]  hover:underline">Contact</a>
                            </li>
                        </ul>
                        <ul className='flex flex-row font-medium mt-0 mr-6 space-x-8 justify-center items-center text-sm' >
                            <li>
                                <a href="">

                                    <div class="  flex ju ">
                                        <div class="relative">
                                            <div class=" -top-2 absolute left-5">
                                                <p class="flex h-2 w-2 items-center justify-center rounded-full bg-green-500 p-3 text-xs text-white">3</p>
                                            </div>
                                            <HiOutlineShoppingCart className='h-8 w-8  '/>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <HiUser className='h-8 w-8 '/>
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