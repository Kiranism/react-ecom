import React from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// axios.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("accessToken");

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },

//   (error) => {
//     Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   (response) => {
//     console.log(response);
//     return response;
//   },
//   async (error) => {
//     if (error.response) {
//       if (error.response.status === 401) {
//         localStorage.clear();
//         window.location = "/";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

/// axios interceptors ////
axios.interceptors.request.use((request) => {
  const token = JSON.parse(localStorage.getItem("user"));
  console.log(token.state.accessToken);
  request.headers.Authorization = `Bearer ${token.state.accessToken}`;
  return request;
});
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("user");
      window.location = "/login ";
    } else return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      closeButton={false}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      className="toastcontainer"
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
    />
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
