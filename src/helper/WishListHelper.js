import axios from "axios";

export const WishListFetcher = async () => {
  return await axios
    .get(`${process.env.REACT_APP_API}/wishlist/wishid`)
    .then((res) => {
      return res;
    });
};

export const CartListFetcher = async () => {
  return await axios
    .get(`${process.env.REACT_APP_API}/cart/list`)
    .then((res) => {
      return res;
    });
};
