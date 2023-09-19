import React, { useEffect } from "react";

const RazorPayPopup = ({ orderInfo }) => {
  console.log("orderInfo", orderInfo);
  const options = {
    key: orderInfo?.key,
    amount: orderInfo?.amount, //  = INR 1
    name: orderInfo?.name,
    description: "some description",
    image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
    handler: function (response) {
      alert(response.razorpay_payment_id);
    },
    prefill: {
      name: orderInfo?.prefill.name,
      contact: orderInfo?.prefill.contact,
      email: orderInfo?.prefill.email,
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "#F37254",
      hide_topbar: false,
    },
  };

  const openPayModal = (options) => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      {/* <button id="orderBtn" onClick={() => openPayModal(options)}>
        Pay
      </button> */}
    </>
  );
};
export default RazorPayPopup;
