import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";

export default function Loader() {
  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Stack
        sx={{
          color: "grey.500",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
        spacing={2}
        direction="row"
      >
        <CircularProgress color="inherit" />
      </Stack>
    </Container>
  );
}
