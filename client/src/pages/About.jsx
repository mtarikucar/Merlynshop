import React from 'react'
import AboutCard from '../components/about/AboutCard'
import AboutImageGallery from '../components/about/AboutImageGallery'
import { useQuery } from "react-query";
import LoadingPage from '../components/LoadingPage';
function About() {


  const { isLoading, error, data } = useQuery("products", () => {
    return fetch(`https://whale-app-952oz.ondigitalocean.app/api/product/`).then((res) =>
      res.json()
    );
  });

  if (isLoading) return <LoadingPage />;

  if (error) return "An error has occurred: " + error.message;

  console.log(data);
  return (
    <div className='bg-slate-50 w-full'>
      <AboutCard />
      <div className="inline-flex items-center justify-center w-full mt-10 px-8">
        <hr className="w-full h-1 my-8 bg-gray-500 border-0 rounded " />
        <div className="absolute px-4 -translate-x-1/2 bg-gray-50 left-1/2 text-center text-4xl font-bold">
          IMAGE GALLERY
        </div>
      </div>
      {
        data &&
        data?.map((product, key) => (
          <AboutImageGallery product={product} key={key} />
        ))
      }
    </div>
  )
}

export default About