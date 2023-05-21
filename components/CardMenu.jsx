import * as React from "react";
import { useState, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { EditActivity } from "./EditActivity";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { axiosInstance } from "../src/axiosInstance";
import { mutate } from "swr";
import { app } from "../src/firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

export default function CardMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = React.useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const auth = getAuth(app);
  const { enqueueSnackbar } = useSnackbar();
  const open = Boolean(anchorEl);

  useEffect(() => {
    // Check user's login status initially
    const initialUser = auth.currentUser;
    setIsLoggedIn(!!initialUser); // Set isLoggedIn based on the initial user

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    // Clean up the subscription when component unmounts
    return () => unsubscribe();
  }, []);

  const handleEditClick = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else if (props.item.userId !== auth.currentUser.uid) {
      enqueueSnackbar("You can't edit this card.", { variant: "error" });
    } else {
      setEditModalIsOpen(true);
      handleClose();
    }
  };

  const handleEditModalClose = () => {
    setEditModalIsOpen(false);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    bgcolor: "#1F2021",
    // border: "2px solid #000",
    // boxShadow: 24,
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = async () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else if (props.item.userId !== auth.currentUser.uid) {
      enqueueSnackbar("You can't delete this card.", { variant: "error" });
    } else {
      try {
        await axiosInstance.delete(`api/posts/${props.item._id}`);
        setSuccess(true);
        await mutate("api/posts");
      } catch (error) {
        setError(error.message);
        console.log("error: " + error.message);
      }
    }
  };

  return (
    <div style={{ width: "30px" }}>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ color: "grey", fontSize: 24 }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: { bgcolor: "#3f3f3f", color: "white" },
        }}
      >
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Report</MenuItem>
      </Menu>
      <Modal
        open={editModalIsOpen}
        onClose={handleEditModalClose}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box sx={{ ...modalStyle }}>
          <EditActivity item={props.item} onClose={handleEditModalClose} />
        </Box>
      </Modal>
    </div>
  );
}
