import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../context/Context";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import LoginModal from "./LoginModal";
import axiosInstance from "../axios";

//loading animations
import ThreeDotsWave from "./ThreeDotsWave";

const Cart = () => {
  const { state, dispatch } = useContext(cartContext);
  const [total, setTotal] = useState();

  //modal
  const [open, setOpen] = useState(false);

  //loading pay button
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //update total
    setTotal(
      state.cart.reduce((acc, current) => acc + +current.price * current.qty, 0)
    );
  }, [state.cart]);

  const handleCheckout = async () => {
    if (localStorage.getItem("user")) {
      setLoading(true);
      try {
        const response = await axiosInstance.post("/checkout", state.cart);
        setLoading(false);
        const payment_url = response.data.url;
        if (payment_url) {
          window.open(payment_url);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setOpen(true);
    }
  };

  const backgroundColor = "#3f3f3f";

  return (
    <>
      <Navbar productPage={false} />
      <Box
        sx={{
          minHeight: "calc(100dvh - 75px)",
          m: "75px 0 0 0",
          backgroundColor,
        }}
      >
        <Box
          sx={{
            width: "75%",
            m: "0px auto",
            paddingTop: "50px",
          }}
        >
          {state.cart.length < 1 && (
            <Typography variant="h6" color={"white"}>
              Cart is empty
            </Typography>
          )}
          {state.cart.map((product, index) => (
            <Card
              key={index}
              component={motion.div}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              sx={{
                mb: 2,
                backgroundColor: "inherit",
                color: "white",
                border: "1px solid #807772",
              }}
            >
              <Stack
                key={index}
                direction={{ xs: "column", md: "row" }}
                gap={2}
                width={"100%"}
                alignItems={"center"}
                justifyContent={"space-between"}
                p={2}
                mb={1}
                borderRadius={1}
              >
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  gap={2}
                >
                  <Box width={100}>
                    <img
                      src={product.picture}
                      alt={product.name}
                      width={"100%"}
                      height={75}
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                  <Box width={200} sx={{ textAlign: "center" }}>
                    <Typography variant="body1">{product.name}</Typography>
                    <Typography variant="body2" fontStyle={"italic"}>
                      ₹ {product.price} / day
                    </Typography>
                  </Box>
                </Stack>
                <Box>
                  <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                  >
                    <Button
                      disabled={product.qty == 1}
                      onClick={() => {
                        dispatch({
                          type: "DECREASE_QTY",
                          payload: product,
                        });
                      }}
                    >
                      -
                    </Button>
                    <Button>{product.qty}</Button>
                    <Button
                      onClick={() => {
                        dispatch({
                          type: "INCREASE_QTY",
                          payload: product,
                        });
                      }}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </Box>
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: product,
                    });
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Stack>
            </Card>
          ))}

          {/* Total & Pay Card */}
          {state.cart.length > 0 && (
            <Stack
              direction={"row"}
              justifyContent={"space-around"}
              alignItems={"center"}
              width={{ xs: "90%", md: "25%" }}
              py={2}
              borderRadius={3}
              bgcolor={"#282828"}
              color={"#f1f7f8"}
              position={"fixed"}
              bottom={10}
              right={10}
              left={{ xs: "5%", md: "auto" }}
            >
              <Box fontWeight={"bold"}>Total : ₹ {total}</Box>
              <Box>
                {loading ? (
                  // <CircularProgress color="inherit" size={20} />
                  <ThreeDotsWave />
                ) : (
                  <Button
                    variant="outlined"
                    color="accent"
                    startIcon={<CurrencyRupeeIcon />}
                    onClick={handleCheckout}
                  >
                    Pay
                  </Button>
                )}
              </Box>
            </Stack>
          )}
        </Box>
        {/* Modal */}
        <LoginModal open={open} setOpen={setOpen} />
      </Box>
    </>
  );
};

export default Cart;
