import { Breadcrumbs, Link, Box } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import OrderViewCard from "../components/order/OrderViewCard";

const OrderView = () => {
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
              to="/"
              component={RouterLink}
              sx={{ cursor: "pointer", fontSize: { xs: "14px" } }}
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              to="/orders"
              component={RouterLink}
              sx={{ cursor: "pointer", fontSize: { xs: "14px" } }}
            >
              Orders
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
              Order Detail
            </Link>
          </Breadcrumbs>
        </div>
      </Box>
      <OrderViewCard />
    </div>
  );
};

export default OrderView;
