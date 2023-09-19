import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Page from "../Page";

const ContactUs = () => {
  const navigate = useNavigate();
  return (
    <Page title="Contact Us">
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
              sx={{ cursor: "pointer", fontSize: { xs: "14px" } }}
              onClick={() => navigate("/")}
            >
              Home
            </Link>

            <Link
              color="primary"
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                fontSize: { xs: "14px" },
              }}
              aria-current="page"
            >
              Contact Us
            </Link>
          </Breadcrumbs>
        </div>
      </Box>
      <Container maxWidth="xl">
        <Box padding={{ xs: "20px", md: "20px", xl: "20px" }}>
          <Typography
            variant="h4"
            textAlign={"center"}
            fontWeight="500"
            sx={{
              fontSize: { xs: "16px", md: "23px" },
              margin: "5px",
            }}
          >
            Refresh your style with on-trend pieces from our best clothing
            collection.
          </Typography>
        </Box>
        <Stack
          direction={{ xs: "column", md: "column" }}
          padding={{ xs: "20px", md: "50px", xl: "0px" }}
          sx={{ height: { xs: "auto", md: "100vh" } }}
          spacing={6}
        >
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
            <Typography
              variant="h4"
              textAlign={"center"}
              fontWeight="bold"
              sx={{
                fontSize: { xs: "25px", md: "40px" },
                margin: "5px",
              }}
            >
              Contact Details
            </Typography>
            <Typography
              variant="body2" 
              textAlign={"center"}
              fontWeight="normal"
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                margin: "5px",
              }}
            >
              Indoseas Crest
              <br />
              Flat No. 1A, Near Kavu Bus stop, Chevayur, Kozhikode, Kerala-673017
              <br />
              Phone: +91 7592020805
              <br />
              Email: capricorn28official@gmail.com
            </Typography>
          </Box>

          <Box sx={{ marginTop: "20px" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.9498675418595!2d75.81364461479055!3d11.265095591991065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65bfa2bf01c29%3A0xb9cc6b95ee90aa8f!2sIndoseas%20Crest%20App.!5e0!3m2!1sen!2sin!4v1664613101585!5m2!1sen!2sin"
              width="100%"
              height="400px"
              style={{ border: "0" }}
              allowFullScreen="false"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </Box>
        </Stack>
      </Container>
    </Page>
  );
};

export default ContactUs;
