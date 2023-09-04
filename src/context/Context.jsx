import React, { createContext, useEffect, useReducer, useState } from "react";

import { cartReducer } from "./Reducer";
import axiosInstance, { authHeader } from "../axios";

export const cartContext = createContext();

const Context = ({ children }) => {
  const initialstate = {
    products: [],
    cart: [],
  };
  const [state, dispatch] = useReducer(cartReducer, initialstate);

  //to keep track of current user
  const [currentuser, setCurrentuser] = useState("");

  const [isFirstrender, setIsFirstrender] = useState(true);

  const [filteredProducts, setfilteredProducts] = useState([]);
  //fetch products from DB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = { withCredentials: true, headers: authHeader() };
        const { data } = await axiosInstance.get("/products", options);
        setfilteredProducts(data);
        dispatch({
          type: "FETCH_FROM_DB",
          payload: data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //*fetch cart from local storage on reload
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      dispatch({
        type: "FETCH_FROM_LOCAL",
        payload: cart,
      });
    }
    setIsFirstrender(false);
  }, []);

  //*update cart in local storage
  useEffect(() => {
    //doesn't run on page realod
    if (!isFirstrender)
      localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const value = {
    state,
    dispatch,
    filteredProducts,
    setfilteredProducts,
    currentuser,
    setCurrentuser,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};

export default Context;
