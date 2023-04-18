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

function SideBarList() {
  const [open, setOpen] = useState(true);
  const [currentListItem, setCurrentListItem] = useState("Recieved");

  const handleClick = () => {
    setOpen(!open);
  };

  const mainFunc = sideBarMainFunc.map((item) => {
    return (
      <ListItemButton
        onClick={() => {
          setCurrentListItem(item.text);
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
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={open ? "Shorter" : "More"} />
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

export default function Sidebar({ children, showSideBar, setShowSideBar }) {
  const style = {
    width: "100%",
  };

  return (
    <Box
      width={"200px"}
      sx={{ height: "100%" }}
      display={showSideBar ? "none" : "flex"}
      paddingLeft={"20px"}
      flexDirection={"column"}
      gap={"20px"}
      alignItems={"start"}
      style={{
        backgroundColor: "#d9d9d9",
      }}
    >
      <NewMailButton />
      <Box width={"100%"}>
        <SideBarList />
      </Box>
    </Box>
  );
}

const sideBarMainFunc = [
  {
    text: "Recieved",
    icon: <MarkunreadMailboxIcon />,
  },
  {
    text: "Sent",
    icon: <SendIcon />,
  },
  {
    text: "Drafts",
    icon: <DraftsIcon />,
  },
  {
    text: "Starred",
    icon: <StarBorder />,
  },
];

const sideBarExpandFunc = [
  {
    text: "Important",
    icon: <LabelImportantIcon />,
  },
  {
    text: "Spam",
    icon: <ReportGmailerrorredIcon />,
  },
  {
    text: "Deleted",
    icon: <DeleteIcon />,
  },
];
