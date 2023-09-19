import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useNavigate, useSearchParams } from "react-router-dom";

const Banner = () => {
  // function handleClick(event) {
  //   event.preventDefault();
  //   console.info("You clicked a breadcrumb.");
  // }
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("searchParams", searchParams);
  const searchActive = searchParams.get("search") === "active";
  const search = searchParams.get("search");
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
              sx={{ cursor: "pointer", fontSize: { xs: "14px" } }}
              onClick={() => navigate("/")}
            >
              Home
            </Link>

            <Link
              color={search ? "inherit" : "primary"}
              underline={search ? "hover" : "none"}
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                fontSize: { xs: "14px" },
              }}
              aria-current="page"
              onClick={() => navigate("/products")}
            >
              Products
            </Link>
            {search && (
              <Link
                color="primary"
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  fontSize: { xs: "14px" },
                }}
                aria-current="page"
              >
                {search}
              </Link>
            )}
          </Breadcrumbs>
        </div>
      </Box>
    </>
  );
};

export default Banner;
