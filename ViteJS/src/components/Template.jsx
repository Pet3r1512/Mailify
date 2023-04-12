import React from "react";

import MenuIcon from "@mui/icons-material/Menu";

import {
  Box,
  Link,
  Tooltip,
  TextField,
  Avatar,
  FormControl,
  FilledInput,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

function Head() {
  return (
    <Box
      display={"flex"}
      gap={"0 30px"}
      alignItems={"center"}
      justifyContent={"space-around"}
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
        </Tooltip>

        <Link href="/inbox">
          <img srcSet="/images/mailify.png 2.8x" alt="" />
        </Link>
      </Box>
      {/* Middle - Search bar */}
      <Box display={"flex"} flex={1} maxWidth={"50%"} justifyContent={"start"}>
        <FormControl fullWidth>
          <OutlinedInput
            style={{
              padding: "0 10 px",
            }}
            id="outlined-adornment-amount"
            startAdornment={
              <InputAdornment position="start">
                <Tooltip title="Search">
                  <SearchIcon />
                </Tooltip>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <Tooltip title="Add filter">
                  {/* <Button style={{ padding: 0, width: "24px" }}> */}
                  <FilterListIcon />
                  {/* </Button> */}
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
        justifyContent={"flex-end"}
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
          <Avatar sx={{ bgcolor: "#d98d87" }}>P</Avatar>
        </Tooltip>
      </Box>
    </Box>
  );
}

function Template({ children }) {
  return (
    <Box>
      <Head />
    </Box>
  );
}

export default Template;
