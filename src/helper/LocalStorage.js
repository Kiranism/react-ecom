export const getLocalStorage = () => {
  return {
    accessToken: localStorage.getItem("accessToken"),
    local_cart: localStorage.getItem("local_cart")
      ? JSON.parse(localStorage.getItem("local_cart"))
      : [],
  };
};
