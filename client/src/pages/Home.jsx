import React from "react";
import HomeAbout from "../components/home/HomeAbout";
import Banner from "../components/home/Banner";

import LogoSlider from "../Layout/LogoSlider";

import Products from "../components/products/Products";
import Review from "../components/home/Review";
import Loading from "../components/Loading";
import Carousel from "nuka-carousel";

function Home() {
  return (
    <div className="h-fit bg-[#eaeff6]">
      <Carousel
        autoplay={true}
        autoplayInterval={2500}
        className="rounded-lg h-fit mt-4"
        dragging={true}
      >
        <img src="/banner1.png" z/>

      </Carousel>
      < div className={`grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4  `} >

        <Products pagination={false} maxProduct={12} sort={"desc"}/>
      </div >


     

      {/* <Review /> */}
      <LogoSlider />
    </div>
  );
}

export default Home;
