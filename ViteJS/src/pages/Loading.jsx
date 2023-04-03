import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loading({ children }) {
  return (
    <Box
      height={"100vh"}
      color={"common.white"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <CircularProgress />
      <Typography variant="h6" color="initial" marginTop={"8px"}>
        Hang on! It might take a few seconds...
      </Typography>
    </Box>
  );
}
