import {
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import QuantitySelector from "./QuantitySelector";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Container } from "@mui/system";
import Loader from "../Loader";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../helper/LocalStorage";
import useCartStore from "../../app/cartStore";
import useUserStore from "../../app/userStore";

const CardProductCard = () => {
  const {
    cartItems,
    cartInfo,
    getCart,
    removeFromCart,
    addToCartWithQuantity,
    getLocalCart,
    setLocalCartProducts,
    setLocalCartInfo,
    removeFromLocalCart,
    quantityUpdateOfLocalCart,
  } = useCartStore();
  const { isAuth } = useUserStore();
  const [cartProducts, setCartProducts] = useState([]);
  const [qty, setQty] = useState();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleChange = (event, productId, variantId, cartQuantity) => {
    setQty(event.target.value);
    if (isAuth) {
      addToCartWithQuantity(event.target.value, productId, variantId);
      // handleAddToCart(event.target.value, productId, variantId);
    } else {
      handleQuantityToLocalCart(
        event.target.value,
        productId,
        variantId,
        cartQuantity
      );
    }
  };

  const handleQuantityToLocalCart = (
    value,
    variantId,
    productId,
    cartQuantity
  ) => {
    quantityUpdateOfLocalCart(value, productId, variantId);
  };
  useEffect(() => {
    // getCartProducts()
    if (isAuth) {
      getCart();
    } else {
      getLocalCart();
    }
  }, []);

  const getCartProducts = () => {
    axios
      .get(`${process.env.REACT_APP_API}/cart`)
      .then((res) => {
        if (!res.data.isError) {
          console.log("cartPro", res.data.data.products);
          setCartProducts(res.data.data.products);
          // setCartInfo(res.data.data);
          setLoader(false);
        }
      })
      .catch((res) => {
        console.log(res);
        setLoader(false);
      });
  };

  // const handleAddToCart = (value, variantId, productId) => {
  //   console.log("pvv", productId, variantId, value);
  //   // setLoader(true);
  //   try {
  //     axios
  //       .post(`${process.env.REACT_APP_API}/cart`, {
  //         productId: productId,
  //         variantId: variantId,
  //         quantity: value,
  //       })
  //       .then((res) => {
  //         if (!res.data.isError) {
  //           console.log(res);
  //           toast.success("Quantity updated");
  //           setLoader(false);
  //           window.dispatchEvent(new CustomEvent("addToCart"));
  //           window.location.reload();
  //         }
  //       })
  //       .catch((res) => {
  //         toast.error("Something Went Wrong");
  //       });
  //   } catch (error) {
  //     toast.error("Something Went Wrong");
  //     setLoader(false);
  //   }
  // };

  const handleRemove = (variantId, productId) => {
    if (isAuth) {
      removeFromCart(variantId, productId);
    } else {
      // if offline
      removeFromLocalCart(productId, variantId);
    }
  };

  const handlePlaceOrder = () => {
    if (isAuth) {
      navigate("/checkout");
    } else {
      navigate("/login", { state: location.pathname });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: "70vh" }}>
      {loader ? (
        <Loader />
      ) : (
        <>
          {cartItems?.length !== 0 ? (
            <Stack
              direction={{ xs: "column", md: "row" }}
              // p={{ xs: 2, md: 18 }}
              pt={{ xs: 2, md: 5 }}
              gap={2}
            >
              {/* cart product listing  */}
              <Box sx={{ flex: 3 }}>
                {/* product card  */}
                {cartItems?.map((cartProduct, index) => {
                  console.log("cartProducts ==>", cartProduct)
                  return (
                    <Paper
                      elevation={3}
                      sx={{ backgroundColor: "#FFF0ED", marginBottom: "12px" }}
                      key={index}
                    >
                      <Stack
                        direction={{ xs: "row", md: "row" }}
                        alignItems="center"
                        position={"relative"}
                      >
                        <Stack
                          direction={{ xs: "row", md: "row" }}
                          alignItems="center"
                          sx={{ flex: "4" }}
                        >
                          <Box
                            sx={{
                              flex: "2",
                              padding: "12px",
                              positon: "relative",
                            }}
                          >
                            <Card
                              sx={{
                                minWidth: { xs: 60, sm: 200, md: 200 },
                                maxWidth: { xs: 60, sm: 200, md: 200 },
                                margin: "0 auto",
                                backgroundColor: "#FFF0ED",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                navigate(
                                  `/products/view?product=${cartProduct.productId}&variant=${cartProduct.variantId}`
                                )
                              }
                            >
                              <CardMedia
                                component="img"
                                sx={{
                                  maxHeight: { xs: 100, sm: 220, md: 220 },
                                  minHeight: { xs: 100, sm: 220, md: 220 },
                                }}
                                image={cartProduct.image}
                                alt="green iguana"
                              />
                            </Card>
                          </Box>
                          <Box sx={{ flex: "3" }}>
                            <Typography
                              variant="h6"
                              textAlign={"initial"}
                              sx={{
                                fontSize: { xs: "12px", md: "18px " },
                                fontWeight: "bold",
                              }}
                            >
                              {cartProduct.shortName}
                            </Typography>
                            <Typography
                              variant="body2"
                              textAlign={"initial"}
                              sx={{
                                fontSize: { xs: "12px", md: "16px " },
                              }}
                            >
                              {cartProduct.brandName}
                            </Typography>
                            <Typography
                              variant="body2"
                              textAlign={"initial"}
                              sx={{
                                fontSize: { xs: "12px", md: "16px " },
                              }}
                            >
                              size: {cartProduct.size}
                            </Typography>
                          </Box>
                        </Stack>

                        <Box
                          sx={{
                            flex: "1.5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FormControl>
                            <InputLabel id="demo-simple-select-label">
                              Qty
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={cartProduct.quantity}
                              label="Qty"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  cartProduct.variantId,
                                  cartProduct.productId,
                                  cartProduct.quantity
                                )
                              }
                            >
                              {[1, 2, 3, 4, 5]
                                .slice(0, cartProduct?.stock)
                                .map((item, index) => {
                                  return (
                                    <MenuItem value={item}>{item}</MenuItem>
                                  );
                                })}
                            </Select>
                          </FormControl>
                          {/* <QuantitySelector
                  productId={cartProduct.productId}
                  variantId={cartProduct.variantId}
                  quantity={cartProduct.quantity}
                /> */}
                        </Box>
                        <Box sx={{ flex: "1.5" }}>
                          <Typography
                            variant="body1"
                            textAlign={"center"}
                            sx={{
                              fontSize: { xs: "12px", md: "16px " },
                            }}
                          >
                            Rs.{cartProduct.sellingPrice * cartProduct.quantity}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: "1.5",
                            textDecoration: "line-through",
                          }}
                        >
                          <Typography
                            variant="body1"
                            textAlign={"center"}
                            sx={{
                              fontSize: { xs: "12px", md: "16px " },
                            }}
                          >
                            Rs. {cartProduct.price * cartProduct.quantity}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            position: "absolute",
                            right: "5px",
                            top: "5px",
                          }}
                        >
                          <Button
                            variant="outlined"
                            endIcon={
                              <DeleteOutlineOutlinedIcon
                                sx={{ color: "#EEA7A7" }}
                              />
                            }
                            sx={{
                              color: "#EEA7A7",
                              fontSize: { xs: "12px", md: "16px " },
                              fontWeight: "bold",
                              display: { xs: "none", sm: "flex", md: "flex" },
                            }}
                            onClick={() =>
                              handleRemove(
                                cartProduct.variantId,
                                cartProduct.productId
                              )
                            }
                          >
                            Remove
                          </Button>

                          <IconButton
                            onClick={() =>
                              handleRemove(
                                cartProduct.variantId,
                                cartProduct.productId
                              )
                            }
                            sx={{
                              display: { xs: "flex", sm: "none", md: "none" },
                            }}
                          >
                            <DeleteOutlineOutlinedIcon
                              sx={{ color: "#EEA7A7" }}
                            />
                          </IconButton>
                        </Box>
                      </Stack>
                    </Paper>
                  );
                })}

                {/* end product card  */}
              </Box>
              {/* cart price details  */}
              <Box sx={{ flex: 1 }}>
                <Paper
                  elevation={3}
                  sx={{
                    backgroundColor: "#FFF0ED",
                    marginBottom: "12px",
                    padding: "20px",
                    minHeight: "300px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: "18px", md: "20px " },
                      fontWeight: "Bold",
                    }}
                  >
                    PRICE DETAILS
                  </Typography>
                  <Stack
                    direction={"row"}
                    justifyContent="space-between"
                    p={0.5}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: "16px", md: "18px " },
                      }}
                    >
                      Total MRP
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: { xs: "16px", md: "18px " },
                      }}
                    >
                      &#8377;
                      {cartInfo?.maxPrice}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    justifyContent="space-between"
                    p={0.5}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: "16px", md: "18px " },
                      }}
                    >
                      Discount on MRP
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: { xs: "16px", md: "18px " },
                      }}
                    >
                      &#8377;
                      {cartInfo?.discount}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    justifyContent="space-between"
                    p={0.5}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: "16px", md: "18px " },
                      }}
                    >
                      Convenience Fee
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: "16px", md: "18px " },
                      }}
                    >
                      {cartInfo.deliveryCharge === 0 ? (
                        "Free"
                      ) : (
                        <>&#8377;{cartInfo.deliveryCharge}</>
                      )}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack
                    direction={"row"}
                    justifyContent="space-between"
                    p={0.5}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: "16px", md: "20px " },
                      }}
                    >
                      Total Amount
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: { xs: "16px", md: "20px " },
                      }}
                    >
                      &#8377;
                      {cartInfo?.grandTotal}
                    </Typography>
                  </Stack>
                  <Box pt={2}>
                    <Button
                      variant="contained"
                      sx={{ width: "100%", backgroundColor: "#EEA7A7" }}
                      onClick={handlePlaceOrder}
                    >
                      PLACE ORDER
                    </Button>
                  </Box>
                </Paper>
              </Box>
            </Stack>
          ) : (
            <Container>
              <Stack
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "70vh",
                }}
              >
                <Typography>Cart is empty</Typography>
                {/* <Button>Add Products</Button>  */}
              </Stack>
            </Container>
          )}
        </>
      )}
    </Container>
  );
};

export default CardProductCard;
