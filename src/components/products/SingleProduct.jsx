import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ImageGallery from "react-image-gallery";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import axios from "axios";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import useCartStore from "../../app/cartStore";
import { CartListFetcher, WishListFetcher } from "../../helper/WishListHelper";
import Loader from "../Loader";
import RelatedProductSlider from "../relatedProducts/RelatedProductSlider";
import SizeChart from "./SizeChart";
import { getLocalStorage } from "../../helper/LocalStorage";
import useWishlistStore from "../../app/wishlistStore";
import useUserStore from "../../app/userStore";

import "./prod.css"

const SingleProduct = ({ setName }) => {
  const { cartItems, addToCart, addToCartLocal, getCart } = useCartStore();
  const { wishListItems, getWishList, addToWishList } = useWishlistStore();
  const { isAuth } = useUserStore();
  const [product, setProduct] = useState();
  const [showNotFound, setShowNotFound] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const productId = searchParams.get("product");
  const variantId = searchParams.get("variant");
  console.log("loca", location);
  const from = location.pathname + location.search;
  useEffect(() => {
    getProductDetails();
    if (isAuth) {
      getWishList();
    }
  }, [searchParams]);

  useEffect(() => {
    if (isAuth) {
      getCart();
    }
  }, []);

  const getProductDetails = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API}/product/user/detail`, {
        params: {
          productId: productId,
          variantId: variantId,
        },
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setProduct(res.data.data.product);
        setName(res.data.data.product?.shortName);
        setSelectedVariant(res.data.data.selectedVariant);
        setImages(res.data.data.product.images);
      })
      .catch((res) => {
        setLoading(false);
        navigate("/products");
        console.log(res);
      });
  };
  console.log("prod", product)

  const imageGallery = images?.map((image, index) => {
    return {
      original: image,
      thumbnail: image,
    };
  });
  console.log(imageGallery);

  const handleWishlist = () => {
    if (isAuth) {
      addToWishList(productId);
    } else {
      navigate("/login", { state: from });
    }
  };

  // const handleAddToCart = () => {
  //   if (selectedVariant.stock > 0) {
  //     try {
  //       axios
  //         .post(`${process.env.REACT_APP_API}/cart`, {
  //           productId: productId,
  //           variantId: variantId,
  //           quantity: 1,
  //         })
  //         .then((res) => {
  //           if (!res.data.isError) {
  //             console.log(res);
  //             toast.success("Product added to cart");
  //             window.dispatchEvent(new CustomEvent("addToCart"));
  //             getWishList();
  //           }
  //         })
  //         .catch((res) => {
  //           // toast.error("Something Went Wrong");
  //           navigate("/login", { state: location.pathname + location.search });
  //         });
  //     } catch (error) {
  //       // toast.error("Something Went Wrong");
  //     }
  //   } else {
  //     toast.error("Out of stock");
  //   }
  // };

  const handleAddToCart = () => {
    if (isAuth) {
      if (selectedVariant.stock > 0) {
        addToCart(productId, variantId);
      } else {
        toast.error("Out of stock");
      }
    } else {
      const productToAdd = {
        productId: product._id,
        variantId: selectedVariant._id,
        image: product.images[0],
        shortName: product.shortName,
        brandName: product.brandName,
        size: selectedVariant.size,
        quantity: 1,
        priceForOneQuantity: selectedVariant.sellingPrice,
        sellingPrice: selectedVariant.sellingPrice,
        price: selectedVariant.price,
      };
      console.log("Product to add", productToAdd)
      addToCartLocal(productId, variantId, productToAdd);
    }
  };
  // console.log("SELECTED VARIENT", selectedVariant.price)

  const discountPercentage = (sellingPrice, mrp) => {
    return Math.round((1 - sellingPrice / mrp) * 100);
  };

  return (
    <div style={{ minHeight: "100%" }}>
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth="xl">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{
              alignItems: { xs: "center", sm: "normal" },
              padding: { xs: "0px", sm: "0px", md: "20px", lg: "40px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flex: "1",
                // width: { xs: "290px", sm: "500px" },
                // padding: { xs: "0px", md: "50px" },
                marginLeft: { xs: "0px", md: "0px" },

                // border: "5px solid",
              }}
            >
              <Box sx={{ display: { xs: "none", lg: "block" } }}>
                <ImageGallery
                  additionalClass="web"
                  items={imageGallery}
                  thumbnailPosition="right"
                  showPlayButton={false}
                  showNav={false}
                  disableThumbnailScroll
                />
              </Box>
              <Box
                sx={{
                  display: { xs: "flex", lg: "none" },
                  paddingTop: { xs: 2, md: 0 },
                }}
              >
                <ImageGallery
                  additionalClass="mobile"
                  items={imageGallery}
                  showPlayButton={false}
                  showNav={false}
                  disableThumbnailScroll
                />
              </Box>
            </Box>
            <Box
              sx={{
                flex: "1",
                pl: { xs: 0, md: 2 },
                pt: { xs: 2, md: 0 },
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography
                variant="h4"
                fontWeight="Bold"
                sx={{ fontSize: { xs: "20px", md: "25px" } }}
              >
                {product?.brandName}
              </Typography>
              <Typography variant="subtitle1">{product?.name}</Typography>

              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h6" color="#D47070">
                  &#8377;{selectedVariant.sellingPrice}
                </Typography>
                <Typography
                  variant="h6"
                  color="black"
                  sx={{ textDecoration: "line-through", fontSize: "15px" }}
                >
                  &#8377;{selectedVariant.price}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#D47070",
                    fontSize: "15px",
                    opacity: 0.7,
                  }}
                >{discountPercentage(
                  selectedVariant.sellingPrice,
                  selectedVariant.price
                )}
                  % off
                </Typography>
              </Stack>
              {/* <Typography variant="h5" paddingTop={1}> */}

              {/* </Typography> */}
              <Box sx={{ paddingTop: "10px" }}>
                <Stack direction={"row"} gap="50px" alignItems={"center"}>
                  <Typography variant="h6" fontSize={"16px"}>
                    Select Size
                  </Typography>
                  <Typography>
                    <SizeChart sizeChartFile={product.sizeChartFile} />
                  </Typography>
                </Stack>

                <Stack spacing={2} direction="row" paddingTop={2}>
                  {product.variants.map((variant, id) => {
                    return (
                      <Button
                        variant={
                          variant._id === selectedVariant._id
                            ? "contained"
                            : "outlined"
                        }
                        sx={{ color: "black", fontWeight: "Bold" }}
                        // onClick={() =>
                        //   (window.location.href = `/products/view?product=${product._id}&variant=${variant._id}`)
                        // }
                        onClick={() =>
                          setSearchParams({
                            product: `${product._id}`,
                            variant: `${variant._id}`,
                          })
                        }
                        disabled={variant.stock <= 0}
                      >
                        {variant.size}
                      </Button>
                    );
                  })}
                </Stack>
              </Box>
              {/* <Box
                sx={{
                  paddingTop: "30px",
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                  alignItems: "center",
                }}
              >
                {selectedVariant.stock === 0 ? (
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: "5px",
                      fontSize: { xs: "10px", md: "16px" },
                    }}
                  >
                    Out of Stock
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: "5px",
                      width: { xs: "100%", md: "50%" },
                      fontSize: { xs: "10px", md: "16px" },
                    }}
                  >
                    Buy Now
                  </Button>
                )}
              </Box> */}
              <Stack spacing={2} direction="row" paddingTop={3}>
                {cartItems?.some((e) => e.variantId === variantId) ? (
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCartOutlinedIcon />}
                    sx={{
                      fontSize: { xs: "12px", md: "16px" },
                      borderRadius: "5px",

                      padding: { xs: "10px" },
                    }}
                    onClick={() => navigate("/cart")}
                  >
                    Go to cart
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    startIcon={<ShoppingCartOutlinedIcon />}
                    sx={{
                      fontSize: { xs: "12px", md: "16px" },
                      borderRadius: "5px",

                      padding: { xs: "10px" },
                    }}
                    onClick={() => handleAddToCart()}
                    disabled={selectedVariant.stock === 0}
                  >
                    Add to cart
                  </Button>
                )}

                {wishListItems?.some((e) => e._id === productId) ? (
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: "5px",
                      fontSize: { xs: "12px", md: "16px" },
                      flex: "1",
                      padding: { xs: "10px" },
                    }}
                    startIcon={<FavoriteOutlinedIcon />}
                  >
                    Wishlisted
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: "5px",
                      fontSize: { xs: "12px", md: "16px" },
                      flex: "1",
                      padding: { xs: "10px" },
                    }}
                    startIcon={<FavoriteBorderOutlinedIcon />}
                    onClick={handleWishlist}
                  >
                    Wishlist
                  </Button>
                )}
              </Stack>
              <Box className="markdown" sx={{ marginTop: "30px" }}>
                {parse(`${product?.description}`)}
              </Box>
            </Box>
          </Stack>
        </Container>
      )}

      <Box mt={4} mb={5}>
        <RelatedProductSlider productId={productId} />
      </Box>
    </div>
  );
};

export default SingleProduct;
