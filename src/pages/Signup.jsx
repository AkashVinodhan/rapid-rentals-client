import { Box, Button, Card, TextField, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../context/Context";
import axiosInstance from "../axios";

const Signup = () => {
  const { setCurrentuser } = useContext(cartContext);
  const nav = useNavigate();
  const initialState = {
    name: "",
    email: "",
    username: "",
    password: "",
  };
  const [user, setuser] = useState(initialState);
  const [inputsFilled, setinputsFilled] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const options = { withCredentials: true, credentials: "include" };
      const res = await axiosInstance.post("/signup", user, options);
      if (res.status == 201) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setCurrentuser(setCurrentuser(res.data.user.name));
        setuser(initialState);
        nav("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => areInputsFilled(), [user]);

  const areInputsFilled = () => {
    let result;
    for (let key in user) user[key] == "" ? (result = false) : (result = true);
    setinputsFilled(result);
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
        component="form"
        onSubmit={handleSignup}
        sx={{
          width: { xs: "90%", md: "50%" },
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Signup
        </Typography>
        <TextField
          label="Name"
          required
          variant="outlined"
          onChange={(e) => {
            setuser({ ...user, name: e.target.value });
          }}
          value={user.name}
          sx={{ width: { xs: "90%", md: "50%" } }}
        />
        <TextField
          label="Email"
          required
          variant="outlined"
          onChange={(e) => {
            setuser({ ...user, email: e.target.value });
          }}
          value={user.age}
          sx={{ width: { xs: "90%", md: "50%" } }}
        />
        <TextField
          label="Username"
          required
          variant="outlined"
          onChange={(e) => {
            setuser({ ...user, username: e.target.value });
          }}
          value={user.username}
          sx={{ width: { xs: "90%", md: "50%" } }}
        />
        <TextField
          label="Password"
          required
          variant="outlined"
          type="password"
          value={user.password}
          onChange={(e) => {
            setuser({ ...user, password: e.target.value });
          }}
          sx={{ width: { xs: "90%", md: "50%" } }}
        />
        <Button
          type="submit"
          disabled={!inputsFilled}
          variant="contained"
          endIcon={<LoginIcon />}
          onClick={handleSignup}
          sx={{ width: { xs: "40%", md: "25%" } }}
        >
          Signup
        </Button>
        <Typography variant="subtitle2">
          Already have an account? <Link to={"/login"}>Login</Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default Signup;
