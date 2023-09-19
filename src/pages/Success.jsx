import {
  Container,
  Box,
  Typography,
  Paper,
  Stack,
  Button,
} from "@mui/material";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        minHeight: "65vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          backgroundColor: "#FFF0ED",
          padding: "20px",
        }}
      >
        <Stack alignItems={"center"} spacing={2}>
          <CheckCircleIcon sx={{ fontSize: "52px", color: "green" }} />
          <Typography variant="h5" textAlign={"center"}>
            Your Order is complete
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "gray" }}
            textAlign={"center"}
          >
            {" "}
            You will be recieving a confirmation email with order details
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              sx={{ borderRadius: "19px" }}
              onClick={() => navigate("/")}
            >
              {" "}
              Continue Shopping
            </Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: "19px" }}
              onClick={() => navigate("/orders")}
            >
              {" "}
              View Order Details
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Success;
