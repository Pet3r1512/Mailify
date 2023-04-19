import React, { useEffect } from "react";

import { Box } from "@mui/material";
import { Tab, Template } from "../components";

function Inbox() {
  return (
    <Box height={"100vh"}>
      <Tab name={"Inbox"} />
      <Box
        height={"100vh"}
        overflow={"hidden"}
        style={{
          backgroundColor: "#d9d9d9",
        }}
      >
        <Template />
      </Box>
    </Box>
  );
}

export default Inbox;
