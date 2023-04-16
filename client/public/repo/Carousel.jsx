import React from 'react'
import Product from './product'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
function Carousel() {


    const scrollLeft = () => {
        document.getElementById("content").scrollLeft -= 400;
    }
    const scrollRight = () => {
        document.getElementById("content").scrollLeft += 400;
    }
    return (
        <div className="relative ">

            <div className="absolute right-0 top-2">
                <button onClick={scrollLeft} className="p-2 m-2 rounded-full bg-white">
                    <FiChevronLeft />
                </button>
                <button onClick={scrollRight} className="p-2 m-2 rounded-full bg-white">
                    <FiChevronRight />
                </button>
            </div>
            <div className='absolute left-5 top-4'>
                <p className='font-serif'>
                    <a className='hover:text-[#008037]' href="">

                        Products..
                    </a>
                </p>
            </div>
            <div id="content" className=" border-t-2 carousel p-4 gap-5 flex items-center justify-start overflow-x-hidden  scroll-smooth  scrollbar-hide ">
                <div className="">
                    <img  src="https://nurlightllc.com/image/product_image/beanca-20-container-food-storage-set.webp" alt="" />
                </div>
                <div className="">
                    <img  src="https://nurlightllc.com/image/product_image/beanca-20-container-food-storage-set.webp" alt="" />
                </div>
                
            </div>
        </div>
    )
}

export default Carousel