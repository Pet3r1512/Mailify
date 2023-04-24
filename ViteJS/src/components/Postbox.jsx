import React, { useEffect, useState } from "react";

import { Box, Tabs, Tab, Tooltip, TablePagination } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import LabelIcon from "@mui/icons-material/Label";
import PeopleIcon from "@mui/icons-material/People";
import RefreshIcon from "@mui/icons-material/Refresh";

import data from "./mailsExample.json";
import Mail from "./Mail";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      color="#d9d9d9"
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
      <Box
        sx={{
          width: {
            xs: 0,
            sm: "unset",
          },
          display: {
            xs: "none",
            sm: "unset",
          },
        }}
        color="common.black"
        fontWeight={"bold"}
      >
        <Tabs
          value={panel}
          onChange={handleChange}
          // aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab
            icon={<InboxIcon />}
            iconPosition="start"
            label="Main"
            {...a11yProps(0)}
          />
          <Tab
            icon={<LabelIcon />}
            iconPosition="start"
            label="Social Media"
            {...a11yProps(1)}
          />
          <Tab
            icon={<PeopleIcon />}
            iconPosition="start"
            label="Advertisment"
            {...a11yProps(2)}
          />
        </Tabs>
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

export default function Postbox({ children }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);

  let pageContent = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  useEffect(() => {
    pageContent = data.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 30));
    setPage(0);
  }

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <Box
      borderRadius={5}
      display={"flex"}
      flex={1}
      flexGrow={1}
      flexDirection={"column"}
      overflow={"auto"}
      padding={"15px"}
      gap={"10px"}
      style={{
        backgroundColor: "#fff",
      }}
    >
      <Box
        display={"flex"}
        gap={"5px"}
        height={"fit-content"}
        color="common.black"
        justifyContent={"space-between"}
        padding={"0 10px"}
      >
        <Tooltip title="Refresh">
          <button onClick={refreshPage}>
            <RefreshIcon />
          </button>
        </Tooltip>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <Panel />
      <Box
        flex={1}
        flexGrow={1}
        overflow={"auto"}
        display={"flex"}
        gap={"5px"}
        flexDirection={"column"}
      >
        {pageContent.map((index, item) => {
          return <Mail key={index} />;
        })}
      </Box>
    </Box>
  );
}
