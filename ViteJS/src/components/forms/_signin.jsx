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
  Typography,
  FormHelperText,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [onBlueMessage, setOnBlueMessage] = useState("");

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

  const onBlurUsername = async (username) => {
    await sleep(200);
    await fetch("http://localhost:8080/api/checkUsername", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(username),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.success === true) {
          setOnBlueMessage("Correct Username");
        } else {
          setOnBlueMessage("Sw");
        }
      });
  };

  return (
    <form
      className="flex flex-col gap-y-4 sm:w-[600px] mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Username - Email Address */}
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password" color="inputColor">
          Username
        </InputLabel>
        <OutlinedInput
          fullWidth
          required
          id="username"
          color="inputColor"
          type="text"
          endAdornment={
            <InputAdornment position="start">@mailify.com</InputAdornment>
          }
          onBlur={(e) => {
            setUsername(e.target.value);
            onBlurUsername(username);
          }}
          label="Username"
          {...register("username")}
        />
        {onBlueMessage !== "" && (
          <FormHelperText>{onBlueMessage}</FormHelperText>
        )}
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
