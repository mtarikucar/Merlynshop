import React from 'react'

const fadeImages = [
    {
        url: 'https://www.liberoayakkabi.com.tr/logo.jpg',

    },
    {
        url: 'https://www.toggaplus.com/images/logo-templateLogo-1.svg',

    },
    {
        url: './logo.png',

    }
];
function LogoSlider() {

  
    return (
        <>

            <div className="flex items-center h-[20vh] lg:h-[35vh] justify-center">
                {/* 1. */}
                <div className="w-[100%] h-[10vh] lg:h-[25vh] border-t border-b border-gray-600 overflow-hidden relative bg-white px-8">
                    {/* 2. */}
                    <div className="w-[200%] flex items-center h-[10vh] lg:h-[25vh] justify-around absolute left-0 animate gap-4 md:gap-8">
                        {/* 3 */}
                        {fadeImages.map((image) => {
                            return (
                                <div className="flex justify-center items-start w-[10rem] md:w-[16rem] lg:w-[20rem]">
                                    <img className="w-12 md:w-24 lg:w-32" src={image.url} />
                                </div>
                            );
                        })}
                        {fadeImages.map((image) => {
                            return (
                                <div className="flex justify-center items-start w-[10rem] md:w-[16rem] lg:w-[20rem]">
                                    <img className="w-12 md:w-24 lg:w-32" src={image.url} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        </>
    )
}

export default LogoSlider