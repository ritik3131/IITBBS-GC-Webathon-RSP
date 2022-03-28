import React, { useContext, useState } from "react";
import { Button, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import SearchButton from "./SearchButton";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
const MenuBar = () => {
  const pathName = window.location.pathname;
  const authCtx = useContext(AuthContext);
  const path = pathName === "/" ? "home" : pathName.substring(1);
  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);
  const googleURL = `${process.env.REACT_APP_BACKEND_HOST}/auth/google`;
  const googleLogoutURL = `${process.env.REACT_APP_BACKEND_HOST}/logout`;

  const menuBar = authCtx.user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={authCtx.user.name} as={Link} to="/" active>
        {authCtx.user.name}
        {/* <Avatar>{authCtx.user.name[0]}</Avatar> */}
      </Menu.Item>
      <div className="right menu">
        <SearchButton />
        <a
          className={`ui item ${activeItem === "logout" ? "active" : ""}`}
          href={googleLogoutURL}
        >
          <LogoutIcon />
        </a>
      </div>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        as={Link}
        to="/"
        active={activeItem === "home"}
        onClick={handleItemClick}
      >
        Home
      </Menu.Item>
      <div className="right menu">
        <SearchButton />
        <a
          className={`ui item ${activeItem === "login" ? "active" : ""}`}
          href={googleURL}
        >
          <LoginIcon />
        </a>
      </div>
    </Menu>
  );
  return menuBar;
};

export default MenuBar;
