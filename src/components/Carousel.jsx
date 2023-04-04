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
                <div class="">
                    <Product text={'lorem3 CKjsdkvadk bvjakjvka sfvkasvkasf'} />
                </div>
                <div>
                    <Product text={'lorem3C Kjsdkvadkbvjak jvkasfvkasvkasf sdzfgdhf ghlhdtyjsjm nskdsngbkjıfv kvkjbfgbukbkfdvbözmn bömdbgugyaubvnc vmvbdfguayv nc m bkuauhgryud'}  />
                </div>
                <div>
                    <Product text={'lorem3CK jsdkva dkbvjakjvka sfvkasv kasf dszgbgu erıuhvısd vuhdsfv fdufv ıdsfuıv fv'}  />
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