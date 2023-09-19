import { Container, Box, Typography, Paper, Stack, Button } from "@mui/material";
import React from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        minHeight: "50vh",
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
          <CancelIcon sx={{ fontSize: "52px", color:'red' }} />
          <Typography variant="h4">Sorry!</Typography>
          <Typography variant="body2" sx={{color:'gray'}}> Your transaction has failed. Please go back and try again</Typography>
          <Button variant="outlined" sx={{borderRadius:'19px'}} onClick={()=>navigate("/products")}>Go back to products</Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Failure;
