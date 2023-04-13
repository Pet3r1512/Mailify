import { Box, Button, Typography } from "@mui/material";

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

export default function NewMailButton() {
  return (
    <Button
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
      }}
    >
      <Box display={"flex"} gap={"6px"} alignItems={"center"}>
        <DriveFileRenameOutlineIcon fontSize={"large"} />
        <Typography
          variant="body1"
          display={"flex"}
          fontWeight={700}
          color="inherit"
          alignItems={"center"}
        >
          New Mail
        </Typography>
      </Box>
    </Button>
  );
}
