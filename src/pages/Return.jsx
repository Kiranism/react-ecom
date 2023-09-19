import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  Divider,
  Card,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Checkbox,
  Container,
  Link,
  Breadcrumbs,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider, Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import { ArrowBackIosNewSharp } from "@mui/icons-material";

const Return = () => {
  const [orderInfo, setOrderInfo] = useState();
  const [products, setProducts] = useState();
  const [qty, setQty] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getReturnElibileProducts();
  }, []);

  const getReturnElibileProducts = () => {
    axios
      .get(`${process.env.REACT_APP_API}/order/user/return`, {
        params: { orderId: id },
      })
      .then((res) => {
        if (!res.data.isError) {
          console.log("orderEligPro", res.data);
          const eligiblePro = res.data.data.eligibleProducts.map((pro, i) => {
            return { ...pro, requestedQuantity: 1, isChecked: false };
          });
          setProducts(eligiblePro);
          setOrderInfo(res.data.data);
          //   setOrderedProducts(res.data.data.records);
        }
      })
      .catch((res) => {
        console.log(res);
        navigate("/orders");
      });
  };

  const handleCheckboxChange = (index) => {
    let temp = products;
    temp[index].isChecked = !temp[index].isChecked;
    setProducts([...temp]);
  };

  const handleQuantityChange = (e, index) => {
    let temp = products;
    temp[index].requestedQuantity = e.target.value;
    setProducts([...temp]);
  };
  const quantityFn = (num) => {
    console.log("num", num);
    let arr = [];
    for (let i = 1; i <= num; i++) {
      arr.push(i);
    }
    return arr;
  };

  const handleSubmit = async () => {
    let selectedProducts = [];
    const checkedPro = products.map((pro) => {
      let products = {};
      if (pro.isChecked) {
        products.productId = pro.productId;
        products.requestedQuantity = pro.requestedQuantity;
        products.variantId = pro.variantId;
        return selectedProducts.push(products);
      }
    });
    console.log("selectedProducts", selectedProducts);
    if (selectedProducts.length) {
      setIsSubmitting(true);
      try {
        await axios
          .post(`${process.env.REACT_APP_API}/order/user/return`, {
            orderId: orderInfo.orderId,
            products: selectedProducts,
          })
          .then((res) => {
            if (!res.data.isError) {
              console.log(res);
              setIsSubmitting(false);
              toast.success("Return Order Created Successfully");
              navigate("/orders");
            }
          })
          .catch((err) => {
            console.log(err);
            setIsSubmitting(false);
          });
      } catch (error) {
        console.log(error);
        setIsSubmitting(false);
      }
    } else {
      toast.warning("Select atleast one product");
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ minHeight: "65vh" }}>
    <div>
      <Box
        style={{
          backgroundColor: "#FFE6E1",
          paddingBottom: "10px",
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              to="/"
              component={RouterLink}
              sx={{ cursor: "pointer", fontSize: { xs: "14px" } }}
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              to="/orders"
              component={RouterLink}
              sx={{ cursor: "pointer", fontSize: { xs: "14px" } }}
            >
              Orders
            </Link>

            <Link
              color="primary"
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                fontSize: { xs: "14px" },
              }}
              aria-current="page"
            >
              Return
            </Link>
          </Breadcrumbs>
        </div>
      </Box>
    </div>
      <Box pt={2}>
        <Typography variant="h5">Register your return</Typography>
        <Link component={RouterLink} to="/refundpolicy">
          <Typography variant="body1">
            Here are full details on return and replacement.
          </Typography>
        </Link>
      </Box>
      {products?.length ? (
        <Stack
          direction={{ xs: "column", md: "row" }}
          pt={{ xs: 1, md: 5 }}
          gap={2}
        >
          {/* Address  */}
          <Box sx={{ flex: 2 }}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: "#FFF0ED",
                marginBottom: "10px",
                padding: { xs: "0px", md: "20px" },
              }}
            >
              {/* products to be replaced  */}
              {products?.map((pro, index) => (
                <Stack
                  direction={{ xs: "row", md: "row" }}
                  alignItems="center"
                  position={"relative"}
                >
                  <Stack
                    direction={{ xs: "row", md: "row" }}
                    alignItems="center"
                    flex="2"
                  >
                    <Box
                      sx={{
                        padding: "12px",
                        positon: "relative",
                      }}
                    >
                      <Card
                        sx={{
                          minWidth: { xs: 70, sm: 180, md: 150 },
                          maxWidth: { xs: 70, sm: 180, md: 150 },
                          margin: "0 auto",
                          backgroundColor: "#FFF0ED",
                          cursor: "pointer",
                        }}
                        //   onClick={() =>
                        //     navigate(
                        //       `/products/view?product=${cartProduct.productId}&variant=${cartProduct.variantId}`
                        //     )
                        //   }
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            maxHeight: { xs: 100, sm: 200, md: 200 },
                            minHeight: { xs: 100, sm: 200, md: 200 },
                          }}
                          image={pro.image}
                          alt="green iguana"
                        />
                      </Card>
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        textAlign={"initial"}
                        sx={{
                          fontSize: { xs: "12px", md: "18px " },
                          fontWeight: "bold",
                        }}
                      >
                        {pro.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        textAlign={"initial"}
                        sx={{
                          fontSize: { xs: "12px", md: "16px " },
                        }}
                      >
                        {/* {pro.brandName} */}
                      </Typography>
                      <Typography
                        variant="body2"
                        textAlign={"initial"}
                        sx={{
                          fontSize: { xs: "12px", md: "16px " },
                        }}
                      >
                        size: {pro.size}
                      </Typography>
                      <Stack direction="row" spacing={"20px"}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: { xs: "12px", md: "16px " },
                          }}
                        >
                          Rs. {pro.sellingPrice}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: { xs: "12px", md: "16px " },
                            textDecoration: "line-through",
                          }}
                        >
                          Rs. {pro.price}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>

                  <Box
                    sx={{
                      flex: "1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl>
                      <InputLabel id="demo-simple-select-label">Qty</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={qty}
                        defaultValue={pro.requestedQuantity}
                        label="Qty"
                        onChange={(e) => handleQuantityChange(e, index)}
                        disabled={pro.quantity === 1}
                      >
                        {/* <MenuItem value="1">1</MenuItem> */}
                        {quantityFn(pro?.quantity)?.map((item, index) => {
                          return <MenuItem value={item}>{item}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      right: "0px",
                      top: "0px",
                    }}
                  >
                    <Checkbox
                      // checked={checkedState[index]}
                      onChange={() => handleCheckboxChange(index)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </Box>
                </Stack>
              ))}
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
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "18px", md: "18px " },
                  fontWeight: "bold",
                  marginTop: "5px",
                }}
              >
                RETURN INFORMATIONS
              </Typography>
              <Stack
                direction={"row"}
                p={0.5}
                gap={2}
                justifyContent="space-between"
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "16px", md: "16px " },
                    flex: 1,
                  }}
                >
                  Name
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "16px", md: "16px " },
                    flex: 1,
                  }}
                >
                  {orderInfo?.billingAddress.fullname}
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                p={0.5}
                gap={2}
                justifyContent="space-between"
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "16px", md: "16px " },
                    flex: 1,
                  }}
                >
                  Order number
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "14px",
                    flex: 1,
                  }}
                >
                  {orderInfo?.invoiceNumber}
                </Typography>
              </Stack>

              <Divider />

              <Box pt={2}>
                <LoadingButton
                  fullWidth
                  size="large"
                  variant="contained"
                  loading={isSubmitting}
                  onClick={handleSubmit}
                  sx={{ width: "100%", backgroundColor: "#EEA7A7" }}
                >
                  PROCEED
                </LoadingButton>
                {/* <RazorPayPopup orderInfo={orderInfo} /> */}
              </Box>
            </Paper>
          </Box>
        </Stack>
      ) : (
        <Typography variant="h6" textAlign={"center"}>
          No Products Available For Return.
        </Typography>
      )}
    </Container>
  );
};

export default Return;
