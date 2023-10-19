import { motion } from "framer-motion";
import React from "react";

const LoadingDot = {
  display: "block",
  width: "0.5rem",
  height: "0.5rem",
  backgroundColor: "#f66300",
  borderRadius: "50%",
};

const LoadingContainer = {
  width: "2rem",
  height: "2rem",
  display: "flex",
  justifyContent: "space-around",
};

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
  },
};

const DotTransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
};

export default function ThreeDotsWave() {
  return (
    <motion.div
      style={LoadingContainer}
      variants={ContainerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.span
        style={LoadingDot}
        variants={DotVariants}
        transition={DotTransition}
      />
      <motion.span
        style={LoadingDot}
        variants={DotVariants}
        transition={DotTransition}
      />
      <motion.span
        style={LoadingDot}
        variants={DotVariants}
        transition={DotTransition}
      />
    </motion.div>
  );
}
