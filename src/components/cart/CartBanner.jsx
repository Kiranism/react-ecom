import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

const CartBanner = () => {
  // function handleClick(event) {
  //   event.preventDefault();
  //   console.info("You clicked a breadcrumb.");
  // }
  const navigate = useNavigate();
  return (
    <>
      <Box
        style={{
          backgroundColor: "#FFE6E1",
          paddingBottom: "10px",
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Home
            </Link>

            <Link
              color="primary"
              sx={{ cursor: "pointer", textDecoration: "none" }}
              aria-current="page"
            >
              Cart
            </Link>
          </Breadcrumbs>
        </div>
      </Box>
    </>
  );
};

export default CartBanner;
