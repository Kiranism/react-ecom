import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Breadcrumbs, Container, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Page from "./Page";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <Page title="About Us">
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
              About Us
            </Link>
          </Breadcrumbs>
        </div>
      </Box>
      <Container maxWidth="xl" sx={{ padding: "20px", minHeight: "65vh" }}>
        <Card sx={{ background: "#FFF0ED" }}>
          <CardContent>
            <Typography
              variant="h4"
              textAlign={"center"}
              fontWeight="bold"
              sx={{
                fontSize: { xs: "25px", md: "40px" },
                margin: "5px",
              }}
            >
              About Us
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Capricorn 28 is a brand born out of passion for quality clothing.
              What started as a casual dinner conversation between Farsana
              Shahbaz and Hamnath Shan from India, led to the idea of a new
              brand. A brand that would be created for people who not only want
              to look good, but also feel good. A brand that would signify
              boldness through simplicity, and set trends by being
              timeless.Capricorn 28 is here for thoughtful shoppers who
              appreciate quality clothing and unique designs that are not just
              good to look at, but are comfortable wearable articles. We are
              always curating fresh collections of handpicked high-quality
              wardrobe which you will fall in love with. But the best of what we
              have o offer will be collections handcrafted by our skilled and
              passionate craftsmen.No, we are not about delivering quantities.
              Capricorn 28 will always put quality ahead of numbers. And we will
              make it our mission to always get you the best. Be bold. Be
              timeless.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Capricorn 28 is here for thoughtful shoppers who appreciate
              quality clothing and unique designs that are not just good to look
              at, but are comfortable wearable articles. We are always curating
              fresh collections of handpicked high-quality wardrobe which you
              will fall in love with. But the best of what we have to offer will
              be collections handcrafted by our skilled and passionate
              craftsmen. Be bold. Be timeless.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              No, we are not about delivering quantities. Capricorn 28 will
              always put quality ahead of numbers. And we will make it our
              mission to always get you the best.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: "justify", marginTop: "10px" }}
            >
              Be bold. Be timeless.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default AboutUs;
