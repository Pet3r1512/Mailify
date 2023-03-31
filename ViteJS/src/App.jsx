import React from "react";
import Home from "./pages/home";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f43f5e",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="bg-white">
        <Home />
      </div>
    </ThemeProvider>
  );
}
