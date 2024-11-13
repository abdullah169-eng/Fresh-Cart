import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import useAllCategories from "../../../customHooks/useAllCategories";

export default function CategorySlider() {
  const { data, isError, isLoading } = useAllCategories();
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error />;
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
        },
      },
    ],
  };
  return (
    <>
      <Slider {...settings}>
        {data.data.data.map((category) => {
          return (
            <div key={category._id}>
              <img
                className="w-full h-64"
                src={category.image}
                alt={category.name}
              />
              <p className="text-center mb-5 mt-2">{category.name}</p>
            </div>
          );
        })}
      </Slider>
    </>
  );
}
