import React from 'react'

function AboutCard() {
    return (
        <div className='h-fit w-full py-14 shadow-lg  lg:px-32'>

            <div className='grid md-grid-cols-6 lg:grid-cols-12 p-5  bg-white w-full'>
                <div className='col-span-6 flex justify-center items-center'>
                    <div >
                        <img src="/about.jpg" alt="" />
                    </div>
                </div>
                <div className='col-span-6 w-full h-full flex flex-col  justify-between  p-8 space-y-3 md:px-12 lg:px-16'>

                        <div className='flex justify-center text-4xl '>

                            <p>Nur light LLC</p>
                        </div>
                        <div className='flex justify-start '>

                            <p>Our company has been distributing environmentally friendly packaging products like food containers and other kitchen utensils in the DMV area. We offer low price but high-quality production to the customer. Therefore, our distributing partner has been expanding. We deliver directly to the customer when the perches meet a certain number. Customers also can take the production from our warehouse.</p>
                        </div>
                        <div>

                            <p className='text-gray-400'>Nurlight</p>
                        </div>
                   
                </div>
            </div>

        </div>
    )
}

export default AboutCard