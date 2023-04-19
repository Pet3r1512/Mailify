import React, { useState } from "react";
import { useNavigate, redirect } from "react-router-dom";

import {
  Box,
  Link,
  Tooltip,
  Avatar,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import Postbox from "./Postbox";

function Head({ showSideBar, setShowSideBar }) {
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      gap={"30px"}
      padding={"0 20px"}
      style={{
        backgroundColor: "#d9d9d9",
      }}
    >
      {/* Left */}
      <Box
        display={"flex"}
        gap={"16px"}
        alignItems={"center"}
        height={"80px"}
        width={"fit-content"}
      >
        <Tooltip title="Menu">
          <IconButton
            aria-label="toggle password visibility"
            onClick={() => {
              setShowSideBar(!showSideBar);
            }}
            edge="end"
          >
            <MenuIcon
              style={{
                color: "#000",
                fontWeight: 700,
                position: "relative",
                top: "-2.8px",
              }}
              fontSize={"large"}
              height={"40px"}
            />
          </IconButton>
        </Tooltip>

        <Link href="/inbox">
          <img srcSet="/images/mailify.png 4x" alt="" />
        </Link>
      </Box>
      {/* Middle - Search bar */}
      <Box display={"flex"} flex={1} maxWidth={"50%"} justifyContent={"start"}>
        <FormControl
          fullWidth={isSearchBarFocused ? true : false}
          style={{
            transition: "all",
            transitionDuration: 2000,
          }}
        >
          <OutlinedInput
            onFocus={() => {
              setIsSearchBarFocused(true);
            }}
            onBlur={() => {
              setIsSearchBarFocused(false);
            }}
            style={{
              padding: "0 10 px",
            }}
            placeholder="Search for mails"
            id="outlined-adornment-amount"
            startAdornment={
              <InputAdornment position="start">
                <Tooltip title="Search">
                  <SearchIcon
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <Tooltip title="Add filter">
                  <FilterListIcon
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      {/* Right - User's setting */}
      <Box
        display={"flex"}
        width={"25%"}
        flex={1}
        justifyContent={"flex-end"}
        alignItems={"center"}
        gap={"8px"}
        color="common.black"
      >
        <Tooltip title="Help">
          <HelpOutlineRoundedIcon fontSize={"large"} />
        </Tooltip>
        <Tooltip title="Settings">
          <SettingsIcon fontSize={"large"} />
        </Tooltip>
        <Tooltip title="Profile">
          <Avatar onClick={handleClick} sx={{ bgcolor: "#d98d87" }}>
            P
          </Avatar>
        </Tooltip>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.removeItem("TOKEN");
              redirect("/");
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

function Template({ children }) {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <Box display={"flex"} flexDirection={"column"} height={"100%"}>
      <Head showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <Box
        display={"flex"}
        padding={`20px 20px 20px ${!showSideBar ? "0" : "20px"}`}
        gap={"8px"}
        overflow={"auto"}
      >
        <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        <Postbox />
      </Box>
    </Box>
  );
}

export default Template;
