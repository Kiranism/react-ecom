import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  Divider,
  Container,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { LoadingButton } from "@mui/lab";
import Logo from "../../assets/images/capricorn.png";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../app/cartStore";

const CheckAddress = () => {
  const { getCart, cartItems, cartInfo } = useCartStore();
  // const [cartInfo, setCartInfo] = useState();
  const [userInfo, setUserInfo] = useState();
  const [userContactNo, setUserContactNo] = useState();
  const [orderInfo, setOrderInfo] = useState();
  const [contactUpdated, setContactUpdated] = useState(false);
  const [razorPayClosed, setRazorPayClosed] = useState(false);
  const [paymentSettings, setPaymentSettings] = useState({});
  const [isPaymentEnabled, setPaymentEnabled] = useState(false);

  const [cartProducts, setCartProducts] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getCart();
    getPaymentSettings();
    getUserInfo();
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  useEffect(() => {
    getUserInfo();
  }, [contactUpdated]);

  const addressSchema = Yup.object().shape({
    fullname: Yup.string().required("Fullname is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    email: Yup.string().email("Enter a valid email"),
    postCode: Yup.number("Enter Valid Pincode").required("Post code is required"),
    contactNumber: Yup.number().required("Contact Number is required"),
    country: Yup.string().required("Country  is required"),
    landmark: Yup.string().required("LandMark is required"),
  });

  // const getCartProducts = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_API}/cart`)
  //     .then((res) => {
  //       if (!res.data.isError) {
  //         console.log(res);

  //         setCartInfo(res.data.data);
  //         setCartProducts(res.data.data.products);
  //       }
  //     })
  //     .catch((res) => {
  //       console.log(res);
  //     });
  // };

  const getUserInfo = () => {
    axios
      .get(`${process.env.REACT_APP_API}/user/userdata`)
      .then((res) => {
        if (!res.data.isError) {
          console.log(res);
          setUserInfo(res.data.data.user);
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const getPaymentSettings = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API}/settings/user/payment-method`)
        .then((res) => {
          if (!res.data.isError) {
            console.log("payment", res);
            setPaymentSettings(res.data.data);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      address: "",
      city: "",
      email: "",
      postCode: "",
      contactNumber: "",
      landmark: "",
      country: "India",
      paymentType: "cod",
    },
    validationSchema: addressSchema,
    onSubmit: async () => {
      console.log("orderInfo", orderInfo);
      if (orderInfo) {
        openPayModal(orderInfo);
      } else {
        try {
          await axios
            .post(`${process.env.REACT_APP_API}/order/request`, {
              maxPrice: Number(cartInfo.maxPrice),
              subTotal: Number(cartInfo.subTotal),
              grandTotal: Number(cartInfo.grandTotal).toFixed(2),
              shippingAddress: {
                email: values.email,
                fullname: values.fullname,
                contactNumber: values.contactNumber,
                city: values.city,
                address: values.address,
                country: values.country,
                landmark: values.landmark,
                postCode: values.postCode,
              },
              paymentType: values.paymentType,
            })
            .then((res) => {
              if (!res.data.isError) {
                console.log("test", res);
                setOrderInfo(res.data.data.responsePaload);
                if (values.paymentType === "cod") {
                  navigate("/order/success");
                  getCart();
                  return;
                }
                openPayModal(res.data.data.responsePaload);
                getCart();
              } else {
                navigate("/cart");
                getCart();
              }
            })
            .catch((err) => console.log(err));
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const openPayModal = (orderInfo) => {
    const options = {
      key: orderInfo.key,
      amount: orderInfo.amount, //  = INR 1
      name: orderInfo.name,
      order_id: orderInfo.order_id,
      description: "Explore Your Style",
      image: Logo,
      handler: function (response) {
        // alert("payment Success", response.razorpay_payment_id);
        navigate("/order/success");
        // console.log(response);
      },
      prefill: {
        name: orderInfo?.prefill.name,
        contact: orderInfo?.prefill.contact,
        email: orderInfo?.prefill.email,
      },
      notes: orderInfo.notes,
      theme: {
        color: "#FFF0ED",
      },
      modal: {
        confirm_close: true,
        ondismiss: function () {
          setRazorPayClosed(true);
          console.log("This code runs when the popup is closed");
        },
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.captured", function (response) {
      console.log(response);
    });
    rzp1.on("payment.failed", function (response) {
      console.log(response);
      navigate("/order/failure");
    });
    rzp1.open();
  };

  const handleAddNo = () => {
    try {
      axios
        .put(`${process.env.REACT_APP_API}/user/update-number`, {
          contactNumber: userContactNo,
        })
        .then((res) => {
          if (!res.data.isError) {
            console.log(res);
            setContactUpdated(true);
            toast.success("User Info Updated");
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  console.log("cartitems", cartItems);

  useEffect(() => {
    // Check if any payment option is enabled
    const enabled = Object.values(paymentSettings).some(({ isEnabled }) => isEnabled);
    setPaymentEnabled(enabled);
  }, [paymentSettings]);

  return (
    <Container maxWidth="xl">
      {/* <Typography
                    variant="h4"
                    // mb={2}
                    sx={{
                      // fontSize: { xs: "17px", md: "16px " },
                    }}
                  >
                    Checkout
                  </Typography> */}
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            pt={{ xs: 0, md: 5 }}
            pb={{ xs: 0, md: 5 }}
            gap={2}
          >
            {/* Address  */}
            <Box sx={{ flex: 3 }}>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: "#FFF0ED",
                  marginBottom: "10px",
                  padding: "20px",
                }}
              >
                <Box mb={{ xs: 2, md: 8 }}>
                  <Typography
                    variant="h6"
                    mb={2}
                    sx={{
                      fontSize: { xs: "17px", md: "16px " },
                    }}
                  >
                    Contact Information
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      id="outlined-basic"
                      label="Fullname"
                      variant="outlined"
                      fullWidth
                      value={userInfo?.fullname}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      value={userInfo?.email}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    {/* <TextField
                    id="outlined-basic"
                    label="Mobile"
                    variant="outlined"
                    fullWidth
                    value={userInfo?.contactNumber}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  /> */}
                    {userInfo?.contactNumber ? (
                      <TextField
                        id="outlined-basic"
                        label="Mobile"
                        variant="outlined"
                        fullWidth
                        value={userInfo?.contactNumber}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    ) : (
                      <>
                        <TextField
                          id="outlined-basic"
                          label="Add Number"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          // InputProps={{
                          //   readOnly: true,
                          // }}
                          value={userContactNo}
                          onChange={(e) => setUserContactNo(e.target.value)}
                        />
                        <Button variant="contained" onClick={handleAddNo}>
                          Add
                        </Button>
                      </>
                    )}{" "}
                  </Stack>
                </Box>

                <Box mb={{ xs: 2, md: 8 }}>
                  <Typography variant="h6" mt={2} mb={2}>
                    Shipping Address
                  </Typography>
                  <Stack direction={"row"} spacing={2} mb={2}>
                    <TextField
                      id="outlined-basic"
                      label="fullname"
                      variant="outlined"
                      {...getFieldProps("fullname")}
                      disabled={razorPayClosed}
                      error={Boolean(touched.fullname && errors.fullname)}
                      helperText={touched.fullname && errors.fullname}
                      fullWidth
                    />
                    <TextField
                      id="outlined-basic"
                      label="email"
                      variant="outlined"
                      disabled={razorPayClosed}
                      {...getFieldProps("email")}
                      helperText={"Email is optional"}
                      fullWidth
                    />
                  </Stack>
                  <Stack direction={"row"} spacing={2} mb={2}>
                    <TextField
                      id="outlined-basic"
                      label="phone number"
                      variant="outlined"
                      disabled={razorPayClosed}
                      {...getFieldProps("contactNumber")}
                      error={Boolean(touched.contactNumber && errors.contactNumber)}
                      helperText={touched.contactNumber && errors.contactNumber}
                      fullWidth
                    />
                    <TextField
                      id="outlined-basic"
                      label="country"
                      variant="outlined"
                      disabled={razorPayClosed}
                      {...getFieldProps("country")}
                      error={Boolean(touched.country && errors.country)}
                      helperText={touched.country && errors.country}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Stack>
                  <Stack direction={"row"} spacing={2} mb={2}>
                    <TextField
                      id="outlined-basic"
                      label="City"
                      variant="outlined"
                      fullWidth
                      disabled={razorPayClosed}
                      {...getFieldProps("city")}
                      error={Boolean(touched.city && errors.city)}
                      helperText={touched.city && errors.city}
                    />
                    <TextField
                      id="outlined-basic"
                      label="post code"
                      variant="outlined"
                      fullWidth
                      disabled={razorPayClosed}
                      {...getFieldProps("postCode")}
                      error={Boolean(touched.postCode && errors.postCode)}
                      helperText={touched.postCode && errors.postCode}
                    />
                  </Stack>
                  <Stack spacing={2} mb={2}>
                    <TextField
                      id="outlined-basic"
                      label="Address"
                      variant="outlined"
                      multiline
                      fullWidth
                      disabled={razorPayClosed}
                      {...getFieldProps("address")}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Landmark"
                      variant="outlined"
                      multiline
                      fullWidth
                      disabled={razorPayClosed}
                      {...getFieldProps("landmark")}
                      error={Boolean(touched.landmark && errors.landmark)}
                      helperText={touched.landmark && errors.landmark}
                    />
                  </Stack>
                </Box>
              </Paper>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: "#FFF0ED",
                  marginBottom: "10px",
                  padding: "20px",
                }}
              >
                <Box>
                  {cartItems?.map((item, index) => {
                    return (
                      <Stack direction={"row"} spacing={2}>
                        <Box>
                          <img src={item.image} style={{ width: "50px", height: "70px" }} />
                        </Box>
                        <Stack direction={"column"}>
                          <Typography variant="body1">{item.shortName}</Typography>

                          <Typography variant="caption">{item.size}</Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: { xs: "14px", md: "14px " },
                            }}
                            gutterBottom
                          >
                            &#8377;
                            {item.sellingPrice} x {item.quantity}
                          </Typography>
                        </Stack>
                      </Stack>
                    );
                  })}
                </Box>
                <Divider />
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "18px", md: "18px " },
                    fontWeight: "bold",
                    marginTop: "5px",
                  }}
                >
                  PRICE DETAILS
                </Typography>
                <Stack direction={"row"} justifyContent="space-between" p={0.5}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: "16px", md: "16px " },
                    }}
                  >
                    Total MRP
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: { xs: "16px", md: "16px " },
                    }}
                  >
                    &#8377;
                    {cartInfo?.maxPrice}
                  </Typography>
                </Stack>
                <Stack direction={"row"} justifyContent="space-between" p={0.5}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: "16px", md: "16px " },
                    }}
                  >
                    Discount on MRP
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: { xs: "16px", md: "16px " },
                    }}
                  >
                    &#8377;
                    {cartInfo?.discount}
                  </Typography>
                </Stack>
                <Stack direction={"row"} justifyContent="space-between" p={0.5}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: "16px", md: "16px " },
                    }}
                  >
                    Convenience Fee
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: "16px", md: "16px " },
                    }}
                  >
                    {cartInfo.deliveryCharge === 0 ? "Free" : <>&#8377;{cartInfo.deliveryCharge}</>}
                  </Typography>
                </Stack>
                <Divider />
                <Stack direction={"row"} justifyContent="space-between" p={0.5}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: "16px", md: "16px " },
                    }}
                  >
                    Total Amount
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: { xs: "16px", md: "16px " },
                      fontWeight: "bold",
                    }}
                  >
                    &#8377;
                    {cartInfo?.grandTotal}
                  </Typography>
                </Stack>
                <Divider />
                <Stack direction={"row"} justifyContent="space-between" p={0.5}>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="payment"
                      name="row-radio-buttons-group"
                      value={values.paymentType}
                      onChange={(e) => formik.setFieldValue("paymentType", e.target.value)}
                    >
                      {Object.entries(paymentSettings).map(([key, value]) => (
                        <FormControlLabel
                          key={key}
                          value={key}
                          control={<Radio />}
                          label={value.name}
                          disabled={!value.isEnabled}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Stack>
                <Box pt={2}>
                  <LoadingButton
                    fullWidth 
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    disabled={!isPaymentEnabled}
                    sx={{ width: "100%", backgroundColor: "#EEA7A7" }}
                  >
                    PLACE ORDER
                  </LoadingButton>
                </Box>
              </Paper>
            </Box>
          </Stack>
        </Form>
      </FormikProvider>
    </Container>
  );
};

export default CheckAddress;
