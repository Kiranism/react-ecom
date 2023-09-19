import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";

const FeaturedCard = ({ productItems, addToCart }) => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  // };
  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: "10px",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const ProductImgStyle = styled("img")({
    top: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
  });

  return (
    <>
      <Slider {...settings}>
        {productItems?.map((productItems) => {
          return (
            <div className="box">
              <div
                className="product mtop"
                style={{
                  // backgroundColor: "red",
                  // padding: "0!important",
                  width: "300px",
                  height: "400px",
                }}
              >
                <div className="img">
                  <ProductImgStyle src={productItems.imageUrl} />
                  {/* <div className="product-like">
                    <label>5</label> <br />
                    <i className="fa-regular fa-heart" onClick={increment}></i>
                  </div> */}
                </div>
                <div
                  className="product-details"
                  style={{
                    position: "absolute",
                    bottom: 0,

                    color: "white",
                    width: "100%",
                    background:
                      "linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent)",
                  }}
                >
                  <h3 style={{ margin: "10px" }}>{productItems.name}</h3>
                  <div className="rate">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                  </div>
                  {/* <div className="price">
                    <h4>$10.00 </h4>
                    {/* step : 3  
                     if hami le button ma click garryo bahne 
                    */}
                  {/* <button
                      onClick={() => {
                        toast.success(productItems.name + "added to cart");
                        addToCart(productItems);
                      }}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>  */}
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default FeaturedCard;
