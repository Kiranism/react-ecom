import React, { useEffect, useState } from "react";
import FeaturedCard from "./FeaturedCard";
import axios from "axios";
import "./style.css";
import Loader from "../Loader";

const FeaturedDeals = ({ productItems, addToCart }) => {
  const [popular, setPopular] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/category/popular`).then((res) => {
      setPopular(res.data.data.category);
      setLoading(false);
      console.log(res);
    });
  }, []);
  return (
    <>
      <section className="flash">
        <div className="container">
          {/* <div className="heading f_flex">
           */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h1>Featured Categories</h1>
            <h4>
              Visit our shop to see amazing creating from our fashion house
            </h4>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <FeaturedCard productItems={popular} addToCart={addToCart} />
          )}
        </div>
      </section>
    </>
  );
};

export default FeaturedDeals;
