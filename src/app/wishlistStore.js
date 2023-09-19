import create from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  wishListItems: [],
  wishListCount: 0,
  isLoading: false,
  error: false,
};
const actions = (set) => ({
  getWishList: async (pageSize, pagination) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      axios
        .get(`${process.env.REACT_APP_API}/wishlist`, {
          params: { size: pageSize, page: pagination },
        })
        .then((res) => {
          console.log("wishlistitems", res);
          set((state) => ({
            ...state,
            wishListItems: res.data.data.data,
            wishListCount: res.data.data.maxRecord,
            isLoading: false,
            error: false,
          }));
        })
        .catch((res) => {
          console.log(res);
          set((state) => ({ ...state, isLoading: false, error: true }));
        });
    } catch (error) {
      console.log(error);
      set((state) => ({ ...state, isLoading: false, error: true }));
    }
  },
  addToWishList: async (productId) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      axios
        .post(`${process.env.REACT_APP_API}/wishlist`, {
          productId: productId,
        })
        .then((res) => {
          if (!res.data.isError) {
            toast.success("Saved to Wishlist");
            actions(set).getWishList();
            set((state) => ({ ...state, isLoading: false, error: false }));
          }
        })
        .catch((res) => {
          console.log(res);
          set((state) => ({ ...state, isLoading: false, error: true }));
          // navigate("/login", { state: location.pathname + location.search });
        });
    } catch (error) {
      set((state) => ({ ...state, isLoading: false, error: true }));
      //   navigate("/login", { state: location.pathname + location.search });
    }
  },
  removeFromWishlist: async (productId) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      axios
        .put(`${process.env.REACT_APP_API}/wishlist/remove`, {
          productId: productId,
        })
        .then((res) => {
          if (!res.data.isError) {
            toast.success("Removed From Wishlist");
            actions(set).getWishList();
          } else {
            toast.error("Something Went Wrong");
          }
        })
        .catch((res) => {
          toast.error("Something Went Wrong");
        })
        .finally(() => {
          set((state) => ({ ...state, isLoading: false }));
        });
    } catch (error) {
      console.log(error);
      set((state) => ({ ...state, isLoading: false }));
      toast.error("Something Went Wrong");
    }
  },
});

const useWishlistStore = create((set) => ({
  ...initialState,
  ...actions(set),
}));

export default useWishlistStore;
