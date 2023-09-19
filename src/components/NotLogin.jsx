import { Container, Box, Typography, Button, Stack } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NotLogin = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.pathname || "/";
  console.log(location);
  return (
    <Container maxWidth="xl" sx={{ minHeight: "55vh" }}>
      <Stack alignItems={"center"} pt={20}>
        <Typography variant="h6">PLEASE LOG IN</Typography>
        <Typography variant="h6">{title}.</Typography>

        <Button
          variant="outlined"
          onClick={() => navigate("/login", { state: from })}
        >
          Login
        </Button>
      </Stack>
    </Container>
  );
};

export default NotLogin;
