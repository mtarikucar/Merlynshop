import React from 'react'
import { BsTelephoneOutboundFill, BsPeopleFill } from 'react-icons/Bs';
import { FaStore } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';

function Banner() {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 pt-3 lg:px-24 '>
            <div className=' p-2 m-4 flex flex-col lg:flex-row justify-center items-center gap-5 bg-white  border border-[#008037]   rounded-xl shadow-lg'>
                <p className='text-3xl  text-[#008037]  text-center'><BsTelephoneOutboundFill /></p>
                <div>
                    <p className='text-xl font-bold text-center'>
                        CALL US
                    </p>
                    <p className='text-lg font-normal text-center'>
                        (01) 2244210338
                    </p>
                </div>
            </div>
            <div className=' p-4 m-4 flex flex-col lg:flex-row justify-center items-center gap-5 bg-white   border border-[#008037]   rounded-xl shadow-lg'>
                <p className='text-3xl text-[#008037] text-center'><BsPeopleFill /></p>
                <div>
                    <p className='text-xl font-bold text-center'>
                        CHAT WITH US

                    </p>
                    <p className='text-lg font-normal text-center'>
                        We offer chat support
                    </p>
                </div>
            </div>
            <div className=' p-4 m-4 flex flex-col lg:flex-row justify-center items-center gap-5  bg-white  border border-[#008037]   rounded-xl shadow-lg'>
                <p className='text-3xl text-[#008037] text-center'><FaStore /></p>
                <div>
                    <p className='text-xl font-bold text-center'>

                        SAME DAY PICK UP

                    </p>
                    <p className='text-lg font-normal text-center'>
                        Call or order online
                    </p>
                </div>
            </div>
            <div className=' py-8 m-4 flex flex-col lg:flex-row justify-center items-center gap-5 bg-white   border border-[#008037]   rounded-xl shadow-lg'>
                <p className='text-3xl text-[#008037] text-center '><TbTruckDelivery /></p>
                <div>
                    <p className='text-xl font-bold text-center'>

                        FREE LOCAL DELIVERY

                    </p>
                    <p className='text-lg font-normal text-center'>
                        On orders over $75
                    </p>
                </div>
            </div>



        </div>
    )
}

export default Banner