import React from "react";
import FlashCard from "./FlashCard";
import "./style.css";

const FlashDeals = ({ productItems, addToCart }) => {
  return (
    <>
      <section className="flash">
        <div className="container">
          {/* <div className="heading f_flex">
           */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h1>New In This Season</h1>
            <h4>
              Visit our shop to see amazing creating from our fashion house
            </h4>
          </div>
          <FlashCard productItems={productItems} addToCart={addToCart} />
        </div>
      </section>
    </>
  );
};

export default FlashDeals;
