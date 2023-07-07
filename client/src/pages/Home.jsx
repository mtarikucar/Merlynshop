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
        className="rounded-lg max-h-[480px]"
        dragging={true}
      >
        <img src="/m2.png" />
        <img src="/m3.png" />
        <img src="/m4.png" />
      </Carousel>
      <Products maxProduct={2} />

      {/* <HomeAbout /> */}

      <Review />
      <LogoSlider />
    </div>
  );
}

export default Home;
