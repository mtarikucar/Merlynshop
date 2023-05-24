import React from 'react'

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

function Banner() {
    return (
        <div className='grid grid-cols-2 p-2 gap-2 md:grid-cols-2 lg:grid-cols-4 lg:pt-3 lg:px-24 '>
            <div className=' lg:p-4 lg:m-4 p-2 flex flex-row justify-center items-center gap-3 bg-white  border '>
                <p className='text-sm md:text-lg  lg:text-xl  text-[#008037]  text-center'><LocalPhoneIcon /></p>
                <div>
                    <p className=' text-xs lg:text-xl font-bold text-center'>
                        CALL US
                    </p>
                    <p className='text-xs lg:text-xl font-normal text-center'>
                        (01) 2244210338
                    </p>
                </div>
            </div>
            <div className='lg:p-4 lg:m-4 p-2   flex flex-row justify-center   items-center gap-3 bg-white   border '>
                <p className='text-sm md:text-lg  lg:text-xl text-[#008037] text-center'><PeopleAltIcon /></p>
                <div>
                    <p className='text-xs lg:text-xl font-bold text-center'>
                        CHAT WITH US

                    </p>
                   
                </div>
            </div>
            <div className='lg:p-4 lg:m-4 p-2  flex flex-row justify-center items-center gap-3   bg-white  border '>
                <p className='text-sm md:text-lg  lg:text-xl text-[#008037] text-center'><StoreIcon /></p>
                <div>
                    <p className='text-xs lg:text-xl font-bold text-center'>

                        SAME DAY PICK UP

                    </p>
                    <p className='text-xs lg:text-xl font-normal text-center'>
                    Call or order online
                    </p>
                   
                </div>
            </div>
            <div className='lg:p-4 lg:m-4 p-2 flex flex-row justify-center items-center gap-3   bg-white   border '>
                <p className='text-sm md:text-lg  lg:text-xl text-[#008037] text-center '><LocalShippingIcon /></p>
                <div>
                    <p className='text-xs lg:text-xl font-bold text-center'>

                        FREE LOCAL DELIVERY

                    </p>
                    <p className='text-xs lg:text-xl font-normal text-center'>
                    On orders over $100
                    </p>
                  
                </div>
            </div>



        </div>
    )
}

export default Banner