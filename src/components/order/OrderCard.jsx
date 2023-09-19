import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Pagination,
  Paper,
  Divider,
  Stack,
  Typography,
  CardMedia,
  Card,
  Chip,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { ArrowRight } from "@mui/icons-material";
import Moment from "moment";
import { Icon } from "@iconify/react";
import Iconify from "../Iconify";
import titleCase from "../../helper/TitleCase";
import useUserStore from "../../app/userStore";
import NotLogin from "../NotLogin";
const OrderCard = () => {
  const [orderedProducts, setOrderedProducts] = useState();
  const { isAuth } = useUserStore();
  const [pagination, setPagination] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const pageSize = 5;
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      getAllOrders(pagination);
    }
  }, [pagination]);

  const getAllOrders = (pagination) => {
    setOrderedProducts([]);
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API}/order/user/all`, {
        params: { size: pageSize, page: pagination },
      })
      .then((res) => {
        if (!res.data.isError) {
          console.log("orderPro", res.data);
          setOrderedProducts(res.data.data.records);
          setOrderCount(res.data.data.maxRecords || 0);
          setLoading(false);
        }
      })
      .catch((res) => {
        console.log(res);
        setLoading(false);
      });
  };

  const handlePagination = (e, page) => {
    // console.log(e.textContent);
    setPage(page);
    setPagination(page - 1);
    window.scroll({ behavior: "smooth" });
    window.scrollTo(0, 0);
    // console.log(page);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {orderedProducts ? (
            <Container
              maxWidth="md"
              sx={{ marginTop: "10px", minHeight: "100vh" }}
            >
              {orderedProducts?.map((ordered, index) => {
                return (
                  <Paper
                    elevation={3}
                    sx={{ backgroundColor: "#FFF0ED", marginBottom: "12px" }}
                  >
                    <Stack
                      p={2}
                      direction={{ xs: "column", md: "row" }}
                      justifyContent={"space-between"}
                    >
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={{ xs: 3, md: 6 }}
                      >
                        <Box
                          sx={{
                            display: { xs: "flex", md: "block" },
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            variant="body2"
                            fontWeight="bold"
                            sx={{ flex: 1 }}
                          >
                            Order
                            {ordered?.isReplacement && (
                              <Chip
                                label={"Replacement"}
                                color="primary"
                                variant="outlined"
                                size="small"
                                sx={{ margin: "5px" }}
                              />
                            )}
                          </Typography>
                          <Typography variant="body2" sx={{ flex: 1 }}>
                            {ordered?.invoiceNumber}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: { xs: "flex", md: "block" },
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" fontWeight="bold">
                            Date Placed
                          </Typography>
                          <Typography variant="body2">
                            {ordered?.date}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: { xs: "flex", md: "block" },
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" fontWeight="bold">
                            Total Price
                          </Typography>
                          <Typography
                            variant="body2"
                            fontWeight="bold"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <CurrencyRupeeIcon fontSize="inherit" />
                            {ordered?.grandTotal}
                          </Typography>
                        </Box>
                      </Stack>
                      <Box
                        sx={{
                          display: { xs: "flex", md: "block" },
                          marginTop: { xs: "0", md: "5px" },
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          onClick={() => navigate(`/order/${ordered._id}`)}
                          variant="contained"
                          size="small"
                        >
                          View Invoice
                        </Button>
                      </Box>
                    </Stack>
                    <Divider />
                    <Box>
                      {ordered.products.map((pro, i) => {
                        return (
                          <>
                            <Stack
                              direction={{ xs: "column", md: "row" }}
                              alignItems="flex-start"
                              p={2}
                            >
                              <Box
                                sx={{
                                  flex: "2",
                                  positon: "relative",
                                  display: "flex",
                                }}
                              >
                                <Card
                                  sx={{
                                    maxWidth: { xs: 80, sm: 100, md: 100 },
                                    minWidth: { xs: 80, sm: 100, md: 100 },
                                    maxHeight: { xs: 100, sm: 100, md: 140 },
                                    margin: "0 auto",
                                    backgroundColor: "#FFF0ED",
                                  }}
                                >
                                  <CardMedia
                                    onClick={() =>
                                      navigate(
                                        `/products/view?product=${pro.productId}&variant=${pro.variantId}`
                                      )
                                    }
                                    component="img"
                                    sx={{
                                      maxHeight: { xs: 100, sm: 100, md: 140 },
                                      minHeight: { xs: 100, sm: 100, md: 140 },
                                      cursor: "pointer",
                                    }}
                                    image={pro.image}
                                  />
                                </Card>

                                <Stack sx={{ flex: "2" }} ml={2}>
                                  <Typography
                                    variant="h6"
                                    gutterBottom
                                    fontSize={16}
                                  >
                                    {pro.shortName
                                      ? pro.shortName
                                      : pro.name + " (" + pro.size + ") "}
                                  </Typography>
                                  <Typography variant="body1">
                                    Payment {titleCase(ordered?.paymentStatus)}
                                  </Typography>

                                  {ordered?.deliveryStatus !== "NA" &&
                                    ordered?.deliveryStatus === "PENDING" && (
                                      <Typography variant="body1">
                                        Shipping{" "}
                                        {titleCase(ordered?.deliveryStatus)}
                                      </Typography>
                                    )}
                                  {ordered?.deliveryStatus !== "NA" &&
                                    ordered?.deliveryStatus ===
                                      "PACKAGE IN PROGRESS" && (
                                      <Typography variant="body1">
                                        {titleCase(ordered?.deliveryStatus)}
                                      </Typography>
                                    )}
                                  {ordered?.deliveryStatus !== "NA" &&
                                    ordered?.deliveryStatus !==
                                      "PACKAGE IN PROGRESS" &&
                                    ordered?.deliveryStatus !== "PENDING" &&
                                    (ordered?.deliveryStatus === "DELIVERED" ? (
                                      <Typography variant="body1">
                                        Item{" "}
                                        {titleCase(ordered?.deliveryStatus)}{" "}
                                        {Moment(ordered.deliveryDate).format(
                                          "DD-MM-YYYY"
                                        )}
                                      </Typography>
                                    ) : (
                                      <Typography variant="body1">
                                        Item{" "}
                                        {titleCase(ordered?.deliveryStatus)}
                                      </Typography>
                                    ))}

                                  {ordered?.deliveryStatus === "DELIVERED" &&
                                    ordered?.returnStatus && (
                                      <Typography variant="body1">
                                        Return Valid Till{" "}
                                        {Moment(
                                          pro.returnAndReplacementStatus
                                            ?.returnPeriod
                                        ).format("DD-MM-YYYY")}
                                      </Typography>
                                    )}
                                  {ordered?.deliveryStatus === "DELIVERED" &&
                                    ordered.replacementStatus && (
                                      <Typography variant="body1">
                                        Replacement Valid Till{" "}
                                        {Moment(
                                          pro.returnAndReplacementStatus
                                            .replacementPeriod
                                        ).format("DD-MM-YYYY")}
                                      </Typography>
                                    )}
                                </Stack>
                              </Box>
                            </Stack>
                            <Divider />
                          </>
                        );
                      })}
                    </Box>
                    {/* //TODO: order status and summary section  */}
                    {ordered?.deliveryStatus === "DELIVERED" &&
                      (ordered.returnStatus || ordered.replacementStatus) && (
                        <Stack
                          p={2}
                          direction="row"
                          alignItems={"center"}
                          justifyContent=""
                        >
                          <>
                            {" "}
                            {/* <Box
                            flex="1"
                            display="flex"
                            justifyContent={"flex-start"}
                          >
                            <Typography variant="button">
                              Return policy valid
                            </Typography>
                          </Box> */}
                            <Box
                              flex="1"
                              display="flex"
                              justifyContent={"flex-end"}
                            >
                              {ordered.replacementStatus && (
                                <Button
                                  variant="text"
                                  endIcon={
                                    <Iconify
                                      icon={"material-symbols:find-replace"}
                                    />
                                  }
                                  onClick={() =>
                                    navigate(`/replacement/${ordered._id}`)
                                  }
                                >
                                  Replacement
                                </Button>
                              )}
                              {ordered.returnStatus && (
                                <Button
                                  variant="text"
                                  endIcon={
                                    <Iconify
                                      icon={
                                        "material-symbols:assignment-return"
                                      }
                                    />
                                  }
                                  onClick={() =>
                                    navigate(`/return/${ordered._id}`)
                                  }
                                >
                                  Return
                                </Button>
                              )}
                            </Box>
                          </>
                        </Stack>
                      )}
                    {/* courierid showing secton  */}
                    {ordered?.deliveryStatus !== "DELIVERED" &&
                      ordered.courierId && (
                        <Stack
                          p={2}
                          direction="row"
                          alignItems={"center"}
                          justifyContent=""
                        >
                          <Box
                            flex="1"
                            display="flex"
                            justifyContent={"flex-start"}
                          >
                            {" "}
                            <Typography variant="button">
                              Tracking Number {ordered.courierId}
                            </Typography>
                          </Box>
                          <Box
                            flex="1"
                            display="flex"
                            justifyContent={"flex-end"}
                          >
                            <Button
                              variant="text"
                              endIcon={<ArrowRight />}
                              onClick={() =>
                                window.open(
                                  `${process.env.REACT_APP_ORDER_TRACKING_URL}/${ordered.courierId}`
                                )
                              }
                            >
                              Track Now
                            </Button>
                          </Box>
                        </Stack>
                      )}
                  </Paper>
                );
              })}

              <Stack justifyContent={"center"} alignItems="center" padding={5}>
                <Pagination
                  onChange={handlePagination}
                  count={Math.ceil(orderCount / pageSize)}
                  shape="rounded"
                  siblingCount={0}
                  boundaryCount={1}
                  page={page}
                />
              </Stack>
            </Container>
          ) : (
            <NotLogin title={"Login to view your orders"} />
          )}
        </>
      )}
    </>
  );
};

export default OrderCard;
