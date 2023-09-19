import { Box, Breadcrumbs } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CheckAddress from "../components/checkout/CheckAddress";
import Link from "@mui/material/Link";


const Checkout = () => {
  const navigate = useNavigate();

  return (
    <div>
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
              underline="hover"
              color="inherit"
              sx={{ cursor: "pointer", fontSize: { xs: "14px" } }}
              onClick={() => navigate("/cart")}
            >
              Cart
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
              Checkout
            </Link>
          </Breadcrumbs>
        </div>
      </Box>
      <CheckAddress />
    </div>
  );
};

export default Checkout;
