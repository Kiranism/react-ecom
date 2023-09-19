import React, { useState } from "react";
import RegisterForm from "../components/signup/RegisterForm";
import useResponsive from "../hooks/useResponsive";
import { styled } from "@mui/material/styles";
import { Link as routerLink } from "react-router-dom";
import { Card, Link, Container, Typography } from "@mui/material";
import Page from "../components/Page";
import EmailSended from "../components/signup/EmailSended";
const Signup = () => {
  const [mailSent, setMailSent] = useState(false);
  const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    // minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(8, 0),
  }));
  const smUp = useResponsive("up", "sm");

  const mdUp = useResponsive("up", "md");
  return (
    <Page title="Signup">
      <div>
        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Get started with Capricorn .
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 5 }}>
              Welcome to Capricorn. Fashion Forever.
            </Typography>

            {/* <AuthSocial /> */}
            {mailSent ? (
              <EmailSended />
            ) : (
              <RegisterForm setMailSent={setMailSent} />
            )}

            <Typography
              variant="body2"
              align="center"
              sx={{ color: "text.secondary", mt: 3 }}
            >
              By registering, I agree to Capricorn&nbsp;
              <Link
                underline="always"
                component={routerLink}
                color="text.primary"
                to="/termsandconditions"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                component={routerLink}
                underline="always"
                color="text.primary"
                to="/privacy"
              >
                Privacy Policy
              </Link>
              .
            </Typography>

            <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
              Already have an account?{" "}
              <Link underline="always" color="text.primary" href="/login">
                Login
              </Link>
            </Typography>
          </ContentStyle>
        </Container>
      </div>
    </Page>
  );
};

export default Signup;
