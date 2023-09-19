import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Logo from "../../assets/images/capricorn.png";
const OrderReplaceView = () => {
  const [products, setProducts] = useState();
  const [orderInfo, setOrderInfo] = useState();

  const navigate = useNavigate();
  const { id } = useParams();
  //   const [searchParams, setSearchParams] = useSearchParams();
  //   const id = searchParams.get("id");
  const componentRef = useRef();
  useEffect(() => {
    getReferenceOrderDetails();
  }, [id, orderInfo?._id]);

  const getReferenceOrderDetails = () => {
    axios
      .get(`${process.env.REACT_APP_API}/order/user/replace-order`, {
        params: { referenceOrder: id },
      })
      .then((res) => {
        if (!res.data.isError) {
          console.log("orderPro", res.data);
          setProducts(res.data.data.order.products);
          setOrderInfo(res.data.data.order);
        }
      })
      .catch((res) => {
        console.log(res);
        navigate("/orders");
      });
  };

  return (
    <div style={{ overflow: "scroll" }}>
      <Box sx={{ display: "flex", margin: "15px" }}>
        <ReactToPrint
          trigger={() => <Button variant="contained">Print this out!</Button>}
          content={() => componentRef.current}
        />
      </Box>

      <Container maxWidth="md" sx={{ width: 992 }}>
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "#fff",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          <div ref={componentRef}>
            <Stack direction={"row"} p={5} sx={{ backgroundColor: "#FFE6E1" }}>
              <Box sx={{ flex: "1" }}>
                <img src={Logo} width="120px" height="120px" />
              </Box>
              <Stack sx={{ flex: "3" }} justifyContent="center">
                <Typography variant="h5" fontWeight={"bold"}>
                  {orderInfo?.invoiceNumber}
                </Typography>
                <Typography variant="button">Invoice Date {orderInfo?.date}</Typography>
                {orderInfo?.isReplacement && (
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ maxWidth: "200px", marginBottom: "5px" }}
                    onClick={() => navigate(`/order/${orderInfo?.referenceOrder}`)}
                  >
                    Original Order
                  </Button>
                )}
                {orderInfo?.replacementEnabled && (
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ maxWidth: "200px" }}
                    onClick={() => navigate(`/order-replace/${orderInfo._id}`)}
                  >
                    Replacement Order
                  </Button>
                )}
              </Stack>
            </Stack>
            <Stack direction={"row"} p={5} pb={2} spacing={4}>
              <Box sx={{ flex: "1" }}>
                <Typography variant="h6" mb={2} fontWeight="bold">
                  OFFICE ADDRESS
                </Typography>
                <Typography variant="body1">
                  Indoseas Crest
                  <br />
                  Flat No. 1A, Near Kavu Bus stop,
                  <br /> Chevayur, Kozhikode,
                  <br />
                  Kerala-673017,
                  <br />
                  Phone: +91 7592020805, <br />
                  Email: capricorn28official@gmail.com
                </Typography>
              </Box>
              <Box sx={{ flex: "1" }}>
                <Typography variant="h6" mb={2} fontWeight="bold">
                  SHIP TO
                </Typography>
                <Typography variant="body1">
                  {orderInfo?.shippingAddress.fullname}
                  <br />
                  {orderInfo?.shippingAddress.city}
                  <br />
                  {orderInfo?.shippingAddress.address}
                  <br />
                  {orderInfo?.shippingAddress.country}
                  <br />
                  {orderInfo?.shippingAddress.contactNumber}
                  <br />
                  {orderInfo?.shippingAddress.postCode}
                </Typography>
              </Box>
            </Stack>
            <Divider />
            <Stack p={5}>
              <TableContainer component={Paper} sx={{ marginBottom: "50px" }}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">SN</TableCell>
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="center">Size</TableCell>
                      <TableCell align="center">Unit Price</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products?.map((row, i) => (
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{i + 1}</TableCell>
                        <TableCell align="left">
                          {row.name}({row.skuId})
                        </TableCell>
                        <TableCell align="center">{row.size}</TableCell>
                        <TableCell align="center">&#8377;{row.sellingPrice}</TableCell>
                        <TableCell align="center">{row.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>

            <Divider />
            <Stack direction={"row"} p={5} spacing={4}>
              <Box sx={{ flex: "1" }}>
                <Stack direction="row" justifyContent={"space-between"}>
                  <Typography variant="h7">Payment Status</Typography>
                  <Typography variant="h7">{orderInfo?.paymentStatus}</Typography>
                </Stack>
                {orderInfo?.deliveryStatus !== "NA" && (
                  <Stack direction="row" justifyContent={"space-between"}>
                    <Typography variant="h7">Delivery Status</Typography>
                    <Typography variant="h7">{orderInfo?.deliveryStatus}</Typography>
                  </Stack>
                )}
              </Box>
              <Box sx={{ flex: "1" }}>
                <Stack direction="row" justifyContent={"space-between"}>
                  <Typography variant="h7">Subtotal</Typography>
                  <Typography variant="h7">&#8377;{orderInfo?.subTotal}</Typography>
                </Stack>

                <Stack direction="row" justifyContent={"space-between"}>
                  <Typography variant="h7">Delivery Charge</Typography>
                  <Typography variant="h7">{orderInfo?.deliveryCharge}</Typography>
                </Stack>
                <Stack direction="row" justifyContent={"space-between"}>
                  <Typography variant="h6" fontWeight={"bold"}>
                    Total
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={"bold"}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: { xs: "16px", md: "16px " },
                    }}
                  >
                    &#8377;
                    {orderInfo?.grandTotal}
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            {/* return table  */}

            {orderInfo?.returnedProducts.length ? (
              <Grid container mt={2}>
                <Grid
                  item
                  direction="row"
                  xs={12}
                  padding={1}
                  style={{ backgroundColor: "#fff0ed", width: "100%" }}
                >
                  <Typography variant="h6" marginLeft="30px">
                    Return
                  </Typography>
                </Grid>
                <Stack p={5}>
                  {" "}
                  <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{ marginBottom: "50px" }}>
                      <Table style={{ minWidth: "00px" }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>SN</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>SKU ID</TableCell>
                            <TableCell>Unit Price</TableCell>
                            <TableCell>Requested Quantity</TableCell>
                            <TableCell>Accepted Quantity</TableCell>
                            <TableCell>Rejected Quantity</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orderInfo?.returnedProducts?.map((item, key) => (
                            <TableRow key={key}>
                              <TableCell sx={{ width: "80px" }}>{key + 1}</TableCell>
                              <TableCell sx={{ width: "470px" }}>{item.name}</TableCell>
                              <TableCell sx={{ width: "110px" }}>{item.skuId}</TableCell>
                              <TableCell sx={{ width: "80px" }}>{item.sellingPrice}</TableCell>
                              <TableCell sx={{ width: "80px" }}>{item.requestedQuantity}</TableCell>
                              <TableCell sx={{ width: "80px" }}>{item.acceptedQuantity}</TableCell>
                              <TableCell sx={{ width: "80px" }}>{item.rejectedQuantity}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack sx={{ width: "100%" }} direction="row" justifyContent="end" padding={2}>
                      <Stack
                        justifyContent={"space-between"}
                        spacing={2}
                        direction="row"
                        alignItems={"center"}
                      >
                        {orderInfo.refundAmount !== undefined && (
                          <>
                            {" "}
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                              Refund Amount
                            </Typography>
                            <Typography
                              variant="h6"
                              alignItems={"center"}
                              sx={{ fontWeight: "bold" }}
                            >
                              {" "}
                              &#8377;{`${orderInfo.refundAmount}`}
                            </Typography>
                          </>
                        )}
                      </Stack>
                    </Stack>
                  </Grid>
                </Stack>
              </Grid>
            ) : (
              ""
            )}

            {/* return taable ends  */}
            <Stack spacing={1} p={5}>
              <Typography variant="h5">Declaration</Typography>
              <Typography variant="body1" sx={{ textAlign: "justify" }}>
                We declare that this invoice shows actual price of goods/packs described. All
                goods/packs are being purchased for internal/personal use, not for re-sale
              </Typography>
            </Stack>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default OrderReplaceView;
