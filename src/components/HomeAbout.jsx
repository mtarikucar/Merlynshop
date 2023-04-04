import React from 'react'
import { AiOutlineSearch } from 'react-icons/Ai';
function HomeAbout() {
    return (
        <>

            <section class="bg-[#daeadb]">
                <div class="py-8 px-4 mx-auto max-w-screen text-center lg:py-10">
                    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none  text-[#008037] md:text-5xl lg:text-6xl">We invest in the world’s potential</h1>
                    <p class="mb-8 text-lg font-normal text-gray-900 lg:text-xl sm:px-16 lg:px-48 ">Our company has been distributing environmentally friendly packaging products like
                        food containers and other kitchen utensils in the DMV area.
                        We offer low price but high-quality products to the customer.</p>
                    <form class="w-full max-w-md mx-auto text-center ">
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center justify-center  pl-3 pointer-events-none">
                                <div>
                                    <AiOutlineSearch className='text-xl' />
                                </div>
                            </div>
                            <input type="email" id="default-email" class="block w-full p-4 pl-10 text-sm text-gray-900 rounded-lg bg-white  outline-none  " placeholder="Enter your email here..." required />
                            <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-[#008037] hover:bg-white hover:text-[#008037] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
                        </div>
                    </form>
                </div>
            </section>

        </>

    )
}

export default HomeAbout