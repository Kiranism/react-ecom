import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import {
  Box,
  Breadcrumbs,
  Button,
  CardActionArea,
  CardActions,
  Container,
  Grid,
  IconButton,
  Link,
  Pagination,
  Rating,
  Stack,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useUserStore from "../app/userStore";
import useWishlistStore from "../app/wishlistStore";
import Loader from "../components/Loader";
import NotLogin from "../components/NotLogin";
import Page from "../components/Page";
import useResponsive from "../hooks/useResponsive";

export default function WishListCard() {
  const {
    wishListItems,
    getWishList,
    removeFromWishlist,
    wishListCount,
    isLoading,
  } = useWishlistStore();
  const { isAuth } = useUserStore();
  // const [products, setProducts] = useState();
  const [pagination, setPagination] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      getWishList(pageSize(), pagination);
    }
  }, [pagination]);

  const xlUp = useResponsive("up", "xl");

  const pageSize = () => {
    if (xlUp) {
      return 10;
    } else {
      return 12;
    }
  };
  // const getWishList = (pagination) => {
  //   // setProducts([]);
  //   axios
  //     .get(`${process.env.REACT_APP_API}/wishlist`, {
  //       params: { size: pageSize(), page: pagination },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       setProducts(res.data.data.data);
  //       setProductCount(res.data.data.maxRecord || 0);
  //       setLoading(false);
  //     })
  //     .catch((res) => {
  //       console.log(res);
  //       setLoading(false);
  //     });
  // };
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff3d47",
    },
  });

  const handlePagination = (e, page) => {
    // console.log(e.textContent);
    setPagination(page - 1);
    setPage(page);
    window.scroll({ behavior: "smooth" });
    // console.log(page);
  };

  const handleRemoveWishlist = (productId) => {
    setLoading(true);
    try {
      axios
        .put(`${process.env.REACT_APP_API}/wishlist/remove`, {
          productId: productId,
        })
        .then((res) => {
          if (!res.data.isError) {
            // const temp = pageSize === 0 ? page - 1 : page;
            // setPagination(page);
            // getWishList(page);

            toast.success("Removed From Wishlist");
            // localStorage.removeItem("wishlist");
          } else {
            toast.error("Something Went Wrong");
          }
        })
        .catch((res) => {
          toast.error("Something Went Wrong");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Page title="Wishlist">
      {isLoading ? (
        <Container maxWidth="xl" sx={{ minHeight: "100vh" }}>
          <Loader />
        </Container>
      ) : (
        <>
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
                  sx={{ cursor: "pointer", fontSize: { xs: "14px" } }}
                  onClick={() => navigate("/")}
                >
                  Home
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
                  Wishlist
                </Link>
              </Breadcrumbs>
            </div>
          </Box>
          {isAuth ? (
            <Container maxWidth="xl">
              <Stack
                direction={"row"}
                spacing={2}
                sx={{ textAlign: "initial" }}
                alignItems="center"
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", my: 2 }}>
                  My Wishlist
                </Typography>
                <Typography variant="subtitle1">
                  {wishListCount && `${wishListCount}items`}
                </Typography>
              </Stack>
              <Grid container spacing={2}>
                {wishListItems?.map((product, index) => {
                  return (
                    <Grid item xs={6} sm={4} md={6} lg={4} xl={2.4} key={index}>
                      <Card
                        sx={{
                          maxWidth: { xs: 190, sm: 220, md: 280 },
                          minWidth: { xs: 190, sm: 220, md: 280 },
                          "@media screen and (max-width: 394px)": {
                            minWidth: "170px",
                            maxWidth: "170px",
                          },
                          "@media screen and (max-width: 370px)": {
                            minWidth: "150px",
                            maxWidth: "150px",
                          },
                          // maxWidth: 300,
                          // minWidth: 300,
                          margin: "0 auto",
                          backgroundColor: "#FFF0ED",
                        }}
                      >
                        <CardActionArea>
                          <CardMedia
                            onClick={() =>
                              navigate(
                                `/products/view?product=${product._id}&variant=${product.variant._id}`
                              )
                            }
                            component="img"
                            sx={{
                              maxHeight: { xs: 220, sm: 270, md: 340 },
                              minHeight: { xs: 220, sm: 270, md: 340 },
                              "@media screen and (max-width: 375px)": {
                                minHeight: "200px",
                                maxHeight: "200px",
                              },
                            }}
                            image={product.image}
                            alt="product images"
                          />
                          <Box
                            style={{
                              position: "absolute",
                              right: "0",
                              top: "0",
                            }}
                          >
                            <IconButton
                              onClick={() => removeFromWishlist(product._id)}
                            >
                              <HighlightOffRoundedIcon fontSize="inherit" />
                            </IconButton>
                          </Box>

                          <CardContent
                            sx={{
                              padding: {
                                xs: "8px 8px 0px 8px",
                                md: "16px 16px 0px 16px",
                              },
                            }}
                          >
                            <Typography
                              // gutterBottom
                              variant="h6"
                              component="div"
                              sx={{ fontSize: { xs: "15px", md: "18px" } }}
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                              overflow="hidden"
                            >
                              {product?.shortName}
                            </Typography>
                            <Typography
                              // gutterBottom
                              variant="h6"
                              component="div"
                              sx={{ fontSize: { xs: "10px", md: "16px" } }}
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                              overflow="hidden"
                            >
                              {product?.brandName}
                            </Typography>

                            {/* <Stack direction="row" spacing={1}>
                            <Typography
                              variant="h6"
                              color="#D47070"
                              sx={{ fontSize: { xs: 14, md: 20 } }}
                            >
                              Rs. {product.variant.sellingPrice}
                            </Typography>
                            <Typography
                              variant="h6"
                              color="black"
                              sx={{
                                textDecoration: "line-through",
                                fontSize: { xs: 14, md: 20 },
                              }}
                            >
                              Rs. {product.variant.price}
                            </Typography>
                          </Stack> */}
                          </CardContent>
                        </CardActionArea>
                        <CardActions
                          sx={{
                            backgroundColor: "#FFF0ED",
                            padding: {
                              xs: "10px 8px 8px 8px",
                              md: "10px 16px 16px 16px",
                            },
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            size="small"
                            color="primary"
                            variant="outlined"
                            fullWidth
                            onClick={() =>
                              navigate(
                                `/products/view?product=${product._id}&variant=${product.variant._id}`
                              )
                            }
                          >
                            View Product
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>

              {wishListCount === 0 && (
                <Container>
                  <Stack
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "60vh",
                    }}
                  >
                    <Typography>No items found</Typography>
                    {/* <Button>Add Products</Button>  */}
                  </Stack>
                </Container>
              )}

              {/* <MyFirstGrid/> */}

              <Stack justifyContent={"center"} alignItems="center" padding={5}>
                <Pagination
                  onChange={handlePagination}
                  count={Math.ceil(wishListCount / pageSize())}
                  shape="rounded"
                  page={page}
                />
              </Stack>
            </Container>
          ) : (
            <NotLogin title={"Login to view items on your Wishlist"} />
          )}
        </>
      )}
    </Page>
  );
}
