import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function MailDetail() {
  const [data, setData] = useState({});
  const { state } = useLocation();

  useEffect(() => {
    const dataFetch = async () => {
      const data = (
        await fetch(`/api/mail/${state.id}`, {
          method: "GET",
        })
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
      <Box sx={{ marginLeft: "20px", cursor: "default" }}>
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
      <Box sx={{ alignSelf: "center" }}>
        <Typography variant="h3" color="initial" textAlign={"center"}>
          {data.title}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
      </Box>
    </Box>
  );
}
