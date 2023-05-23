import React from 'react'

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

function Banner() {
    return (
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-1 pt-3 lg:px-24 '>
            <div className=' lg:p-4 m-4 flex flex-col lg:flex-row justify-center items-center gap-5 bg-white  border '>
                <p className='text-3xl  text-[#008037]  text-center'><LocalPhoneIcon /></p>
                <div>
                    <p className='text-xl font-bold text-center'>
                        CALL US
                    </p>
                    <p className='text-lg font-normal text-center'>
                        (01) 2244210338
                    </p>
                </div>
            </div>
            <div className=' lg:p-4 m-4 flex flex-col lg:flex-row justify-center  pt-3  items-center gap-5 bg-white   border '>
                <p className='text-3xl text-[#008037] text-center'><PeopleAltIcon /></p>
                <div>
                    <p className='text-xl font-bold text-center'>
                        CHAT WITH US

                    </p>
                    <p className='text-lg font-normal text-center'>
                        We offer chat support
                    </p>
                </div>
            </div>
            <div className='lg:p-4 m-4 flex flex-col lg:flex-row justify-center items-center gap-5 pt-3  bg-white  border '>
                <p className='text-3xl text-[#008037] text-center'><StoreIcon /></p>
                <div>
                    <p className='text-xl font-bold text-center'>

                        SAME DAY PICK UP

                    </p>
                    <p className='text-lg font-normal text-center'>
                        Call or order online
                    </p>
                </div>
            </div>
            <div className=' lg:p-4 m-4 flex flex-col lg:flex-row justify-center items-center gap-5 pt-3  bg-white   border '>
                <p className='text-3xl text-[#008037] text-center '><LocalShippingIcon /></p>
                <div>
                    <p className='text-xl font-bold text-center'>

                        FREE LOCAL DELIVERY

                    </p>
                    <p className='text-lg font-normal text-center'>
                        On orders over $100
                    </p>
                </div>
            </div>



        </div>
    )
}

export default Banner