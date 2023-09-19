import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  fullname: "",
  email: "",
  accessToken: null,
  isAuth: false,
  error: false,
};
const actions = (set) => ({
  login: async (values) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/auth/user/login`,
        values
      );
      return res.data;
    } catch (error) {
      return error;
    }
  },
  logout: async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/auth/user/logout`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
});

const userStore = (set) => ({
  ...initialState,
  ...actions(set),
  set,
});

const useUserStore = create(
  devtools(
    persist(userStore, {
      name: "user",
    })
  )
);

export default useUserStore;
