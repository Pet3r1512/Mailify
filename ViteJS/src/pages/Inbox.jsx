import React, { useEffect } from "react";

import { Box } from "@mui/material";
import Tab from "../components/Tab";
import Template from "../components/Template";
import { useNavigate } from "react-router-dom";

function Inbox() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem("TOKEN") ? navigate("/inbox") : navigate("/signin");
  }, []);

  return (
    <Box height={"100vh"}>
      <Tab name={"Inbox"} />
      <Box
        height={"100%"}
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
