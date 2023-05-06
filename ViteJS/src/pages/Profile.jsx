import { Box } from "@mui/material";
import React from "react";

import Tab from "../components/Tab";

export default function Profile() {
  return (
    <Box height={"100vh"}>
      <Tab name={"Profile"} />
      <Box
        height={"100%"}
        overflow={"hidden"}
        style={{
          backgroundColor: "#d9d9d9",
        }}
      >
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "#fff",
          }}
        >
          <img srcSet="/images/mailify.png 2.8x" alt="" />
        </Box>
      </Box>
    </Box>
  );
}
