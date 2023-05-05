import React, { useState } from "react";

import {
  Box,
  List,
  ListItemText,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import NewMailButton from "./NewMailButton";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";

function SideBarList({
  currentListItem,
  setCurrentListItem,
  open,
  setOpen,
  type,
  setType,
  isLoading,
  setIsLoading,
}) {
  const handleClick = () => {
    setOpen(!open);
  };

  const mainFunc = sideBarMainFunc.map((item) => {
    return (
      <ListItemButton
        onClick={() => {
          setCurrentListItem(item.text);
          setType(item.url);
        }}
        key={item.text}
        sx={{
          bgcolor: `${currentListItem === item.text ? "#dee2e6" : ""}`,
          borderRadius: "0 10px 10px 0",
          "&:hover": {
            bgcolor: "#dee2e6",
          },
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    );
  });

  const expandFunc = sideBarExpandFunc.map((item) => {
    return (
      <ListItemButton
        onClick={() => {
          setCurrentListItem(item.text);
          setType(item.url);
        }}
        sx={{
          pl: 4,
          bgcolor: `${currentListItem === item.text ? "#dee2e6" : ""}`,
          borderRadius: "0 10px 10px 0",
          "&:hover": {
            bgcolor: "#e9ecef",
          },
        }}
        key={item.text}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    );
  });

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        color: "#000",
        padding: "5px 5px 5px 0",
        borderRadius: "12px",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {mainFunc}
      <ListItemButton
        sx={{
          borderRadius: "0 10px 10px 0",
        }}
        onClick={handleClick}
      >
        <ListItemText primary={open ? "Less" : "More"} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {expandFunc}
        </List>
      </Collapse>
    </List>
  );
}

export default function Sidebar({
  children,
  showSideBar,
  setShowSideBar,
  open,
  setOpen,
  currentListItem,
  setCurrentListItem,
  showEditor,
  setShowEditor,
  type,
  setType,
  isLoading,
  setIsLoading,
}) {
  return (
    <Box
      width={"200px"}
      sx={{
        height: "100%",
        display: {
          xs: "none",
          lg: showSideBar ? "none" : "flex",
        },
      }}
      paddingLeft={"20px"}
      flexDirection={"column"}
      gap={"20px"}
      alignItems={"start"}
      style={{
        backgroundColor: "#d9d9d9",
      }}
    >
      <NewMailButton showEditor={showEditor} setShowEditor={setShowEditor} />
      <Box width={"100%"}>
        <SideBarList
          currentListItem={currentListItem}
          setCurrentListItem={setCurrentListItem}
          open={open}
          setOpen={setOpen}
          type={type}
          setType={setType}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </Box>
    </Box>
  );
}

export const sideBarMainFunc = [
  {
    text: "Recieved",
    icon: <MarkunreadMailboxIcon />,
    url: "inbox",
  },
  {
    text: "Sent",
    icon: <SendIcon />,
    url: "sent",
  },
  // {
  //   text: "Drafts",
  //   icon: <DraftsIcon />,
  //   url: "draft",
  // },
  // {
  //   text: "Starred",
  //   icon: <StarBorder />,
  //   url: "starred",
  // },
];

export const sideBarExpandFunc = [
  {
    text: "Important",
    icon: <LabelImportantIcon />,
    url: "important",
  },
  {
    text: "Spam",
    icon: <ReportGmailerrorredIcon />,
    url: "spam",
  },
  {
    text: "Deleted",
    icon: <DeleteIcon />,
    url: "deleted",
  },
];
