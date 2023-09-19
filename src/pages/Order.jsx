import React from "react";
import OrderBanner from "../components/order/OrderBanner";
import OrderCard from "../components/order/OrderCard";
import Page from "../components/Page";

const Order = () => {
  return (
    <Page title="Orders">
      <OrderBanner />
      <OrderCard />
    </Page>
  );
};

export default Order;
