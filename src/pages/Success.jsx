import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Success() {
  const nav = useNavigate();
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#3f3f3f",
        display: "grid",
        placeItems: "center",
        color: "white",
      }}
    >
      <Box textAlign={"center"}>
        <Typography variant="h5" m={3}>
          Payment Succesfull!
        </Typography>
        <Button
          onClick={() => nav("/products")}
          color="accent"
          variant="contained"
        >
          Products
        </Button>
      </Box>
    </Box>
  );
}

export default Success;
