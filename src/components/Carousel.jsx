import React from 'react'
import Product from './product'
import { FiChevronLeft,FiChevronRight } from 'react-icons/fi';
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
            <div id="content" className="border border-t-2 carousel p-4 gap-5 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide">
                <div class="">
                    <Product />
                </div>
                <div>
                    <Product />
                </div>
                <div>
                    <Product />
                </div>
                <div>
                    <Product />
                </div>
                <div>
                    <Product />
                </div>

                <div>
                    <Product />
                </div>
                <div>
                    <Product />
                </div>
                <div>
                    <Product />
                </div>
                <div>
                    <Product />
                </div>
                <div>
                    <Product />
                </div>
                <div>
                    <Product />
                </div>
                 <div>
                    <Product />
                </div>
                <div>
                    <Product />
                </div>
                <div>
                    <Product />
                </div>
            </div>
        </div>
    )
}

export default Carousel