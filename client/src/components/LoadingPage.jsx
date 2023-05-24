import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
function LoadingPage() {
    return (
        <div className=' lg:w-[100%] h-[50vh]  text-center flex justify-center items-center'>
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    )
}

export default LoadingPage