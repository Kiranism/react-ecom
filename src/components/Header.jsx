import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  createTheme,
  Divider,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  Stack,
  ThemeProvider,
  Zoom,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/capricorn.png";
import { CartListFetcher } from "../helper/WishListHelper";
import useResponsive from "../hooks/useResponsive";
import {
  default as PrimarySearch,
  default as PrimarySearchAppBar,
} from "./Search";
import { Search } from "@mui/icons-material";
import titleCase from "../helper/TitleCase";
import { getLocalStorage } from "../helper/LocalStorage";
import useCartStore from "../app/cartStore";
import useUserStore from "../app/userStore";
const accessToken = localStorage?.getItem("accessToken");
const user = JSON.parse(localStorage?.getItem("user"));

const ResponsiveAppBar = () => {
  const { isAuth, fullname, email, accessToken, logout, set } = useUserStore();
  const { getCart, getLocalCart, cartItems, addToCartWithQuantity } =
    useCartStore();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [showSearch, setShowSearch] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.pathname);
  useEffect(() => {
    if (isAuth) {
      getCart();
      const localCartPro = localStorage.getItem("local_cart")
        ? JSON.parse(localStorage.getItem("local_cart"))
        : [];
      if (localCartPro.length) {
        localCartPro.forEach((product) =>
          addToCartWithQuantity(
            product.quantity,
            product.variantId,
            product.productId
          )
        );
        localStorage.removeItem("local_cart");
      }
    } else {
      getLocalCart();
    }
  }, [isAuth]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    await logout()
      .then((res) => {
        if (!res.data.isError) {
          set((state) => ({
            ...state,
            fullname: "",
            email: "",
            accessToken: null,
            isAuth: false,
            error: false,
          }));
        }
        window.location.reload();
        console.log("resoflogout", res);
      })
      .catch((err) => console.log(err));
  };

  const smUp = useResponsive("up", "sm");

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 1025,
        lg: 1200,
        xl: 1536,
      },
    },
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: "#D47070",
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: "#000000DE",
      },
    },
    typography: {
      h6: {
        fontFamily: ["Lato", "sans-serif"].join(","),
      },
    },
  });
  // const handleLogout = () => {
  //   try {
  //     axios
  //       .post(
  //         `${process.env.REACT_APP_API}/auth/user/logout`,
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         localStorage.removeItem("accessToken");
  //         window.location = "/";
  //       })
  //       .catch((err) => console.log(err));
  //   } catch (error) {}
  // };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ backgroundColor: "#EEA7A7", height: "120px" }}>
        {isAuth ? (
          <Stack p={3} spacing={0.5}>
            <AccountBoxIcon fontSize="large" />
            <Typography variant="h6" textAlign={"initial"} fontWeight="bold">
              {titleCase(fullname)}
            </Typography>
          </Stack>
        ) : (
          <>
            <Box pt={2}>
              <Typography variant="h6" fontWeight="bold">
                Welcome
              </Typography>
              <Typography variant="caption">
                to access account and manage orders
              </Typography>
            </Box>
            <Box>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  navigate("/login");
                  handleDrawerToggle();
                }}
              >
                Login / Signup
              </Button>
            </Box>
          </>
        )}
      </Box>
      <Divider />
      {/* <Box sx={{ ml: 2, mt: 1 }}>
        <PrimarySearch
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
        />
      </Box> */}

      <List sx={{ p: 1 }}>
        <ListItem disablePadding disableGutters>
          <ListItemButton
            sx={{
              // textAlign: "center",
              display: "block",
              color: "black",
              "&:hover": {
                color: "#D47070",
              },
              "&.Mui-selected": {
                color: "#D47070",
                borderRadius: "5px",
              },
            }}
            selected={"/" === location.pathname}
            onClick={() => {
              navigate("/");
              handleDrawerToggle();
            }}
          >
            <Typography variant="h6">Home</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding disableGutters sx={{ margin: "0px" }}>
          <ListItemButton
            sx={{
              // textAlign: "center",
              display: "block",

              color: "black",
              "&:hover": {
                color: "#D47070",
              },
              "&.Mui-selected": {
                color: "#D47070",
                borderRadius: "5px",
              },
            }}
            selected={"/products" === location.pathname}
            onClick={() => {
              navigate("/products");
              handleDrawerToggle();
            }}
          >
            <Typography variant="h6">Products</Typography>
          </ListItemButton>
        </ListItem>
        {isAuth && (
          <ListItem disablePadding disableGutters sx={{ margin: "0px" }}>
            <ListItemButton
              sx={{
                // textAlign: "center",
                display: "block",
                color: "black",
                "&:hover": {
                  color: "#D47070",
                },
                "&.Mui-selected": {
                  color: "#D47070",
                  borderRadius: "5px",
                },
              }}
              selected={"/orders" === location.pathname}
              onClick={() => {
                navigate("/orders");
                handleDrawerToggle();
              }}
            >
              <Typography variant="h6">Orders</Typography>
            </ListItemButton>
          </ListItem>
        )}
        <ListItem disablePadding disableGutters sx={{ margin: "0px" }}>
          <ListItemButton
            // sx={{ textAlign: "center" }}
            onClick={() => {
              navigate("/about-us");
              handleDrawerToggle();
            }}
          >
            <Typography variant="h6">About us</Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding disableGutters sx={{ margin: "0px" }}>
          <ListItemButton
            // sx={{ textAlign: "center" }}
            onClick={() => {
              navigate("/contact-us");
              handleDrawerToggle();
            }}
          >
            <Typography variant="h6">Contact us</Typography>
          </ListItemButton>
        </ListItem>
        {isAuth ? (
          <ListItem disablePadding disableGutters sx={{ margin: "0px" }}>
            <ListItemButton onClick={() => handleLogout()}>
              <Typography variant="h6">Logout</Typography>
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding disableGutters sx={{ margin: "0px" }}>
            <ListItemButton
              // sx={{ textAlign: "center" }}
              onClick={() => {
                navigate("/login");
                handleDrawerToggle();
              }}
            >
              <Typography variant="h6">Login </Typography>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: "#FFF0ED" }}
      >
        <Container maxWidth="xl" sx={{ backgroundColor: "#FFF0ED" }}>
          <Toolbar disableGutters>
            <Stack
              direction={"row"}
              sx={{ display: { xs: "flex", md: "none" } }}
              alignItems={"center"}
              width="100%"
              justifyContent={"space-between"}
            >
              {!showSearch && (
                <>
                  {" "}
                  <Box
                    sx={{
                      // flexGrow: { xs: 0.2, sm: 0.1 },
                      display: { xs: "flex", md: "none" },
                      alignItems: "center",
                      justifyContent: "flex-start",
                      width: "75px",
                    }}
                  >
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleDrawerToggle}
                      style={{ color: "black" }}
                    >
                      <MenuIcon />
                    </IconButton>
                    {/* Hamburger Menu starts here */}

                    <Box component="nav">
                      <Drawer
                        // container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                          keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                          display: { xs: "block", sm: "block", md: "none" },
                          "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: smUp ? 420 : 280,
                            backgroundColor: "#FFE6E1",
                          },
                        }}
                      >
                        {drawer}
                      </Drawer>
                    </Box>
                    {/* Hamburger Menu Ends  */}
                  </Box>
                  <Box
                    sx={{
                      display: {
                        xs: "flex",
                        md: "none",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "2px",
                      },
                    }}
                    onClick={() => navigate("/")}
                  >
                    <img src={Logo} height="70px" width="70px" />
                  </Box>
                  <Box
                    sx={{
                      display: { xs: "flex", md: "none" },
                      alignItems: "center",
                      justifyContent: "flex-end",
                      width: "75px",
                    }}
                  >
                    <IconButton
                      size="small"
                      aria-label="show 4 new mails"
                      color="inherit"
                      onClick={() => setShowSearch(true)}
                    >
                      <Search style={{ color: "black", marginRight: "2px" }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      aria-label="show 4 new mails"
                      color="inherit"
                      onClick={() => navigate("/wishlist")}
                    >
                      <FavoriteBorderOutlinedIcon
                        style={{ color: "black", marginRight: "2px" }}
                      />
                    </IconButton>
                    <IconButton
                      size="small"
                      aria-label="show 4 new mails"
                      color="inherit"
                      onClick={() => navigate("/cart")}
                    >
                      <Badge badgeContent={cartItems.length} color="error">
                        <LocalMallOutlinedIcon
                          style={{ color: "black", marginRight: "2px" }}
                        />
                      </Badge>
                    </IconButton>
                  </Box>
                </>
              )}
              {showSearch && (
                <Zoom in={showSearch}>
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      padding: "15px 0px 15px 0px ",
                    }}
                  >
                    <PrimarySearchAppBar
                      setShowSearch={setShowSearch}
                      showSearch={showSearch}
                    />
                  </Box>
                </Zoom>
              )}
            </Stack>

            {/* web header */}
            <Stack
              sx={{
                display: { xs: "none", sm: "none", md: "flex" },
              }}
              direction={"row"}
              alignItems={"center"}
              width="100%"
            >
              <Box
                sx={{
                  flexGrow: 1,
                  // margin: "9px",
                  display: { xs: "none", sm: "none", md: "flex" },
                  justifyContent: "flex-start",
                  width: "390px",
                }}
              >
                <MenuItem
                  onClick={() => navigate("/")}
                  sx={{
                    // my: 2,
                    mr: 1,
                    // color: "black",
                    display: "block",
                    color: "black",
                    "&:hover": {
                      color: "#D47070",
                    },
                    "&.Mui-selected": {
                      color: "#D47070",
                      borderRadius: "5px",
                    },
                  }}
                  selected={"/" === location.pathname}
                >
                  HOME
                </MenuItem>
                <MenuItem
                  onClick={() => navigate("/products")}
                  sx={{
                    // my: 2,
                    mr: 1,
                    // color: "black",
                    display: "block",
                    color: "black",
                    "&:hover": {
                      color: "#D47070",
                    },
                    "&.Mui-selected": {
                      color: "#D47070",
                      borderRadius: "5px",
                    },
                  }}
                  selected={"/products" === location.pathname}
                >
                  PRODUCTS
                </MenuItem>
                <MenuItem
                  onClick={() => navigate("/about-us")}
                  sx={{
                    // my: 2,
                    mr: 1,
                    // color: "black",
                    display: "block",
                    color: "black",
                    "&:hover": {
                      color: "#D47070",
                    },
                    "&.Mui-selected": {
                      color: "#D47070",
                      borderRadius: "5px",
                    },
                  }}
                  selected={"/about-us" === location.pathname}
                >
                  ABOUT US
                </MenuItem>

                <MenuItem
                  onClick={() => navigate("/contact-us")}
                  sx={{
                    // my: 2,
                    mr: 1,
                    // color: "black",
                    display: "block",
                    color: "black",
                    "&:hover": {
                      color: "#D47070",
                    },
                    "&.Mui-selected": {
                      color: "#D47070",
                      borderRadius: "5px",
                    },
                  }}
                  selected={"/contact-us" === location.pathname}
                >
                  CONTACT US
                </MenuItem>
              </Box>
              <Box
                sx={{
                  cursor: "pointer",
                  // flex: "2",
                  display: { xs: "none", md: "flex" },
                  flex: 2,
                  justifyContent: "center",
                }}
                onClick={() => navigate("/")}
              >
                <img src={Logo} height="100px" width="100px" />
              </Box>

              {/* search */}

              <Box
                sx={{
                  display: { xs: "none", md: "flex" },

                  // flex: 1,
                  flexGrow: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                  width: "390px",
                }}
              >
                <PrimarySearch />
                <IconButton
                  onClick={handleOpenUserMenu}
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  sx={{ marginLeft: "10px" }}
                >
                  <PersonOutlineOutlinedIcon
                    style={{
                      color: "black",
                      marginRight: "2px",
                      fontSize: "30px",
                    }}
                  />
                </IconButton>

                <Menu
                  anchorEl={anchorElUser}
                  id="account-menu"
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  // onClick={handleCloseUserMenu}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      width: 260,
                      maxWidth: "100%",
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <Stack p={2} pb={1}>
                    {isAuth ? (
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Hello {fullname}
                        </Typography>
                        <Typography variant="subtitle2">{email}</Typography>
                      </Box>
                    ) : (
                      <div>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            Welcome
                          </Typography>
                          <Typography variant="caption">
                            to access account and manage orders
                          </Typography>
                        </Box>
                        <Box>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              navigate("/login");
                              handleCloseUserMenu();
                            }}
                          >
                            Login / Signup
                          </Button>
                        </Box>
                      </div>
                    )}
                  </Stack>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      navigate("/orders");
                      handleCloseUserMenu();
                    }}
                  >
                    My Orders
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/wishlist");
                      handleCloseUserMenu();
                    }}
                  >
                    Wishlist
                  </MenuItem>

                  {isAuth && (
                    <div>
                      {" "}
                      <Divider />
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </div>
                  )}
                </Menu>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={() => navigate("/wishlist")}
                >
                  <FavoriteBorderOutlinedIcon
                    style={{ color: "black", marginRight: "2px" }}
                  />
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={() => navigate("/cart")}
                >
                  <Badge badgeContent={cartItems?.length} color="error">
                    <LocalMallOutlinedIcon
                      style={{ color: "black", marginRight: "2px" }}
                    />
                  </Badge>
                </IconButton>
              </Box>
            </Stack>
          </Toolbar>
          {/* {showSearch && (
          <Slide direction="left" in={showSearch} mountOnEnter unmountOnExit>
            <Box
              style={{
                float: "right",
                // right: "0",
                // marginRight: "40px",
                // marginTop: "-50px",
                // position: "absolute",
              }}
            >
              <SearchAppBar />
            </Box>
          </Slide>
        )} */}
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;
