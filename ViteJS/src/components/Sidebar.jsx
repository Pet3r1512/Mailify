import { Box } from "@mui/material";
import React from "react";
import NewMailButton from "./NewMailButton";

export default function Sidebar({ children, showSideBar, setShowSideBar }) {
  return (
    <Box
      width={"200px"}
      sx={{ height: "100%" }}
      display={showSideBar ? "none" : "flex"}
      paddingLeft={"20px"}
      flexDirection={"column"}
      alignItems={"start"}
      style={{
        backgroundColor: "#d9d9d9",
      }}
    >
      <NewMailButton />
    </Box>
  );
}
