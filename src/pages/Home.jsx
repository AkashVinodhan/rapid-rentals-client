import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance, { authHeader } from "../axios";

const Home = () => {
  const nav = useNavigate();
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
    <Box
      sx={{
        height: "100vh",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#282828",
      }}
    >
      {/* Navbar */}
      <Box
        component={"nav"}
        sx={{
          height: "70px",
          width: "100%",
          padding: "15px 10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box ml={2}>
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
        {localStorage.getItem("user") ? (
          <Button
            variant="contained"
            color="accent"
            sx={{ zIndex: 3 }}
            onClick={handleLogout}
          >
            <Typography fontWeight={"bold"} color={"white"}>
              Logout
            </Typography>
          </Button>
        ) : (
          <Button
            variant="contained"
            color="accent"
            sx={{ zIndex: 3 }}
            onClick={() => {
              nav("/login");
            }}
          >
            <Typography fontWeight={"bold"} color={"white"}>
              Login
            </Typography>
          </Button>
        )}
      </Box>
      {/* content */}
      <Box
        sx={{
          height: "100%",
          width: "100%",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-start" },
          zIndex: 2,
        }}
      >
        <Box
          component={motion.section}
          initial={{ scale: 0.75 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          sx={{
            height: "40%",
            width: { xs: "80%", md: "40%" },
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              letterSpacing: "3px",
              marginBottom: 2,
            }}
          >
            Rapid Rentals
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: { xs: "1.25rem", md: "1rem" },
            }}
          >
            "Unlock Your Creativity. Capture the Moment. Rent with Ease!"
          </Typography>
          <Button
            component={motion.button}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3 },
            }}
            onClick={() => nav("/products")}
            variant="contained"
            color="accent"
            size="large"
            sx={{
              margin: "20px auto",
              fontWeight: "bold",
            }}
          >
            <Typography fontWeight={"bold"}>Explore</Typography>
          </Button>
        </Box>
        {/* Blob */}
        <Box
          component={"img"}
          src="../../src/assets/blob.svg"
          alt="blob"
          sx={{
            position: "fixed",
            zIndex: -1,
            display: { xs: "none", md: "block" },
          }}
        />

        <Box
          component={motion.img}
          src="../../src/assets/homeBg.png"
          alt="camera"
          whileHover={{
            x: 50,
            transition: { duration: 0.3 },
          }}
          sx={{
            position: "fixed",
            right: "150px",
            zIndex: -1,
            display: { xs: "none", md: "block" },
          }}
        />
      </Box>
    </Box>
  );
};

export default Home;
