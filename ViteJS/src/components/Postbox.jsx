import React from "react";

import { Box } from "@mui/material";
import Mail from "./Mail";

export default function Postbox({ children }) {
  return (
    <Box
      borderRadius={5}
      flex={1}
      display={"flex"}
      flexDirection={"column"}
      gap={"5px"}
      overflow={"auto"}
      padding={"15px"}
      style={{
        backgroundColor: "#fff",
      }}
    >
      <Mail />
      <Mail />
    </Box>
  );
}
