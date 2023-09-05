import { Grid, Skeleton } from "@mui/material";
import React from "react";

function CardSkeleton() {
  return (
    <>
      {Array(9)
        .fill(0)
        .map((_, index) => (
          <Grid item xs={12} sm={6} md={4} mb={"30px"} key={index}>
            <Skeleton
              animation="wave"
              variant="rounded"
              width={"280px"}
              height={"150px"}
              sx={{ mb: "10px" }}
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"280px"}
              height={"76px"}
            />
            <Skeleton
              animation="wave"
              variant="text"
              width={"280px"}
              height={"40px"}
            />
          </Grid>
        ))}
    </>
  );
}

export default CardSkeleton;
