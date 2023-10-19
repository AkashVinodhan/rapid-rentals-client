import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import { Box, Grid, Skeleton, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { cartContext } from "../context/Context.jsx";
import Navbar from "./Navbar";
import MobileCategory from "./MobileCategory";
import CardSkeleton from "./CardSkeleton";

import { motion, AnimatePresence } from "framer-motion";

const Products = () => {
  const { state, dispatch, filteredProducts, isLoading } =
    useContext(cartContext);

  const backgroundColor = "#3f3f3f";

  return (
    <>
      <Navbar productPage={true} />

      <Stack
        direction={"row"}
        sx={{ backgroundColor, color: "white" }}
        minHeight={"100dvh"}
        width={"100%"}
      >
        <Sidebar />
        <Box
          width={"100%"}
          sx={{
            height: "calc(100% - 75px)",
            m: "120px 30px 0px 30px",
          }}
        >
          {/* Mobile category */}
          <MobileCategory />
          <Grid
            container
            spacing={3}
            width={"100%"}
            component={motion.div}
            layout
          >
            {isLoading ? (
              <CardSkeleton />
            ) : (
              <>
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      mb={"30px"}
                      key={product.name}
                      component={motion.div}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Card
                        sx={{
                          maxWidth: 345,
                          minHeight: "330px",
                          p: "20px",
                          backgroundColor: "inherit",
                          color: "white",
                          border: "1px solid #807772",
                        }}
                      >
                        <img
                          src={product.picture}
                          alt={product.name}
                          width={"100%"}
                          height={150}
                          style={{
                            objectFit: "cover",
                            borderRadius: 2,
                          }}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            whiteSpace={"nowrap"}
                            textOverflow={"ellipsis"}
                          >
                            {product.name}
                          </Typography>
                          <Typography variant="body2">
                            ₹{product.price} / day
                          </Typography>
                        </CardContent>
                        <CardActions>
                          {!state.cart.some(
                            (item) => item.name === product.name
                          ) ? (
                            <Button
                              size="small"
                              color="accent"
                              variant="contained"
                              onClick={() => {
                                dispatch({
                                  type: "ADD_TO_CART",
                                  payload: product,
                                });
                              }}
                            >
                              Add to Cart
                            </Button>
                          ) : (
                            <Button
                              size="small"
                              color="primary"
                              variant="contained"
                              onClick={() => {
                                dispatch({
                                  type: "REMOVE_FROM_CART",
                                  payload: product,
                                });
                              }}
                            >
                              Remove from Cart
                            </Button>
                          )}
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </AnimatePresence>
              </>
            )}
          </Grid>
        </Box>
      </Stack>
    </>
  );
};

export default Products;
