import React, { useState } from "react";

import { Box, Tabs, Tab } from "@mui/material";
import Mail from "./Mail";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Panel() {
  const [panel, setPanel] = useState(0);

  const handleChange = (event, newValue) => {
    setPanel(newValue);
  };

  return (
    <>
      <Box>
        <Tabs
          value={panel}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Main" {...a11yProps(0)} />
          <Tab label="Social Media" {...a11yProps(1)} />
          <Tab label="Advertisment" {...a11yProps(2)} />
        </Tabs>
        ;
      </Box>
      <TabPanel value={"Main"} index={0}>
        Main
      </TabPanel>
      <TabPanel value={"Socail Media"} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={"Advertisment"} index={2}>
        Item Three
      </TabPanel>
    </>
  );
}

export default function Postbox({ children, showSideBar }) {
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
      {showSideBar && <Panel />}
      <Mail />
      <Mail />
    </Box>
  );
}
