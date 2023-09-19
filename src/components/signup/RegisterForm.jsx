import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// material
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../Iconify";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

export default function RegisterForm({ setMailSent }) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Full name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    contactNumber: Yup.string()
      .matches(/^[6-9]{1}[0-9]{9}$/, "Enter valid number")
      .required("Contact Number is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      contactNumber: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      try {
        axios
          .post(`${process.env.REACT_APP_API}/auth/user/register`, {
            fullname: values.fullName,
            email: values.email,
            password: values.password,
            contactNumber: values.contactNumber,
          })
          .then((res) => {
            console.log("res login", res);
            if (res.data.isError) {
              setError(true);
            } else {
              toast.success(res.data.message);
              setMailSent(true);
              // navigate("/login", { replace: true });
            }
          })
          .catch((res) => toast.error(res.data.message));
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Full Name"
              {...getFieldProps("fullName")}
              error={Boolean(touched.fullName && errors.fullName)}
              helperText={touched.fullName && errors.fullName}
            />

            {/* <TextField
              fullWidth
              label="Last name"
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            /> */}
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label="Contact Number"
            {...getFieldProps("contactNumber")}
            error={Boolean(touched.contactNumber && errors.contactNumber)}
            helperText={touched.contactNumber && errors.contactNumber}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
