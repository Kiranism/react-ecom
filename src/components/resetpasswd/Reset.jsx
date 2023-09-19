import { Button, Container, TextField, Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import React from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const navigate = useNavigate()
  const ResetSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ResetSchema,
    onSubmit: async () => {
      try {
        await axios
          .post(`${process.env.REACT_APP_API}/auth/user/reset-password`, {
            email: values.email,
          })
          .then((res) => {
            console.log("res", res);
            if (res.data.isError) {
              console.log("error");
              toast.error(res.data.message);
            } else {
              toast.success(res.data.message);
              console.log(res);
              // navigate("/login", { replace: true });
            }
          })
          .catch((res) =>  toast.error(res.data.message));
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } =
    formik;

  return (
    <Container
      maxWidth="sm"
      sx={{ paddingTop: "100px", paddingBottom: "100px" }}
    >
      <Typography variant="h4" textAlign={"center"}>
        Forgot your password?
      </Typography>
      <Typography variant="subtitle1" textAlign={"center"}>
        Please enter the email address associated with your account and We will
        email you a link to reset your password.
      </Typography>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <LoadingButton
              variant="contained"
              size="large"
              type="submit"
              fullWidth
              loading={isSubmitting}
            >
              Send Request
            </LoadingButton>
            <Button variant="outlined" size="large" fullWidth onClick={()=>navigate(-1)}>
              Back
            </Button>
          </Box>
        </Form>
      </FormikProvider>
    </Container>
  );
};

export default Reset;
