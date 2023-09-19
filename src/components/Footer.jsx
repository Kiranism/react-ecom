import { Box, Container, List, ListItem, MenuItem, Stack, Typography } from "@mui/material";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import Logo from "../assets/images/capricorn.png";
import Link from "@mui/material/Link";
import { useNavigate, useSearchParams } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ backgroundColor: "#EEA7A7" }}>
      <Container maxWidth="xl" style={{ padding: "0 !important" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          paddingTop="20px"
          paddingBottom="20px"
          flexWrap="wrap"
          sx={{ padding: { xs: "10px", sm: "30px", lg: "30px" } }}
        >
          <Box
            sx={{
              flex: "1",
              flexDirection: "column",

              display: { xs: "none", md: "flex" },
            }}
          >
            <Typography variant="h6" fontWeight={"Bold"}>
              Customer Policies
            </Typography>
            <ListItem
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                color: "black",
                p: 0,
                "&:hover": {
                  color: "#D47070",
                },
              }}
              aria-current="page"
              onClick={() => navigate("/privacy")}
            >
              Privacy Policy
            </ListItem>

            <ListItem
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                color: "black",
                p: 0,
                "&:hover": {
                  color: "#D47070",
                },
              }}
              aria-current="page"
              onClick={() => navigate("/termsandconditions")}
            >
              Terms & Conditions
            </ListItem>
            {/* <ListItem
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                color: "black",
                "&:hover": {
                  color: "#D47070",
                },
              }}
              aria-current="page"
              onClick={() => navigate("/contactus")}
            >
              Contact us
            </ListItem> */}

            <ListItem
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                p: 0,
                color: "black",
                "&:hover": {
                  color: "#D47070",
                },
              }}
              aria-current="page"
              onClick={() => navigate("/shippingpolicy")}
            >
              Shipping Policy
            </ListItem>
            <ListItem
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                p: 0,
                color: "black",
                "&:hover": {
                  color: "#D47070",
                },
              }}
              aria-current="page"
              onClick={() => navigate("/refundpolicy")}
            >
              Returns & Exchanges
            </ListItem>
          </Box>
          <Box
            sx={{
              flex: "1",
              flexDirection: "column",
              paddingLeft: { xs: "0px" },
              display: { xs: "none", md: "flex" },
            }}
          >
            <Typography variant="h6" fontWeight={"Bold"}>
              Quick Links
            </Typography>
            <ListItem
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                p: 0,
                color: "black",
                "&:hover": {
                  color: "#D47070",
                },
              }}
              aria-current="page"
              onClick={() => navigate("/")}
            >
              Home
            </ListItem>

            <ListItem
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                p: 0,
                color: "black",
                "&:hover": {
                  color: "#D47070",
                },
              }}
              aria-current="page"
              onClick={() => navigate("/products")}
            >
              Products
            </ListItem>
            <ListItem
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                p: 0,
                color: "black",
                "&:hover": {
                  color: "#D47070",
                },
              }}
              aria-current="page"
              onClick={() => navigate("/about-us")}
            >
              About us
            </ListItem>

            <ListItem
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                p: 0,
                color: "black",
                "&:hover": {
                  color: "#D47070",
                },
              }}
              aria-current="page"
              onClick={() => navigate("/contact-us")}
            >
              Contact us
            </ListItem>
            {/* <ListItem
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                color: "black",
                "&:hover": {
                  color: "#D47070",
                },
              }}
              aria-current="page"
              onClick={() => navigate("/refundpolicy")}
            >
              Returns & Exchanges
            </ListItem> */}
          </Box>
          <Box sx={{ flex: "2", marginTop: "10px" }}>
            <Stack
              spacing={3}
              direction="row"
              pb={1}
              sx={{
                xs: { marginLeft: "0px", marginLeft: "-25px" },
                marginTop: "-5px",
              }}
            >
              <Box sx={{ display: { xs: "block", md: "none" }, marginTop: "0px" }}>
                <img src={Logo} height="90px" width="90px" />
              </Box>
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                }}
              >
                <img src={Logo} height="100px" width="100px" />
              </Box>

              <InstagramIcon
                style={{ marginTop: "30px" }}
                onClick={() => window.open("https://www.instagram.com/capricorn28_official/")}
              />
              <FacebookIcon style={{ marginTop: "30px" }} />
              <TwitterIcon style={{ marginTop: "30px" }} />
            </Stack>
            <Typography textAlign={"justify"}>
              Be this season's style icon with Capricorn 28 collections that provides contemporary
              pieces that exude quality, comfort and style. Designed with your comfort and lifestyle
              in mind, you'll look good and feel even better.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
