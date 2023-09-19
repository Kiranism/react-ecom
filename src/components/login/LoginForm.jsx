import { Form, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
// material
import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import useUserStore from "../../app/userStore";

// component
import axios from "axios";
import { toast } from "react-toastify";
import Iconify from "../Iconify";
import { replace } from "lodash";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login, fullname, accessToken, isAuth, error, set } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state ? location.state : "/" || "/";
  console.log(location);

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      await login(values)
        .then((data) => {
          console.log("lg", data);
          if (data.isError) {
            toast.error(data.message);
            console.log(data);
          } else {
            set((state) => ({
              ...state,
              fullname: data.data.fullname,
              email: data.data.email,
              accessToken: data.data.accessToken,
              isAuth: true,
              error: false,
            }));
            navigate(from, { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            // sx={{ input: { color: "red" } }}
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
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
                  <IconButton onClick={handleShowPassword} edge="end">
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
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps("remember")}
                checked={values.remember}
              />
            }
            label="Remember me"
          />

          <Link
            component={RouterLink}
            variant="subtitle2"
            to="/reset-password"
            underline="hover"
            sx={{ color: "red" }}
          >
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
