import React, { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
const QuantitySelector = ({ quantity, variantId, productId }) => {
  const [counter, setCounter] = useState(quantity);

  const handleAddToCart = () => {
    try {
      axios
        .post(`${process.env.REACT_APP_API}/cart`, {
          productId: productId,
          variantId: variantId,
          quantity: counter,
        })
        .then((res) => {
          if (!res.data.isError) {
            console.log(res);
            toast.success("Quantity updated");
            // window.dispatchEvent(new CustomEvent("addToCart"));
          }
        })
        .catch((res) => {
          toast.error("Something Went Wrong");
        });
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const handleIncrement = (event) => {
    // setCounter((counter) => counter + 1);

    setCounter((prev) => prev + 1);
    alert(counter);
    handleAddToCart();
  };

  const handleDecrement = () => {
    alert(counter);
    if (counter > quantity) {
      setCounter((prev) => prev - 1);
      handleAddToCart();
    }
  };
  const displayCounter = counter >= 0;
  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      {displayCounter && (
        <Button
          onClick={handleDecrement}
          sx={{ borderColor: "black", color: "black" }}
        >
          -
        </Button>
      )}
      {displayCounter && (
        <Button aria-disabled sx={{ borderColor: "black", color: "black" }}>
          {counter}
        </Button>
      )}
      <Button
        onClick={handleIncrement}
        sx={{ borderColor: "black", color: "black" }}
      >
        +
      </Button>
    </ButtonGroup>
  );
};

export default QuantitySelector;
