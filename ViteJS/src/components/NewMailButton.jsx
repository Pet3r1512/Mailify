import React, { useState } from "react";
import { Box, Button, Typography, Backdrop } from "@mui/material";

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

export default function NewMailButton({ showEditor, setShowEditor }) {
  return (
    <Button
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
      }}
      onClick={() => {
        setShowEditor(!showEditor);
      }}
    >
      <Box display={"flex"} gap={"6px"} alignItems={"center"}>
        <DriveFileRenameOutlineIcon fontSize={"large"} />
        <Typography
          variant="body1"
          display={"flex"}
          fontWeight={700}
          color="inherit"
          alignItems={"center"}
        >
          New Mail
        </Typography>
      </Box>
    </Button>
  );
}
