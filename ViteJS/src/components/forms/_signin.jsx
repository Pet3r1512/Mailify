import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  InputAdornment,
  FormControl,
  OutlinedInput,
  IconButton,
  InputLabel,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await sleep(200);
    await fetch("http://localhost:8080/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.success === true) {
          return navigate("/");
        }
      });
  };

  return (
    <form
      className="flex flex-col gap-y-4 w-[600px] mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Username - Email Address */}
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password" color="inputColor">
          Username
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          fullWidth
          color="inputColor"
          type="text"
          endAdornment={
            <InputAdornment position="start">@mailify.com</InputAdornment>
          }
          label="Username"
          {...register("username")}
        />
      </FormControl>
      {/* Password */}
      <FormControl variant="outlined" color="inputColor">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          {...register("password")}
        />
      </FormControl>
      <button className="btn btn-active btn-primary text-white">
        <input type="submit" />
      </button>
    </form>
  );
}
