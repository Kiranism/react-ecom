import { Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import useResponsive from "../hooks/useResponsive";
import LoginForm from "../components/login/LoginForm";
import Page from "../components/Page";

const Login = () => {
  const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    // minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(12, 0),
  }));
  const smUp = useResponsive("up", "sm");

  const mdUp = useResponsive("up", "md");
  return (
    <Page title="Login">
      {/* <div style={{ right: "0", marginRight: "50px", position: "absolute" }}>
        {smUp && (
          <Typography variant="body2" sx={{ mt: { md: -2 } }}>
            Don’t have an account? {""}
            <Link variant="subtitle2" component={Link} to="/signup">
              Get started
            </Link>
          </Typography>
        )}
      </div> */}

      <Container maxWidth="sm">
        <ContentStyle>
          <Typography variant="h4" gutterBottom>
            Sign in to Capricorn
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 5 }}>
            Enter your details below.
          </Typography>

          {/* <AuthSocial /> */}

          <LoginForm />

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don’t have an account?{" "}
            <Link variant="subtitle2" component={Link} to="/signup">
              Get started
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </Page>
  );
};

export default Login;
