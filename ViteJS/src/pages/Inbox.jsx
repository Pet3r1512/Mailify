import React, { createContext, useState } from "react";

import { Box } from "@mui/material";
import { Tab, Template } from "../components";
import { ThemeContext } from "@emotion/react";

function Inbox() {
  return (
    <>
      {/* <ThemeContext.Provider value={[showSideBar, setShowSideBar]}> */}
      <Tab name={"Inbox"} />
      <Box
        height={"100vh"}
        style={{
          backgroundColor: "#d9d9d9",
        }}
      >
        <Template />
      </Box>
      {/* </ThemeContext.Provider> */}
    </>
  );
}

export default Inbox;
