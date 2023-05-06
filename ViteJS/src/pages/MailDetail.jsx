import React, { useEffect, useState } from "react";
import { Box, Fab, Typography } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useLocation } from "react-router-dom";

export default function MailDetail() {
  const [data, setData] = useState({});
  const { state } = useLocation();

  const handleDelete = () => {};

  const handleSpam = () => {};

  const handleStar = () => {};

  useEffect(() => {
    const dataFetch = async () => {
      const data = (
        await fetch(
          `https://mailify-server.onrender.com/api/mail/${state.id}`,
          {
            method: "GET",
          }
        )
      )
        .json()
        .then((res) => {
          setData(res.mail);
        });
    };
    dataFetch();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        color: "#000",
        height: {
          xs: "auto",
          md: "100vh",
        },
        minHeight: {
          xs: "100vh",
          md: "100vh",
        },
        padding: {
          xs: "20px 8px",
          md: "unset",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginInline: "20px",
        }}
      >
        <Box sx={{ cursor: "default" }}>
          <Typography variant="h6" color="initial">
            From: {data.sender}
          </Typography>
          <Typography variant="h6" color="initial">
            To:{" "}
            {data.receivers?.map((item) => {
              return item;
            })}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Fab onClick={handleDelete}>
            <DeleteIcon />
          </Fab>
          <Fab onClick={handleSpam}>
            <ReportIcon />
          </Fab>
          <Fab onClick={handleStar}>
            <StarOutlineIcon />
          </Fab>
        </Box>
      </Box>
      <Box sx={{ alignSelf: "center" }}>
        <Typography variant="h3" color="initial" textAlign={"center"}>
          {data.title}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
      </Box>
    </Box>
  );
}
