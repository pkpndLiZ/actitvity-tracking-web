import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { EditActivity } from "./EditActivity";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

export default function CardMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleEditClick = () => {
    setEditModalIsOpen(true);
    handleClose();
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
        <MenuItem onClick={handleClose}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Report</MenuItem>
      </Menu>
      <Modal
        open={editModalIsOpen}
        onClose={handleEditModalClose}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box sx={{ ...modalStyle }}>
          <EditActivity onClose={handleEditModalClose} />
        </Box>
      </Modal>
    </div>
  );
}
