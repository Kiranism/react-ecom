import { Card, Stack, Typography } from "@mui/material";
import React from "react";

const EmailSended = () => {
  return (
    <Card sx={{ background: "#FFF0ED", padding: "20px" }}>
      <Typography variant="body1">
        A verification mail has been sent to registered mail. Please check your
        email to complete the registration.
      </Typography>
    </Card>
  );
};

export default EmailSended;
