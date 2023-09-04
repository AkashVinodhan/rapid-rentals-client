import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { cartContext } from "../context/Context";

export default function MobileCategory() {
  const { state, setfilteredProducts } = React.useContext(cartContext);

  const handleChange = (e) => {
    e.target.value == "All"
      ? setfilteredProducts(state.products)
      : setfilteredProducts(
          state.products.filter((product) => product.category == e.target.value)
        );
  };

  return (
    <div>
      <FormControl
        sx={{
          m: "10px 0px",
          minWidth: 120,
          display: { xs: "block", md: "none" },
        }}
      >
        <InputLabel
          id="demo-simple-select-autowidth-label"
          sx={{
            color: "white",
            "&.Mui-focused": { color: "#f66300" },
          }}
        >
          Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          defaultValue={"All"}
          onChange={handleChange}
          autoWidth
          label="Category"
          sx={{ color: "white" }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Photography">Photography</MenuItem>
          <MenuItem value="Adventure">Adventure</MenuItem>
          <MenuItem value="Camping">Camping</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
