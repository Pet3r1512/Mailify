import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  InputAdornment,
  FormControl,
  OutlinedInput,
  IconButton,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    await sleep(200);
    await fetch("http://localhost:8080/api", {
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
          setIsLoading(false);
          return navigate("/");
        }
      });
  };

  if (isLoading) return <CircularProgress />;

  return (
    <form
      className="flex flex-col gap-y-4 w-[600px] mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Full Name */}
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password" color="inputColor">
          Full Name
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          fullWidth
          color="inputColor"
          label="Full Name"
          {...register("fullname")}
        />
      </FormControl>
      {/* Phone Number */}
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password" color="inputColor">
          Phone Number
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          fullWidth
          color="inputColor"
          type="tel"
          pattern="0[0-9]{9}"
          label="Phone Number"
          {...register("phonenumber")}
        />
      </FormControl>
      {/* Username - Email Address */}
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password" color="inputColor">
          Username
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          fullWidth
          color="inputColor"
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
