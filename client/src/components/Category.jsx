import React from 'react'

function Category({ data }) {
  return (
    <>

      {/*  <card  className="relative rounded-lg">
        <a href="/">

          <img src={data.image} className="object-cover w-full h-full rounded-lg" />
          <div className="absolute w-full h-full bottom-0 bg-gradient-to-r from-fuchsia-700/30 to-violet-700 rounded-lg flex flex-col items-center justify-center text-center">

            <p className="text-3xl  text-white ">
              {data.name}
            </p>
          </div>
        </a>
      </card> */}

      <div className="">
        <div className='bg-white rounded-lg' >
          <a href="">

            <img className=" md:w-60 md:h-60 h-40 w-40 lg:h-80 border border-b-0 rounded-b-none p-3 lg:w-80 rounded-lg" src={data.image} />
          </a>
          <a href="" className=''>

            <p className=' text-black pb-4 text-center text-2xl'> {data.name} </p>
          </a>
        </div>

      </div>



    </>

  )
}

export default Category