import {
  Typography,
  Box,
  Avatar,
  FormControl,
  Fab,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

import Tab from "../components/Tab";

export default function Profile() {
  const [user, setUser] = useState({});

  const state = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const dataFetch = async () => {
      const data = (
        await fetch(
          `https://mailify-server.onrender.com/api/user/${state.state.username}`,
          {
            method: "GET",
          }
        )
      )
        .json()
        .then((res) => {
          setUser(res.user);
        });
    };
    dataFetch();
  }, []);

  return (
    <Box height={"100vh"}>
      <Tab name={"Profile"} />
      <Box
        height={"100%"}
        overflow={"hidden"}
        style={{
          backgroundColor: "#d9d9d9",
        }}
      >
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "#fff",
          }}
        >
          <img srcSet="/images/mailify.png 2.8x" alt="" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff",
            marginBlock: "20px",
            maxWidth: "400px",
            marginInline: "auto",
            padding: "10px 15px",
            height: "87%",
            borderRadius: "15px",
          }}
        >
          <Box
            sx={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#d98d87",
                width: "60px",
                height: "60px",
                fontSize: "24px",
              }}
            >
              {localStorage
                .getItem("User")
                ?.toString()
                .split(" ")
                .slice(-1)[0]
                .slice(0, 1)
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")}
            </Avatar>
            <Typography sx={{ cursor: "default" }} variant="h6" color="initial">
              {localStorage.getItem("User")}
            </Typography>
          </Box>
          <Box sx={{ marginBlock: "20px" }}>
            <form
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  gap: "10px",
                  justifyContent: "space-between",
                }}
              >
                <FormControl variant="outlined">
                  <Typography variant="h6" sx={{ color: "#000" }}>
                    Username
                  </Typography>
                  <TextField
                    value={user.username}
                    disabled
                    // onChange={}
                  />
                </FormControl>
                <Fab
                  sx={{ marginTop: "30px" }}
                  size="medium"
                  color="inputColor"
                  aria-label="edit"
                >
                  <EditIcon />
                </Fab>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  gap: "10px",
                  justifyContent: "space-between",
                }}
              >
                <FormControl variant="outlined">
                  <Typography variant="h6" sx={{ color: "#000" }}>
                    Phone Number
                  </Typography>
                  <TextField
                    value={user.phonenumber}
                    disabled
                    // onChange={}
                  />
                </FormControl>
                <Fab
                  sx={{ marginTop: "30px" }}
                  size="medium"
                  w
                  color="inputColor"
                  aria-label="edit"
                >
                  <EditIcon />
                </Fab>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
