import { toast } from "react-toastify";
import { MdMenu } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { FaUserAlt } from "react-icons/fa";
import React, { useContext, useState } from "react";
import AuthService from "../../../service/AuthService";
import { Popover, List, ListItem } from "@mui/material";
import { MenuContext } from "../../../context/MenuContext";
import { FiMoon, FiSun, FiMail, FiBell, FiUser } from "react-icons/fi";

const Navbar = () => {
  const { toggleMenu, isDarkMode, toggle_background } = useContext(MenuContext);

  const [mailAnchorEl, setMailAnchorEl] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const handleMailClick = (event) => {
    setMailAnchorEl(event.currentTarget);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleUserClick = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMailAnchorEl(null);
    setNotificationAnchorEl(null);
    setUserAnchorEl(null);
  };

  const handleLogout = async () => {
    AuthService.handleLogout();
  };

  return (
    <nav className="bg-gray-900 text-white  w-full flex items-center justify-between px-2 py-3 md:px-2">
      <div className="flex items-center">
        <div
          className="w-8 h-8 bg-gray-600 flex p-2 rounded-full mr-3 focus:bg-gray-400 hover:bg-gray-500"
          onClick={toggleMenu}
        >
          <MdMenu />
        </div>

        <div className="text-lg font-bold pl-2"> </div>
      </div>

      <div className="flex items-center">
        <button
          className="flex items-center justify-center h-10 w-10 rounded-full text-gray-400 hover:text-white transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          onClick={toggle_background}
        >
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </button>

        <button
          className="flex items-center justify-center ml-4 h-10 w-10 rounded-full text-gray-400 hover:text-white transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          onClick={handleMailClick}
        >
          <FiMail />
        </button>

        <button
          className="flex items-center justify-center ml-4 h-10 w-10 rounded-full text-gray-400 hover:text-white transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          onClick={handleNotificationClick}
        >
          <FiBell />
        </button>

        <button
          className="flex items-center justify-center ml-4 h-10 w-10 rounded-full text-gray-400 hover:text-white transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          onClick={handleUserClick}
        >
          <FiUser />
        </button>
        <button className="flex items-center justify-center ml-4 h-10 w-10">
          {" "}
        </button>

        <Popover
          onClose={handleClose}
          anchorEl={mailAnchorEl}
          open={Boolean(mailAnchorEl)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <List>
            <ListItem>Mail 1</ListItem>
            <ListItem>Mail 2</ListItem>
          </List>
        </Popover>

        <Popover
          onClose={handleClose}
          anchorEl={notificationAnchorEl}
          open={Boolean(notificationAnchorEl)}
          PaperProps={{ style: { maxHeight: "300px", overflowY: "auto" } }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <List>
            {Array.from(Array(20).keys()).map((index) => (
              <ListItem key={index}>Notification {index}</ListItem>
            ))}
          </List>
        </Popover>

        <Popover
          onClose={handleClose}
          anchorEl={userAnchorEl}
          open={Boolean(userAnchorEl)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <List sx={{ width: 200 }}>
            <ListItem className="hover:bg-gray-200 ">
              <FaUserAlt className="mr-3 rounded-xl bg-gray-200 hover:bg-white p-1 w-6 h-6" />{" "}
              Profile
            </ListItem>

            <ListItem
              className="hover:bg-gray-200 cursor-pointer"
              onClick={handleLogout}
            >
              <TbLogout className="mr-3 rounded-xl bg-gray-200 p-1 hover:bg-white w-6 h-6" />{" "}
              Logout
            </ListItem>
          </List>
        </Popover>
      </div>
    </nav>
  );
};

export default Navbar;
