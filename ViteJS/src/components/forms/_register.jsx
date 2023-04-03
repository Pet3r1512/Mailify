import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  InputAdornment,
  FormControl,
  OutlinedInput,
  IconButton,
  InputLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmit, setIsSubmit] = useState("");

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
    setIsSubmit("on");
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
          setIsSubmit("success");
          sleep(400);
          return navigate("/");
        }
      });
  };

  return (
    <>
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
            required
            color="inputColor"
            label="Full Name"
            {...register("fullname", {
              pattern: /[A-Za-z]{3}/,
            })}
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
            required
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
            required
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
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
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
      {isSubmit && (
        <Alert
          style={{
            position: "absolute",
            bottom: "5px",
            left: "5px",
          }}
          severity="success"
        >
          Create new account successfully!!!
        </Alert>
      )}
    </>
  );
}
