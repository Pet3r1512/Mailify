import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  Drawer,
  Dialog,
  Slide,
  Typography,
  Alert,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "./Sidebar";
import Postbox from "./Postbox";
import DrawerSidebar from "./DrawerSidebar";

import "suneditor/dist/css/suneditor.min.css";
import MailEditor from "./MailEditor";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function Head({ showSideBar, setShowSideBar, setShowDrawer }) {
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToProfilePage = () => {
    navigate(`/user/profile`, {
      state: { username: localStorage.getItem("thisUsername") },
    });
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
              if (window.innerWidth > 768) {
                setShowSideBar(!showSideBar);
              } else {
                setShowDrawer(true);
              }
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

        <Link
          sx={{
            display: {
              xs: "none",
              lg: "unset",
            },
          }}
          href="/inbox"
        >
          <img srcSet="/images/mailify.png 4x" alt="" />
        </Link>
      </Box>
      {/* Middle - Search bar */}
      <Box
        sx={{
          maxWidth: {
            xs: "100%",
            sm: "50%",
          },
        }}
        display={"flex"}
        flex={1}
        justifyContent={"start"}
      >
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
        sx={{
          width: {
            xs: "40px",
            sm: "25%",
          },
          flex: {
            xs: 0,
            sm: 1,
          },
        }}
        display={"flex"}
        // flex={1}
        justifyContent={"flex-end"}
        alignItems={"center"}
        gap={"8px"}
        color="common.black"
      >
        <Tooltip title="Help">
          <HelpOutlineRoundedIcon
            sx={{
              display: {
                xs: "none",
                sm: "unset",
              },
              width: {
                xs: 0,
                sm: "unset",
              },
            }}
            fontSize={"large"}
          />
        </Tooltip>
        <Tooltip title="Settings">
          <SettingsIcon
            sx={{
              display: {
                xs: "none",
                sm: "unset",
              },
            }}
            fontSize={"large"}
          />
        </Tooltip>
        <Tooltip title="Profile">
          <Avatar onClick={handleClick} sx={{ bgcolor: "#d98d87" }}>
            {localStorage
              .getItem("User")
              ?.toString()
              .split(" ")
              .slice(-1)[0]
              .slice(0, 1)
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")}
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
          <MenuItem onClick={goToProfilePage}>Profile</MenuItem>
          <MenuItem
            color="primary"
            onClick={() => {
              localStorage.removeItem("TOKEN");
              localStorage.removeItem("User");
              localStorage.removeItem("thisUsername");
              navigate("/");
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
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentListItem, setCurrentListItem] = useState("Recieved");
  const [open, setOpen] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [notice, setNotice] = useState("");
  const [type, setType] = useState("inbox");

  useEffect(() => {
    setTimeout(() => {
      setNotice("");
    }, 2500);
  }, [notice]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      flex={1}
      sx={{
        marginBottom: {
          xs: "10px",
          lg: "unset",
        },
        maxHeight: {
          xs: "90vh",
          sm: "100vh",
        },
        minHeight: "100%",
      }}
    >
      <Head
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
        setShowDrawer={setShowDrawer}
        open={open}
        setOpen={setOpen}
      />
      <Drawer
        open={showDrawer}
        anchor={"left"}
        onClose={() => setShowDrawer(false)}
      >
        <DrawerSidebar
          openDrawer={open}
          setOpenDrawer={setOpen}
          type={type}
          setType={setType}
          showEditor={showEditor}
          setShowEditor={setShowEditor}
          setCurrentListItem={setCurrentListItem}
          open={open}
          setOpen={setOpen}
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
        />
      </Drawer>
      <Box
        sx={{
          padding: {
            sm: "10px",
            lg: `20px 20px 20px ${!showSideBar ? "0" : "20px"}`,
          },
          maxHeight: "100%",
        }}
        flex={1}
        display={"flex"}
        gap={"8px"}
        overflow={"auto"}
      >
        <Sidebar
          currentListItem={currentListItem}
          setCurrentListItem={setCurrentListItem}
          showSideBar={showSideBar}
          setShowSideBar={setShowSideBar}
          open={open}
          setOpen={setOpen}
          showEditor={showEditor}
          setShowEditor={setShowEditor}
          type={type}
          setType={setType}
        />
        <Postbox type={type} setType={setType} />
      </Box>
      <Dialog
        sx={{
          height: "100%",
        }}
        open={showEditor}
        onClose={() => {
          setShowEditor(false);
        }}
        TransitionComponent={Transition}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: "10px",
            borderRadius: "10px",
          }}
        >
          <Typography
            sx={{ cursor: "default" }}
            variant="subtitle1"
            color="initial"
          >
            New Mail
          </Typography>
          <Tooltip title="Close">
            <IconButton
              sx={{
                marginLeft: "auto",
              }}
              edge="start"
              color="inherit"
              onClick={() => {
                setShowEditor(!showEditor);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <MailEditor
          showEditor={setShowEditor}
          setShowEditor={setShowEditor}
          notice={notice}
          setNotice={setNotice}
        />
      </Dialog>
      {notice === "" ? (
        <></>
      ) : notice === "Successful mailing" ? (
        <Alert severity="success">Successful mailing</Alert>
      ) : (
        <Alert severity="error">Sending mail has failed</Alert>
      )}
    </Box>
  );
}

export default Template;
