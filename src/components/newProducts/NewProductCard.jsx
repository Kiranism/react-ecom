import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { styled } from "@mui/material/styles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "react-toastify/dist/ReactToastify.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next" style={{ right: "5px" }}>
        <ChevronRightIcon
          sx={{ fontSize: { xs: 25, md: 50 }, color: "white" }}
        />
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev" style={{ left: "5px" }}>
        <ChevronLeftIcon
          sx={{ fontSize: { xs: 25, md: 50 }, color: "white" }}
        />
      </button>
    </div>
  );
};

const NewProductCard = ({ newProducts }) => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
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
    infinite: newProducts?.length < 4 ? false : true,
    centerMode: true,
    centerPadding: "10px",
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          dots: true,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          nextArrow: false,
          prevArrow: false,
          arrows: false,
        },
      },
    ],
  };

  // const ProductImgStyle = styled("img")({
  //   top: 0,
  //   width: "100%",
  //   height: "100%",
  //   objectFit: "cover",
  //   position: "absolute",
  // });

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff3d47",
    },
  });

  return (
    <>
      <Slider {...settings}>
        {newProducts?.map((productItem, index) => {
          return (
            <div className="box" key={index}>
              <div className="product mtop">
                <Card
                  sx={{
                    maxWidth: { xs: 190, sm: 220, md: 280 },
                    minWidth: { xs: 190, sm: 220, md: 280 },
                    "@media screen and (max-width: 394px)": {
                      minWidth: "170px",
                      maxWidth: "170px",
                    },
                    "@media screen and (max-width: 370px)": {
                      minWidth: "150px",
                      maxWidth: "150px",
                    },
                    // maxWidth: 300,
                    // minWidth: 300,
                    margin: "0 auto",
                    backgroundColor: "#FFF0ED",
                  }}
                  onClick={() =>
                    navigate(
                      `/products/view?product=${productItem._id}&variant=${productItem.variant._id}`
                    )
                  }
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      sx={{
                        maxHeight: { xs: 220, sm: 270, md: 340 },
                        minHeight: { xs: 220, sm: 270, md: 340 },
                        "@media screen and (max-width: 375px)": {
                          minHeight: "200px",
                          maxHeight: "200px",
                        },
                      }}
                      image={productItem.images[0]}
                      alt="product images"
                    />

                    <CardContent
                      sx={{
                        padding: {
                          xs: "8px 8px 0px 8px",
                          md: "16px 16px 0px 16px",
                        },
                      }}
                    >
                      <Typography
                        // gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ fontSize: { xs: "15px", md: "20px" } }}
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        overflow="hidden"
                      >
                        {productItem.shortName
                          ? productItem.shortName
                          : productItem.name}
                      </Typography>

                      <Stack direction={"row"} spacing={1} alignItems="center">
                        <Typography
                          variant="h6"
                          color="primary"
                          sx={{
                            fontSize: { xs: 14, md: 16 },
                          }}
                          display="flex"
                          alignItems="center"
                        >
                          &#8377;
                          {productItem.variant.sellingPrice}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="text.secondary"
                          sx={{
                            fontSize: { xs: 11, md: 12 },
                            textDecoration: "line-through",
                          }}
                        >
                          &#8377;{productItem.variant.price}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                  <CardActions
                    sx={{
                      backgroundColor: "#FFF0ED",
                      padding: {
                        xs: "0px 8px 8px 8px",
                        md: "0px 16px 16px 16px",
                      },
                    }}
                  >
                    <StyledRating
                      readOnly
                      name="customized-color"
                      defaultValue={productItem.rating}
                      getLabelText={(value) =>
                        `${value} Heart${value !== 1 ? "s" : ""}`
                      }
                      precision={0.5}
                      sx={{ fontSize: { xs: 12, md: 20 } }}
                    />
                  </CardActions>
                </Card>
              </div>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default NewProductCard;
