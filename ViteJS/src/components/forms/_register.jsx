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
  FormHelperText,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmit, setIsSubmit] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const checkCapsLock = (event) => {
    if (event.getModifierState("CapsLock")) {
      setIsCapsLockOn(true);
    } else {
      setIsCapsLockOn(false);
    }
  };

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
        console.log(res);
        if (res.success === true) {
          setIsSubmit("success");
          sleep(1000);
          navigate("/");
        } else {
          setIsFailed(true);
          setTimeout(() => {
            setIsFailed(false);
          }, 1200);
        }
      });
  };

  return (
    <>
      <form
        className="flex flex-col gap-y-4 sm:w-[600px] mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Full Name */}
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" color="inputColor">
            Full Name
          </InputLabel>
          <OutlinedInput
            name="fullname"
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
            name="phonenumber"
            fullWidth
            required
            color="inputColor"
            type="tel"
            error={errors.phonenumber}
            label="Phone Number"
            {...register("phonenumber", {
              pattern: /0[0-9]{9}/,
            })}
          />
          {errors.phonenumber && errors.phonenumber.type === "pattern" && (
            <FormHelperText error>
              Your phone number must start with 0 and contains 10 digits
            </FormHelperText>
          )}
        </FormControl>
        {/* Username - Email Address */}
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" color="inputColor">
            Username
          </InputLabel>
          <OutlinedInput
            name="username"
            fullWidth
            required
            error={errors.username}
            color="inputColor"
            endAdornment={
              <InputAdornment position="start">@mailify.com</InputAdornment>
            }
            label="Username"
            {...register("username", {
              maxLength: 30,
              pattern: /^[a-zA-Z0-9.]*$/,
            })}
          />
          {errors.username && errors.username.type === "maxLength" && (
            <FormHelperText error>Your username is too long!</FormHelperText>
          )}
          {errors.username && errors.username.type === "pattern" && (
            <FormHelperText error>
              Your username contains invalid characters!
            </FormHelperText>
          )}
        </FormControl>
        {/* Password */}
        <FormControl variant="outlined" color="inputColor">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            name="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            error={errors.password}
            onKeyUp={checkCapsLock}
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
            {...register("password", {
              minLength: 8,
            })}
          />
          {errors.password && errors.password.type === "minLength" && (
            <FormHelperText error>
              Password must have at least 8 characters
            </FormHelperText>
          )}
          {isCapsLockOn && (
            <FormHelperText error>Warning: CapsLock is on!</FormHelperText>
          )}
        </FormControl>
        <button className="btn btn-active btn-primary text-white">
          <input type="submit" />
        </button>
      </form>
      {isFailed && (
        <Alert
          style={{
            position: "absolute",
            bottom: "5px",
            left: "5px",
          }}
          severity="error"
        >
          Username or phone number is existed!
        </Alert>
      )}
    </>
  );
}
