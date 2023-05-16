import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { mutate } from "swr";
import { CreateActivity } from "./CreateActivity";
import {
  faPersonBiking,
  faPersonWalking,
  faPersonSwimming,
  faPersonHiking,
  faPersonRunning,
  faSquarePlus,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";

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

export function SideBar() {
  const [activeMenu, setActiveMenu] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newPost, setNewPost] = useState(true);

  const handleMenuClick = (menuName) => {
    setActiveMenu((currentActiveMenu) =>
      menuName === currentActiveMenu ? "" : menuName
    );
  };

  const handleNewPostClick = (newPostState) => {
    // setNewPost((currentNewPostState) =>
    //   newPostState === currentNewPostState ? true : false
    // );

    if (newPostState === true) {
      handleModalOpen();
    } else if (newPostState === false) {
      handleModalClose();
    }
  };

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="sidebar-container">
      <div className="top-sidebar-container">
        <h3>Explore</h3>
        <span
          className={`side-menu ${activeMenu === "biking" ? "active" : ""}`}
          onClick={() => {
            handleMenuClick("biking");
          }}
        >
          <FontAwesomeIcon icon={faPersonBiking} className="side-menu-icon" />
          <p>Biking</p>
        </span>
        <span
          className={`side-menu ${activeMenu === "walking" ? "active" : ""}`}
          onClick={() => handleMenuClick("walking")}
        >
          <FontAwesomeIcon icon={faPersonWalking} className="side-menu-icon" />
          <p>Walking</p>
        </span>
        <span
          className={`side-menu ${activeMenu === "swimming" ? "active" : ""}`}
          onClick={() => handleMenuClick("swimming")}
        >
          <FontAwesomeIcon icon={faPersonSwimming} className="side-menu-icon" />
          <p>Swimming</p>
        </span>
        <span
          className={`side-menu ${activeMenu === "hiking" ? "active" : ""}`}
          onClick={() => handleMenuClick("hiking")}
        >
          <FontAwesomeIcon icon={faPersonHiking} className="side-menu-icon" />
          <p>Hiking</p>
        </span>
        <span
          className={`side-menu ${activeMenu === "running" ? "active" : ""}`}
          onClick={() => handleMenuClick("running")}
        >
          <FontAwesomeIcon icon={faPersonRunning} className="side-menu-icon" />
          <p>Running</p>
        </span>
      </div>
      <div className="border-b ml-12 pb-4"></div>
      <div className="bottom-sidebar-container">
        <span
          className={`side-menu ${activeMenu === "newPost" ? "active" : ""}`}
          onClick={() => {
            handleNewPostClick(true);
          }}
        >
          <FontAwesomeIcon icon={faSquarePlus} className="side-menu-icon" />
          <p>New Post</p>
        </span>
        <span
          className={`side-menu ${activeMenu === "BMI" ? "active" : ""}`}
          onClick={() => handleMenuClick("BMI")}
        >
          <FontAwesomeIcon icon={faCalculator} className="side-menu-icon" />
          <p>BMI Calculator</p>
        </span>
      </div>
      <div>
        <Modal
          open={modalIsOpen}
          onClose={handleModalClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...modalStyle }}>
            <CreateActivity onClose={handleModalClose} />
          </Box>
        </Modal>
      </div>
    </div>
  );
}
