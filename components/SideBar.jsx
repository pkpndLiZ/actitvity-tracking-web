import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonBiking,
  faPersonWalking,
  faPersonSwimming,
  faPersonHiking,
  faPersonRunning,
  faSquarePlus,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";

export function SideBar() {
  const [activeMenu, setActiveMenu] = useState("");

  const handleMenuClick = (menuName) => {
    setActiveMenu((currentActiveMenu) =>
      menuName === currentActiveMenu ? "" : menuName
    );
  };

  return (
    <div className="sidebar-container">
      <div className="top-sidebar-container">
        <h3>Explore</h3>
        <span
          className={`side-menu ${activeMenu === "biking" ? "active" : ""}`}
          onClick={() => handleMenuClick("biking")}
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
      <div className="sidemenu-border"></div>
      <div className="bottom-sidebar-container">
        <span
          className={`side-menu ${activeMenu === "newPost" ? "active" : ""}`}
          onClick={() => handleMenuClick("newPost")}
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
    </div>
  );
}
