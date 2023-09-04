import {
  Box,
  Drawer,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";

import React, { useContext } from "react";
import { cartContext } from "../context/Context";

const Sidebar = () => {
  const { state, setfilteredProducts } = useContext(cartContext);
  const drawerWidth = 225;

  const handleSearch = (e) => {
    setfilteredProducts(
      state.products.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <Box sx={{ display: { xs: "none", md: "block" } }}>
      <Drawer
        PaperProps={{
          sx: {
            height: "calc(100% - 75px)",
            top: 75,
            bgcolor: "inherit",
            padding: "20px",
            color: "white",
          },
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* Search */}
        <TextField
          label="Search..."
          variant="standard"
          onChange={handleSearch}
          InputLabelProps={{
            sx: { color: "white", "&.Mui-focused": { color: "#f66300" } },
          }}
          sx={{
            mb: 3,
            input: {
              color: "white",
            },
          }}
        />
        <FormControl>
          <Box
            id="demo-radio-buttons-group-label"
            sx={{
              fontSize: "1.25rem",
              margin: "10px 0",
              color: "white",
            }}
          >
            Category
          </Box>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="all"
            name="radio-buttons-group"
            onChange={(e) => {
              e.target.value == "All"
                ? setfilteredProducts(state.products)
                : setfilteredProducts(
                    state.products.filter(
                      (product) => product.category == e.target.value
                    )
                  );
            }}
          >
            {["All", "Photography", "Adventure", "Camping"].map(
              (item, index) => (
                <motion.li
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  style={{ listStyle: "none" }}
                  key={index}
                >
                  <FormControlLabel
                    value={item}
                    control={<Radio color="accent" size="small" />}
                    label={item}
                  />
                </motion.li>
              )
            )}
          </RadioGroup>
        </FormControl>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
