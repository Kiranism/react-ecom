import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Alert, FormHelperText } from "@mui/material";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
// import axiosInstance from "../../utils/AxiosInstance";
import CircularProgress from "@mui/material/CircularProgress";
// import Logo from "../../assets/logo.png";
import axios from "axios";
import Loader from "../Loader";
import { LoadingButton } from "@mui/lab";

export default function ForgotPassword() {
  const [validMail, setValidMail] = useState(false);
  const [data, setData] = useState("");
  const [clicked, setClicked] = useState(false);
  const [searchParams] = useSearchParams();
  const [spinner, setSpinner] = useState(true);
  const navigate = useNavigate();
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Must be 6 characters or more")
      .max(20, "Max length 20 Exceeded")
      .required("Please enter Your Password"),
    confirmPassword: Yup.string()
      .min(6, "Must be 6 characters or more")
      .required("Confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const token = searchParams.get("token");
  console.log(token);

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        await axios
          .post(
            `${process.env.REACT_APP_API}/auth/user/reset-password/verify`,
            { token: token }
          )
          .then((response) => {
            setSpinner(false);
            if (!response.data.isError) {
              // means success
              console.log(response);
              setData(response.data);

              setValidMail(true);
            } else {
              console.log(response);
              setData(response.data.message);
              setValidMail(false);
              //   navigate("/error");
            }
          });
      } catch (error) {
        // navigate("/error");
        console.log(error);
        setValidMail(false);
      }
    };
    verifyEmailUrl();
  }, [token]);

  const handleSubmit = async (values) => {
    const { password } = values;
    console.log("hello", password);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/auth/user/reset-password`,
        {
          token,
          password,
        }
      );
      console.log(response.data);

      if (response.data.isError) {
        setData(response.data);
        setValidMail(false);
        setClicked(false);
        // props.resetForm();
      } else {
        setValidMail(true);
        setData(response.data);
        setClicked(true);
        //   props.resetForm();
      }

      // props.resetForm();
    } catch (error) {
      console.log("Error", error);
      //   navigate("/error")
      alert(error);
    }
  };

  return (
    <>
      {spinner && <Loader />}
      {!spinner && validMail ? (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "24px",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar> */}{" "}
            {/* <img src={Logo} style={{ width: "200px" }} /> */}
            <Typography component="h1" variant="h5" textAlign={"center"}>
              Password Reset
            </Typography>
            <Box>
              {!clicked ? (
                <Box sx={{ mt: 1 }}>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                  >
                    {(props) => (
                      <Form>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          autoFocus
                          name="password"
                          label="New Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          {...props.getFieldProps("password")}
                          helperText={<ErrorMessage name="password" />}
                          error={
                            props.errors.password && props.touched.password
                          }
                        />
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="confirmPassword"
                          label="Confirm Password"
                          type="password"
                          id="confirmPassword"
                          autoComplete="current-password"
                          {...props.getFieldProps("confirmPassword")}
                          helperText={<ErrorMessage name="confirmPassword" />}
                          error={
                            props.errors.confirmPassword &&
                            props.touched.confirmPassword
                          }
                        />

                        {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                  {...props.getFieldProps("rememberme")}
                  helperText={<ErrorMessage name="rememberme" />}
                  error={props.errors.rememberme && props.touched.rememberme}
                /> */}
                        <LoadingButton
                          type="submit"
                          fullWidth
                          loading={props.isSubmitting}
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Submit
                        </LoadingButton>
                        {data && (
                          <Alert
                            severity={
                              data.isError === false ? "success" : "error"
                            }
                          >
                            {data.message}
                          </Alert>
                        )}
                      </Form>
                    )}
                  </Formik>

                  <Grid container>
                    {/* <Grid item>
                  <Link href="/signup" variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid> */}
                  </Grid>
                </Box>
              ) : (
                <Box sx={{ mt: 1 }}>
                  <Typography>
                    Your password has been reset successfully <br />
                  </Typography>
                  <Button
                    onClick={() => navigate("/login")}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      ) : (
        <Container component="main" maxWidth="xs">
          <Typography variant="h5">{data}</Typography>
        </Container>
      )}
    </>
  );
}
