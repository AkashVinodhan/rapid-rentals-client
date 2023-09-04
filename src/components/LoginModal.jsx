import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LoginModal({ open, setOpen }) {
  const nav = useNavigate();
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} textAlign={"center"}>
          <Typography id="modal-modal-title" variant="h6" component="h2" m={3}>
            Login to proceed to payments
          </Typography>
          <Button
            color="accent"
            size="small"
            variant="contained"
            onClick={() => nav("/login")}
          >
            Login
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
