import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import Banner from "../components/Banner";
import Banner2 from "../components/Banner2";
import FeaturedDeals from "../components/featuredCategory/FeaturedDeals";
import ProductSlider from "../components/featuredProducts/FeaturedProductSlider";
import FlashDeals from "../components/flashDeals/FlashDeals";
import NewProductSlider from "../components/newProducts/NewProductSlider";
import Page from "../components/Page";

const Home = ({ productItems }) => {
  return (
    <Page title="Home">
      <Banner />

      {/* Featured Categories*/}
      {/* <FeaturedDeals /> */}
      <NewProductSlider />
      <Box mt={5}>
        <Banner2 />
      </Box>
      <Box mt={4} mb={5}>
        <ProductSlider />
      </Box>

      {/* New in this season */}
      {/* <FlashDeals productItems={productItems} /> */}
    </Page>
  );
};

export default Home;
