import { Box, Button, Checkbox, Typography } from "@mui/material";
import React from "react";

export default function Mail() {
  return (
    <Button
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
          John at Taskade
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
              textAlign: {
                xs: "left",
                lg: "unset",
              },
            }}
          >
            AI Chat, Schedule Templates, SAML & SCIM AI Chat
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
            Hi Taskaders! 👋 We're thrilled to bring you another round of
            exciting updates to speed up your workflow. Give it a spin and let
            us know what you think! 🤖 💬 AI Chat is here! Upgrade your
            productivity with our new AI Chat assistant that lives inside your
            workspace dashboard. Generate task lists, mind maps, workflows, and
            much more. AI Chat for teams is coming next to your project chats!
            Learn more.
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
          Apr 13
        </Typography>
      </Box>
    </Button>
  );
}
