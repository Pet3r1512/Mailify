import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  CheckBoxOutlineBlankOutlined,
  DraftsOutlined,
  HomeOutlined,
  InboxOutlined,
  MailOutline,
  ReceiptOutlined,
} from "@mui/icons-material";
import Sidebar from "./Sidebar";

const data = [
  {
    name: "Home",
    icon: <HomeOutlined />,
  },
  { name: "Inbox", icon: <InboxOutlined /> },
  { name: "Outbox", icon: <CheckBoxOutlineBlankOutlined /> },
  { name: "Sent mail", icon: <MailOutline /> },
  { name: "Draft", icon: <DraftsOutlined /> },
  { name: "Trash", icon: <ReceiptOutlined /> },
];

export default function DrawerSidebar() {
  return (
    <div
      style={{ width: 250, padding: "10px 0 0 10px" }}
      onClick={() => setOpen(false)}
    >
      <img srcSet="/images/mailify.png 4x" alt="" />
      {data.map((item, index) => (
        <ListItem button key={index}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </div>
  );
}
