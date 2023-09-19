import { Box, Button } from "@mui/material";
import React from "react";
import SingleProduct from "../components/products/SingleProduct";
import RelatedProductSlider from "../components/relatedProducts/RelatedProductSlider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import SingleProductBanner from "../components/products/SingleProductBanner";
import { useState } from "react";



const ProductView = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  return (
    <div>
      <SingleProductBanner name={name} />
      <SingleProduct setName={setName} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: "20px", md: "40px" },
        }}
      >
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          style={{ color: "black" }}
          onClick={() => navigate("/products")}
        >
          Back to All Products
        </Button>
      </Box>
    </div>
  );
};

export default ProductView;
