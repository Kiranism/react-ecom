import React, { useState, useEffect } from "react";
import axios from "axios";
import FeaturedProductCard from "./NewProductCard";
import { Container, Typography } from "@mui/material";
import RelatedProductCard from "./NewProductCard";
import NewProductCard from "./NewProductCard";
import Loader from "../Loader";

const NewProductSlider = () => {
  const [newProducts, setNewProducts] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/product/user/new-arrival`)
      .then((res) => {
        setNewProducts(res.data.data.products);
        setLoading(false);
        console.log(res);
      });
  }, []);
  return (
    <Container
      maxWidth="xl"
      style={{ paddingLeft: "0px", paddingRight: "0px" }}
    >
      {/* <section className="flash" style={{ padding: "50px 0" }}> */}
      {/* <div className="container"> */}
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Typography
          variant="h1"
          fontWeight={"bold"}
          sx={{ fontSize: { xs: "24px", md: "32px" } }}
        >
          WHAT'S YOUR STYLE?
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ fontSize: { xs: "15px", md: "22px" } }}
        >
          Choose from our assortment of trendy clothes that best match your chic style.
        </Typography>
      </div>
      {loading ? <Loader /> : <NewProductCard newProducts={newProducts} />}
      {/* </div> */}
      {/* </section> */}
    </Container>
  );
};

export default NewProductSlider;
