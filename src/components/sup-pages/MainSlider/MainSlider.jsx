import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderImage1 from "../../../assets/images/slider/slider-image-1.jpeg";
import sliderImage2 from "../../../assets/images/slider/slider-image-2.jpeg";
import sliderImage3 from "../../../assets/images/slider/slider-image-3.jpeg";
import bannerImage1 from "../../../assets/images/slider/banner-1.jpeg";
import bannerImage2 from "../../../assets/images/slider/banner-2.jpeg";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  return (
    <section className="md:flex md:flex-row-reverse">
      <article className="flex md:block md:w-1/4">
        <img
          className="w-1/2 md:w-full h-24 md:h-40"
          src={bannerImage1}
          alt="bannerImage1"
        />
        <img
          className="w-1/2 md:w-full h-24 md:h-40"
          src={bannerImage2}
          alt="bannerImage2"
        />
      </article>
      <article className="md:w-3/4">
        <Slider {...settings}>
          <div>
            <img
              className="w-full h-56 md:h-80"
              src={sliderImage1}
              alt="sliderImage1"
            />
          </div>
          <div>
            <img
              className="w-full h-56 md:h-80"
              src={sliderImage2}
              alt="sliderImage2"
            />
          </div>
          <div>
            <img
              className="w-full h-56 md:h-80"
              src={sliderImage3}
              alt="sliderImage3"
            />
          </div>
        </Slider>
      </article>
    </section>
  );
}
