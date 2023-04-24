import React from "react";
import {
  ListItemButton,
  ListItemIcon,
  Divider,
  ListItemText,
  Button,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import { sideBarMainFunc, sideBarExpandFunc } from "./Sidebar";

export default function DrawerSidebar({ currentListItem, setCurrentListItem }) {
  return (
    <div
      style={{ width: 250, padding: "10px 0 0 10px" }}
      onClick={() => setOpen(false)}
    >
      <img srcSet="/images/mailify.png 4x" alt="" />

      <Divider
        sx={{
          margin: "10px 0",
        }}
      />
      <Button
        sx={{
          fontWeight: 700,
          fontSize: 16,
          color: "black",
          bgcolor: "#d9d9d9",
          borderRadius: "12px",
          marginLeft: "auto",
        }}
      >
        New Mail
      </Button>
      <Divider
        sx={{
          margin: "10px 0",
        }}
      />
      {sideBarMainFunc.map((item, index) => (
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
      ))}
      <Divider
        sx={{
          margin: "10px 0",
        }}
      />
      {sideBarExpandFunc.map((item, index) => (
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
      ))}
      <Divider
        sx={{
          margin: "10px 0",
        }}
      />
      <ListItemButton
        onClick={() => {
          setCurrentListItem("setting");
        }}
        sx={{
          bgcolor: `${currentListItem === "setting" ? "#dee2e6" : ""}`,
          borderRadius: "0 10px 10px 0",
          "&:hover": {
            bgcolor: "#dee2e6",
          },
        }}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Setting" />
      </ListItemButton>
    </div>
  );
}
