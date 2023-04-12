import React from "react";

import { Box } from "@mui/material";
import { Tab, Template } from "../components";

function Inbox() {
  return (
    <>
      <Tab name={"Inbox"} />
      <Box height={"100vh"}>
        <Template />
      </Box>
    </>
  );
}

export default Inbox;
