import React, { useState, useEffect } from "react";
import axios from "axios";
import FeaturedProductCard from "./FeaturedProductCard";
import { Container, Typography } from "@mui/material";
import Loader from "../Loader";

const FeaturedProductSlider = () => {
  const [featured, setFeatured] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/product/user/featured`)
      .then((res) => {
        setFeatured(res.data.data.products);
        setLoading(false);
        console.log(res);
      });
  }, []);
  return (
    <Container
      maxWidth="xl"
      style={{ paddingLeft: "0px", paddingRight: "0px" }}
    >
      <div style={{ textAlign: "center", margin: "10px" }}>
        <Typography
          variant="h1"
          fontWeight={"bold"}
          sx={{ fontSize: { xs: "24px", md: "32px" } }}
        >
          FEATURED PRODUCTS
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ fontSize: { xs: "15px", md: "22px" } }}
        >
          Visit our shop to see amazing creating from our fashion house
        </Typography>
      </div>
      {loading ? <Loader /> : <FeaturedProductCard featured={featured} />}
    </Container>
  );
};

export default FeaturedProductSlider;
