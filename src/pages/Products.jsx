import React from "react";
import Page from "../components/Page";
import Banner from "../components/productsPage/Banner";
import ProductListing from "../components/productsPage/ProductListing";

const Products = () => {
  return (
    <Page title="Products">
      <Banner />
      <ProductListing />
    </Page>
  );
};

export default Products;
