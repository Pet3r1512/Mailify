import { Box, Button, Checkbox, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function convertDate(date) {
  const currentDate = new Date().toISOString().substring(0, 10);
  if (date.substring(0, 10) === currentDate) {
    return "Today";
  } else return date.substring(0, 10);
}

export default function Mail({ sender, title, content, sentAt, id }) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        navigate(`/mail/${id}`, {
          state: {
            id: id,
          },
        });
      }}
      sx={{
        cursor: "pointer",
        borderRadius: "12px",
        maxWidth: "100%",
        width: "100%",
        ":hover": { backgroundColor: "#d9d9d8" },
      }}
    >
      <Box
        sx={{
          maxWidth: "100%",
          width: "100%",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: {
            xs: "start",
            sm: "center",
          },
        }}
        display={"flex"}
        gap={"10px"}
      >
        <Checkbox sx={{ padding: 0 }} />
        <Typography
          noWrap
          sx={{
            width: {
              sm: "120px",
              lg: "150px",
            },
            display: {
              sm: "block",
              lg: "unset",
            },
            fontSize: "15px",
          }}
          color="common.black"
        >
          {sender}
        </Typography>
        <Box
          sx={{
            flexDirection: {
              xs: "column",
              lg: "row",
            },
            alignItems: {
              xs: "start",
              lg: "center",
            },
            maxWidth: {
              xs: "320px",
              sm: "unset",
              lg: "100%",
            },
          }}
          display="flex"
          marginTop={"1.8px"}
          flex={1}
          gap={"10px"}
          // alignItems={"center"}
        >
          <Typography
            // width={"fit-content"}
            variant="caption"
            noWrap
            color="common.black"
            sx={{
              flex: {
                sm: 1,
                lg: "unset",
              },
              marginTop: "1.4px",
              width: {
                xs: "100%",
                lg: "fit-content",
              },
              maxWidth: "250px",
              textAlign: {
                xs: "left",
                lg: "unset",
              },
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              width: {
                xs: "300px",
                lg: "500px",
              },
              flex: {
                sm: 1,
              },
            }}
            display={"inline-block"}
            flex={1}
            variant="body2"
            color="initial"
            noWrap
          >
            {content.replace(/<[^>]*>/g, "")}
          </Typography>
        </Box>
        <Typography
          sx={{
            width: {
              sm: "50px",
              lg: "100px",
            },
            marginRight: {
              xs: 0,
              md: "10px",
            },
            marginLeft: {
              xs: "auto",
              sm: "unset",
            },
          }}
          textAlign={"right"}
          variant="body1"
          color="initial"
        >
          {convertDate(sentAt)}
        </Typography>
      </Box>
    </Button>
  );
}
