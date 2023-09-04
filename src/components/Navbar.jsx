import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../context/Context";
import axiosInstance, { authHeader } from "../axios";

const Navbar = ({ productPage }) => {
  const nav = useNavigate();
  const { state, currentuser } = useContext(cartContext);

  const handleLogout = async () => {
    try {
      const options = { withCredentials: true, headers: authHeader() };
      const res = await axiosInstance.get("/logout", options);
      if (res.status == 200) {
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
        nav("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      height={"75px"}
      width={"100%"}
      p={2}
      bgcolor={"#282828"}
      color={"white"}
      position={"fixed"}
      top={0}
      zIndex={1}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        ml={2}
        onClick={() => nav("/")}
      >
        <Box>
          <img
            src=".././logo.png"
            alt="Logo"
            width={"100%"}
            height={65}
            style={{
              filter:
                "invert(40%) sepia(59%) saturate(2240%) hue-rotate(4deg) brightness(98%) contrast(104%)",
              cursor: "pointer",
            }}
          />
        </Box>
        {localStorage.getItem("user") && (
          <Typography
            color={"white"}
            width={"150px"}
            ml={2}
            variant="h6"
          >{`Hi, ${JSON.parse(localStorage.getItem("user")).name}`}</Typography>
        )}
      </Stack>
      <Box>
        <Button
          variant="contained"
          color="accent"
          startIcon={productPage ? <ShoppingCartIcon /> : <ArrowBackIcon />}
          onClick={() => {
            productPage ? nav("/cart") : nav("/products");
          }}
        >
          {productPage ? (
            <>
              Cart<span>{`(${state.cart.length})`}</span>
            </>
          ) : (
            <span>Products</span>
          )}
        </Button>
        {localStorage.getItem("user") && (
          <IconButton onClick={handleLogout} color="accent" sx={{ ml: 2 }}>
            <LogoutIcon />
          </IconButton>
        )}
      </Box>
    </Stack>
  );
};

export default Navbar;
