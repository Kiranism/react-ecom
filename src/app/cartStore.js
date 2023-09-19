import create from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  cartInfo: {},
  isLoading: false,
  error: false,
};
const actions = (set, get) => ({
  getCart: async () => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/cart`);
      set((state) => ({
        ...state,
        cartItems: res.data.data.products,
        cartInfo: res.data.data,
        isLoading: false,
        error: false,
      }));
      console.log("products", res);
    } catch (error) {
      console.log(error);
      set((state) => ({ ...state, isLoading: false, error: true }));
    }
  },
  addToCart: async (productId, variantId) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      axios
        .post(`${process.env.REACT_APP_API}/cart`, {
          productId: productId,
          variantId: variantId,
          quantity: 1,
        })
        .then((res) => {
          if (!res.data.isError) {
            console.log(res);
            toast.success("Product added to cart");
            actions(set).getCart();
            set((state) => ({ ...state, isLoading: false }));
            //   window.dispatchEvent(new CustomEvent("addToCart"));
            //   getWishList();
          }
        })
        .catch((res) => {
          console.log(res);
          set((state) => ({ ...state, isLoading: false }));
          // toast.error("Something Went Wrong");
          //   navigate("/login", {
          //     state: location.pathname + location.search,
          //   });
        });
    } catch (error) {
      set((state) => ({ ...state, isLoading: false }));
      // toast.error("Something Went Wrong");
    }
  },
  addToCartWithQuantity: async (value, variantId, productId) => {
    try {
      axios
        .post(`${process.env.REACT_APP_API}/cart`, {
          productId: productId,
          variantId: variantId,
          quantity: value,
        })
        .then((res) => {
          if (!res.data.isError) {
            console.log(res);
            toast.success("Cart updated");
            actions(set).getCart();
          }
        })
        .catch((res) => {
          toast.error("Something Went Wrong");
        });
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  },
  removeFromCart: async (variantId, productId) => {
    try {
      await axios
        .put(`${process.env.REACT_APP_API}/cart/remove`, {
          productId: productId,
          variantId: variantId,
        })
        .then((res) => {
          if (!res.data.isError) {
            toast.success("Removed From Cart");
            actions(set).getCart();
          } else {
            toast.error("Something Went Wrong");
          }
        })
        .catch((res) => {
          toast.error("Something Went Wrong");
        });
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  },

  // to manage offline
  getLocalCart: async () => {
    let deliveryCharge;
    const localCartPro = localStorage.getItem("local_cart")
      ? JSON.parse(localStorage.getItem("local_cart"))
      : [];

    if (localCartPro.length) {
      const maxPrice = localCartPro.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const grandTotal = localCartPro.reduce(
        (total, item) => total + item.sellingPrice * item.quantity,
        0
      );
      const discount = maxPrice - grandTotal;
      axios
        .get(`${process.env.REACT_APP_API}/settings/user/delivery`)
        .then((response) => {
          let shippingCharge = 0;
          const data = response.data.data;
          if (grandTotal > data.freeDeliveyThreshold) {
            // If the grandTotal is greater than the value in the response, set shippingCharge to 0
            shippingCharge = 0;
          } else {
            if (localCartPro.length) {
              // const highestShippingCharge = Math.max(
              //   ...localCartPro
              //     .map((item) => item.shippingCharge)
              //     .filter((val) => val)
              // );
              shippingCharge = data.deliveryCharge;
            }
          }
          let localCartInfo = {
            maxPrice: maxPrice,
            grandTotal: grandTotal,
            discount: discount,
            deliveryCharge: shippingCharge,
          };
          set((state) => ({
            ...state,
            cartItems: localCartPro,
            cartInfo: localCartInfo,
            isLoading: false,
            error: false,
          }));
        })
        .catch((err) => console.log(err));
    }
  },

  addToCartLocal: (productId, variantId, product) => {
    const state = get();
    const itemExists = state.cartItems.some(
      (cartItem) =>
        cartItem.productId === productId && cartItem.variantId === variantId
    );
    if (!itemExists) {
      set((state) => {
        const updatedItems = [...state.cartItems, product];
        console.log("updatedItems", updatedItems)
        window.localStorage.setItem("local_cart", JSON.stringify(updatedItems));
        toast.success("Product added to cart");
        return { cartItems: updatedItems };
      });
    }
  },

  setLocalCartProducts: (products) => set({ cartItems: products }),
  setLocalCartInfo: (cartInfo) => set({ cartInfo: cartInfo }),
  removeFromLocalCart: (productId, variantId) =>
    set((state) => {
      const updatedItems = state.cartItems.filter(
        (p) => p.id !== productId && p.variantId !== variantId
      );
      window.localStorage.setItem("local_cart", JSON.stringify(updatedItems));
      actions(set).getLocalCart();
      return { cartItems: updatedItems };
    }),
  quantityUpdateOfLocalCart: (value, productId, variantId) =>
    set((state) => {
      const quantityUpdatedPro = state.cartItems.map((cartPro) => {
        if (
          cartPro.productId === productId &&
          cartPro.variantId === variantId
        ) {
          return {
            ...cartPro,
            quantity: value,
            sellingPrice: cartPro.sellingPrice,
            price: cartPro.price,
          };
        }
        return cartPro;
      });
      console.log("cartProdu", quantityUpdatedPro)
      window.localStorage.setItem(
        "local_cart",
        JSON.stringify(quantityUpdatedPro)
      );
      actions(set).getLocalCart();
      return { cartItems: quantityUpdatedPro };
    }),
});

const useCartStore = create((set, get) => ({
  ...initialState,
  ...actions(set, get),
}));

export default useCartStore;
