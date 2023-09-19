import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import banner from "../assets/images/banner.png";
import ban from "../assets/images/ban.webp";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        // width: "100%",
        height: "470px",
        backgroundColor: "#FFE6E1",
        height: "100%",
        display: "flex",
        flexWrap: "wrap",
        margin: { xs: "10px", md: "30px" },
      }}
    >
      <Box
        sx={{
          flex: 1,
          padding: { xs: "20px", md: "50px" },
          marginTop: "40px",
          marginLeft: { xs: "0px", md: "70px" },
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="initial"
          sx={{ fontSize: { xs: 42, md: 64, sm: 32 } }}
        >
          EXPLORE
        </Typography>
        <Typography
          variant="h3"
          fontSize="64px"
          fontWeight="bold"
          color="#D47070"
          textAlign="initial"
          lineHeight="60px"
          sx={{ fontSize: { xs: 42, md: 64, sm: 32 } }}
          gutterBottom
        >
          YOUR STYLE
        </Typography>
        <Typography
          variant="h4"
          fontSize="18px"
          fontWeight="medium"
          marginTop="10px"
          textAlign="initial"
        >
          You have a unique appeal. We have the right fashion forward apparel to make you shine.
        </Typography>
        <Button
          sx={{
            fontSize: { xs: "15px", md: "20px" },
            fontWeight: "bold",
            backgroundColor: "#D47070",
            color: "white",
            borderRadius: { xs: "5px", md: "10px" },
            float: "left",
            marginTop: { xs: "20px", md: "40px" },
            padding: { xs: "4px 20px 4px 20px", md: "5px 20px 5px 20px" },
          }}
          onClick={() => navigate("/products")}
        >
          SHOP NOW
        </Button>
      </Box>
      <Box
        sx={{
          height: "100%",
          flex: 1,
          marginLeft: { sm: 40 },
          display: { xs: "none", md: "flex" },
        }}
      >
        <img src={banner} height="100%" width="300px" />
      </Box>
    </Box>
  );
};

export default Banner;
