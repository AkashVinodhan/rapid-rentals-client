import { Box, Button, Card, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../context/Context";
import axiosInstance from "../axios";

const Login = () => {
  const { setCurrentuser } = useContext(cartContext);
  const nav = useNavigate();
  const initialState = {
    username: "test",
    password: "Password",
  };
  const [user, setuser] = useState(initialState);
  const [inputsFilled, setinputsFilled] = useState(false);

  useEffect(() => areInputsFilled(), [user]);

  const areInputsFilled = () => {
    let result;
    for (let key in user) user[key] == "" ? (result = false) : (result = true);
    setinputsFilled(result);
  };

  const handleLogin = async () => {
    try {
      const options = { withCredentials: true, credentials: "include" };
      const res = await axiosInstance.post("/login", user, options);
      if (res.status == 200) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setCurrentuser(res.data.user.name);
        setuser(initialState);
        nav("/products");
      }
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert(error.response.data);
      }
    }
  };

  const backgroundColor = "#3f3f3f";
  return (
    <Box
      sx={{
        backgroundColor,
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Box ml={2} sx={{ position: "fixed", top: "10px", left: "10px" }}>
        <img
          src=".././logo.png"
          alt="Logo"
          width={"100%"}
          height={65}
          style={{
            filter:
              "invert(40%) sepia(59%) saturate(2240%) hue-rotate(4deg) brightness(98%) contrast(104%)",
          }}
        />
      </Box>
      <Card
        sx={{
          height: "60%",
          width: { xs: "90%", md: "40%" },
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          required
          onChange={(e) => {
            setuser({ ...user, username: e.target.value });
          }}
          value={user.username}
          sx={{ width: { xs: "90%", md: "50%" } }}
        />
        <TextField
          label="Password"
          variant="outlined"
          required
          type="password"
          value={user.password}
          onChange={(e) => {
            setuser({ ...user, password: e.target.value });
          }}
          sx={{ width: { xs: "90%", md: "50%" } }}
        />
        <Button
          variant="contained"
          disabled={!inputsFilled}
          endIcon={<LoginIcon />}
          onClick={handleLogin}
          sx={{ width: "25%" }}
        >
          Login
        </Button>
        <Typography variant="subtitle2">
          Don't have an account yet? <Link to={"/signup"}>Signup</Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default Login;
