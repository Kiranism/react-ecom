import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function VerifyResetPassword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const token = searchParams.get("token");
  const verifyEmail = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/auth/user/register/verificationlink/verify`,
        { token }
      );
      console.log(res);
      setMessage(res.data.message);
      setIsError(res.data.isError);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setMessage("Failed to verify your email. Please try again");
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: 450,
    margin: "auto",
    minHeight: "45vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(12, 0),
  }));
  return (
    <ContentStyle>
      {isLoading && <> Please wait while we are verifying your email...</>}
      {!isLoading && <>{message}.</>}
      {!isError && <Link to="/login">Please Login</Link>}
      {isError && <Link to="/login">Try Again</Link>}
    </ContentStyle>
  );
}
