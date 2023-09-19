import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Data from "./components/Data";
import Footer from "./components/Footer";
import ResponsiveAppBar from "./components/Header";
import ForgotPassword from "./components/resetpasswd/ForgotPassword";
import VerifySignup from "./components/signup/VerifySignup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Failure from "./pages/Failure";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Order from "./pages/Order";
import OrderView from "./pages/OrderView";
import Products from "./pages/Products";
import ProductView from "./pages/ProductView";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import Success from "./pages/Success";
import Wishlist from "./pages/Wishlist";
import PrivacyPolicy from "./components/footerLinks/PrivacyPolicy";
import TermsConditions from "./components/footerLinks/TermsConditions";
import ContactUs from "./components/footerLinks/ContactUs";
import ShippingPolicy from "./components/footerLinks/ShippingPolicy";
import RefundPolicy from "./components/footerLinks/RefundPolicy";
import AboutUs from "./components/AboutUs";
import ScrollToTop from "./helper/ScrollToTop";
import Return from "./pages/Return";
import Replacement from "./pages/Replacement";
import OrderReplaceView from "./components/order/OrderReplaceView";
import useUserStore from "./app/userStore";
import PrivateRoute from "./routes/PrivateRoute";
import NotLogin from "./components/NotLogin";

function App() {
  const { productItems } = Data;
  const { isAuth } = useUserStore();

  const theme = createTheme({
    typography: {
      h1: {
        fontFamily: ["Alegreya", "serif"].join(","),
      },
      fontFamily: ["Lato", "sans-serif"].join(","),
    },

    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        main: "#D47070",
      },
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
    },
    // breakpoints: {
    //   values: {
    //     xs: 0,
    //     sm: 576,
    //     md: 768,
    //     lg: 992,
    //     xl: 1200,
    //   },
    // },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ backgroundColor: "#FFF0ED" }}>
        <ResponsiveAppBar />
        <ScrollToTop>
          <Routes>
            {/* Private Routes  */}
            <Route element={<PrivateRoute />}>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order/success" element={<Success />} />
              <Route path="/order/failure" element={<Failure />} />
              <Route path="/return/:id" element={<Return />} />
              <Route path="/replacement/:id" element={<Replacement />} />
            
              {/* <Route path="/order-replace/:id" element={<OrderReplaceView />} /> */}
            </Route>

            {/* Private Routes end */}

            {/* Routes goes here */}
            <Route path="/order/:id" element={<OrderView />} />
            <Route path="/" element={<Home productItems={productItems} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-pass" element={<ForgotPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products" element={<Products />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/view" element={<ProductView />} />

            <Route path="/verify-signup" element={<VerifySignup />} />
            <Route path="/orders" element={<Order />} />

            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/termsandconditions" element={<TermsConditions />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/shippingpolicy" element={<ShippingPolicy />} />
            <Route path="/refundpolicy" element={<RefundPolicy />} />
            <Route path="/about-us" element={<AboutUs />} />

            {/* Routes ends here */}
            {/* page not found  */}
            <Route path="*" element={<NotLogin title={"Page Not Found"} />} />
          </Routes>
        </ScrollToTop>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
