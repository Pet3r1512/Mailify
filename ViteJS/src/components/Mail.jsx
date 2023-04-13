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
        }}
        display={"flex"}
        gap={"10px"}
        alignItems={"center"}
      >
        <Checkbox sx={{ padding: 0 }} />
        <Typography
          noWrap
          sx={{ width: "150px", fontSize: "15px" }}
          color="common.black"
        >
          John at Taskade
        </Typography>
        <Box
          display="flex"
          marginTop={"1.5px"}
          flex={1}
          gap={"10px"}
          alignItems={"center"}
        >
          <Typography
            width={"fit-content"}
            variant="caption"
            color="common.black"
          >
            AI Chat, Schedule Templates, SAML & SCIM AI Chat
          </Typography>
          <Typography
            display={"inline-block"}
            flex={1}
            width={"500px"}
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
          marginRight={"10px"}
          textAlign={"right"}
          width={"100px"}
          variant="body1"
          color="initial"
        >
          Apr 13
        </Typography>
      </Box>
    </Button>
  );
}
