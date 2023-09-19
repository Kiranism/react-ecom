import React, { useState, useEffect } from "react";
import axios from "axios";
import FeaturedProductCard from "./RelatedProductCard";
import { Container, Typography } from "@mui/material";
import RelatedProductCard from "./RelatedProductCard";
import Loader from "../Loader";

const RelatedProductSlider = ({ productId }) => {
  const [related, setRelated] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/product/user/related`, {
        params: { productId: productId },
      })
      .then((res) => {
        setRelated(res.data.data.products);
        setLoading(false);
        console.log(res);
      });
  }, []);
  return (
    <Container
      maxWidth="xl"
      style={{ paddingLeft: "0px", paddingRight: "0px" }}
    >
      <div
        style={{ textAlign: "center", marginBottom: "20px", marginTop: "20px" }}
      >
        <Typography
          variant="h1"
          fontWeight={"bold"}
          sx={{ fontSize: { xs: "24px", md: "32px" } }}
        >
          RELATED PRODUCTS
        </Typography>
        {/* <h4>Visit our shop to see amazing creating from our fashion house</h4> */}

        {loading ? <Loader /> : <RelatedProductCard related={related} />}
      </div>
    </Container>
  );
};

export default RelatedProductSlider;
