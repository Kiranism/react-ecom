import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
const products = () => {
  const [products, setProducts] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/product/user/all`)
      .then((res) => {
        console.log(res);
        setProducts(res);
      })
      .catch((res) => console.log(res));
  }, []);

  return <div>{/* <ProductCard products={products} /> */}</div>;
};

export default products;
