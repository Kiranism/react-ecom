import React from "react";
import CardProductCard from "../components/cart/CardProductCard";
import CartBanner from "../components/cart/CartBanner";

const Cart = () => {
  return (
    <div>
      <CartBanner />
      <CardProductCard />
    </div>
  );
};

export default Cart;
