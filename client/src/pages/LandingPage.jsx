import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
// Replace with your logo image

function LandingPage() {
    return (
        <div className="bg-gray-100 h-screen w-full justify-center flex flex-col place-items-center">
            <header className="bg-white py-6 w-full">
                <div className="container mx-auto px-4">
                    <img src="/logo2.png" alt="" className="w-20 h-auto" />
                </div>
            </header>

            <main className="container  mx-auto py-16 text-center h-full">
                <div className='flex flex-col items-center justify-center'>

                    <img className='w-64 p-8' src="https://www.webtasarimgezegeni.com/wp-content/uploads/2020/03/web-sitesi-olusturma.png" alt="" />
                    <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
                    <p className="text-gray-700 mb-8">
                        We are upgrading our website. Please login later. Thank you.
                    </p>

                    <div className="flex items-center justify-center mb-8">
                        <FaEnvelope className="text-green-600 mr-2" />
                        <span className="text-gray-700"> nurlightllc@gmail.com</span>
                    </div>

                    <div className="flex items-center justify-center  mb-8">
                        <FaPhone className="text-green-600 mr-2" />
                        <span className="text-gray-700"> + 01 2244210338</span>
                    </div>

                    <div className="flex  justify-center  items-center">
                        <FaMapMarkerAlt className="text-green-600 mr-2" />
                        <span className="text-gray-700">16200 Livingston Rd
                            Accokeek, MD 20607
                            United States
                        </span>
                    </div>
                </div>
            </main>

            <footer className="bg-gray-900 w-full text-white py-4">
                <div className="container mx-auto px-4 text-center">
                    &copy; 2023. Nurlight LLC. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;