import React from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image';


const fadeImages = [
    {
        url: 'https://www.pandaexpress.com/sites/default/files/footer-files/panda_logo_vector.svg',

    },
    {
        url: 'https://static.wixstatic.com/media/8aa7b7_d0d6ae4bfc0f4a639a84e9d26126d8f9~mv2.png/v1/fill/w_214,h_204,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8aa7b7_d0d6ae4bfc0f4a639a84e9d26126d8f9~mv2.png',

    },
    {
        url: 'https://www.pandaexpress.com/sites/default/files/footer-files/panda_logo_vector.svg',

    },
    {
        url: 'https://www.pandaexpress.com/sites/default/files/footer-files/panda_logo_vector.svg',

    },
    {
        url: 'https://www.pandaexpress.com/sites/default/files/footer-files/panda_logo_vector.svg',

    },
    {
        url: 'https://static.wixstatic.com/media/8aa7b7_d0d6ae4bfc0f4a639a84e9d26126d8f9~mv2.png/v1/fill/w_214,h_204,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8aa7b7_d0d6ae4bfc0f4a639a84e9d26126d8f9~mv2.png',

    },
];
function LogoSlider() {
    return (
        <>

            <div className=" flex items-center lg:p-24 py-12 justify-center">
                {/* 1. */}
                <div className="lg:w-[200%] w-[50%] h-60  flex justify-center items-center  m-4 border-gray-600 overflow-hidden relative">
                    {/* 2. */}
                    <div className=" lg:w-[200%] w-[50%]  flex items-center p-5 h-20 justify-around absolute left-0 animate gap-20 animate">
                        {/* 3 */}
                        {fadeImages.map((i) => {
                            return (
                                <div className="flex justify-center items-start w-[10rem]">
                                    <img src={i.url} />
                                </div>
                            );
                        })}
                        {fadeImages.map((i) => {
                            return (
                                <div className="flex justify-center items-start w-[10rem]">
                                    <img src={i.url} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {/* <div>
            <div className="w-full p-16 ">
            <div className="h-[200px] m-auto overflow-hidden  relative w-auto">
                    <ul className="flex items-center h-full w-[calc(250px*14)] animate-scroll">
                    <li className="w-[250px]"><img src="https://www.pandaexpress.com/sites/default/files/footer-files/panda_logo_vector.svg" alt="" /></li>
                        <li className="w-[250px]">Image 2</li>
                        <li className="w-[250px]">Image 3</li>
                        <li className="w-[250px]">Image 4</li>
                        <li className="w-[250px]">Image 5</li>
                        <li className="w-[250px]">Image 6</li>
                        <li className="w-[250px]">Image 7</li>
                        <li className="w-[250px]">Image 8</li>
                        <li className="w-[250px]">Image 9</li>
                        <li className="w-[250px]">Image 10</li>
                        <li className="w-[250px]">Image 11</li>
                        <li className="w-[250px]">Image 12</li>
                        <li className="w-[250px]">Image 13</li>
                        <li className="w-[250px]">Image 14</li>
                        </ul>
                        </div>
                        </div>
                    </div> */}
        </>
    )
}

export default LogoSlider