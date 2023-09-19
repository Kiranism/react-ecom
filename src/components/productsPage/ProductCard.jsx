import {
  Box,
  CardActionArea,
  CardActions,
  Container,
  Grid,
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
import { useNavigate, useSearchParams } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import Loader from "../Loader";
import Filters from "./Filters";

export default function ProductCard() {
  const [products, setProducts] = useState();
  const [pagination, setPagination] = useState(0);
  const [page, setPage] = useState(1);
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [nameFilter, setnameFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  console.log("searchParams", searchParams);
  const search = searchParams.get("search");
  console.log("search", search);

  const xlUp = useResponsive("up", "xl");

  const pageSize = () => {
    if (xlUp) {
      return 15;
    } else {
      return 12;
    }
  };
  console.log(pageSize());
  const [options, setOptions] = useState({
    page: pagination,
    size: pageSize(),
    search: search,
    price: priceFilter,
  });

  const navigate = useNavigate();

  // const variantId = searchParams.get("variant");

  // const handleChange = (event) => {
  //   console.log(event.target.value);
  //   setnameFilter(event.target.value);
  // };

  const handlePriceFilter = (event) => {
    setPriceFilter(event.target.value);
    setLoading(true);
    // const temp = { page: 0, size: pageSize, price: priceFilter };
    const temp = options;
    temp["price"] = event.target.value;
    getProducts(temp);
    setPagination(0);
    setPage(1);
    console.log(event.target.value);
  };

  useEffect(() => {
    const temp = options;
    temp["search"] = search;
    temp["page"] = 0;
    getProducts(temp);
  }, [options.search, options.price, searchParams]);

  const getProducts = async (options) => {
    setProducts([]);
    setLoading(true);
    console.log("options", options);
    await axios
      .get(`${process.env.REACT_APP_API}/product/user/all`, {
        params: options,
      })
      .then((res) => {
        console.log(res);
        setProducts(res.data.data.products);
        setProductCount(res.data.data.maxRecords || 0);
        setLoading(false);
      })
      .catch((res) => {
        console.log(res);
        setLoading(false);
      });
  };
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff3d47",
    },
  });

  const handlePagination = (e, page) => {
    // console.log(e.textContent);
    console.log(page);
    setPage(page);
    setPagination(page - 1);
    const temp = { ...options, page: page - 1 };
    setOptions(temp);
    getProducts(temp);
    // console.log(page);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ marginTop: { xs: 1, md: 2 }, minHeight: "60vh" }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          {search && products.length !== 0 && (
            <Typography variant="h6" textAlign={"center"} fontWeight="bold">
              SHOWING RESULTS FOR "{search}"
            </Typography>
          )}

          {products.length ? (
            <>
              <Box sx={{ float: "right" }}>
                <Filters
                  priceFilter={priceFilter}
                  handlePriceFilter={handlePriceFilter}
                />
              </Box>

              <Grid container spacing={2}>
                {products?.map((product, index) => {
                  return (
                    <Grid item xs={6} sm={4} md={4} lg={3} xl={2.4} key={index}>
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
                        onClick={() =>
                          navigate(
                            `/products/view?product=${product._id}&variant=${product.variant._id}`
                          )
                        }
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            sx={{
                              maxHeight: { xs: 220, sm: 270, md: 340 },
                              minHeight: { xs: 220, sm: 270, md: 340 },
                              "@media screen and (max-width: 375px)": {
                                minHeight: "200px",
                                maxHeight: "200px",
                              },
                            }}
                            image={product.images[0]}
                            alt="product images"
                          />

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
                              sx={{ fontSize: { xs: "15px", md: "20px" } }}
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                              overflow="hidden"
                            >
                              {product.shortName
                                ? product.shortName?.toUpperCase()
                                : product.name?.toUpperCase()}
                            </Typography>

                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                            >
                              <Typography
                                variant="h6"
                                color="primary"
                                sx={{ fontSize: { xs: 14, md: 16 } }}
                              >
                                &#8377;{product.variant.sellingPrice}
                              </Typography>
                              <Typography
                                variant="h6"
                                color="black"
                                sx={{
                                  textDecoration: "line-through",
                                  fontSize: { xs: 12, md: 12 },
                                }}
                              >
                                &#8377;{product.variant.price}
                              </Typography>
                            </Stack>
                          </CardContent>
                        </CardActionArea>
                        <CardActions
                          sx={{
                            backgroundColor: "#FFF0ED",
                            padding: {
                              xs: "0px 8px 8px 8px",
                              md: "0px 16px 16px 16px",
                            },
                          }}
                        >
                          <StyledRating
                            readOnly
                            name="customized-color"
                            defaultValue={product.rating}
                            getLabelText={(value) =>
                              `${value} Heart${value !== 1 ? "s" : ""}`
                            }
                            precision={0.5}
                            sx={{
                              fontSize: { xs: 12, md: 20 },
                            }}
                          />
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>

              {/* <MyFirstGrid/> */}

              <Stack justifyContent={"center"} alignItems="center" padding={5}>
                <Pagination
                  onChange={handlePagination}
                  count={Math.ceil(productCount / pageSize())}
                  shape="rounded"
                  page={page}
                />
              </Stack>
            </>
          ) : (
            <Stack>
              <Typography variant="h6" textAlign={"center"} fontWeight="bold">
                NO MATCHING ITEMS
              </Typography>
              <Typography variant="body1" textAlign={"center"}>
                Your search "{search}" did not match any results.
              </Typography>
            </Stack>
          )}
        </>
      )}
    </Container>
  );
}
