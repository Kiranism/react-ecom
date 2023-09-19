import React from "react";
import { Box, Button, Typography } from "@mui/material";
import banner3 from "../assets/images/banner3.png";
import { useNavigate } from "react-router-dom";

const Banner2 = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: "#FFE6E1",
        display: "flex",
        flexWrap: "wrap",
        margin: { xs: "10px", md: "30px" },
      }}
    >
      <Box
        sx={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <img
          src={banner3}
          height="100%"
          width="300px"
          alt="banner"
          style={{ objectFit: "contain" }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          padding: { xs: "20px", md: "50px" },
          marginTop: { xs: "0px", md: "40px" },
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          color="#D47070"
          textAlign="initial"
          lineHeight="60px"
          sx={{ fontSize: { xs: 32, md: 64 } }}
          gutterBottom
        >
          Trendy Outfit of the day
        </Typography>

        <Typography
          variant="h4"
          fontSize="20px"
          fontWeight="medium"
          marginTop="10px"
          textAlign="initial"
          letterSpacing={1}
        >
          From casual day clothes to the latest trend, we make it easy to find what you're looking for. Just because you're shopping online doesn't mean you have to sacrifice style or fun.
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
    </Box>
  );
};

export default Banner2;
