import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, redirect } from "react-router-dom";
import {
  InputAdornment,
  FormControl,
  OutlinedInput,
  IconButton,
  InputLabel,
  Button,
  Input,
  FormHelperText,
  Typography,
  CircularProgress,
} from "@mui/material";
import { VisibilityOff, Visibility, SendSharp } from "@mui/icons-material";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmit, setIsSubmit] = useState("");
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [signinError, setSigninError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const navigate = useNavigate();

  const checkCapsLock = (event) => {
    if (event.getModifierState("CapsLock")) {
      setIsCapsLockOn(true);
    } else {
      setIsCapsLockOn(false);
    }
  };

  const onSubmit = async (data) => {
    await sleep(200);
    setIsSubmit(true);
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
          localStorage.setItem("TOKEN", res.accessToken);
          setIsSubmit(false);
          setSigninError(true);
          return navigate("/inbox");
        } else {
          setIsSubmit(false);
          setSigninError(false);
          setErrorMessage(res.message);
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
                {!showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          {...register("password")}
        />
        {isCapsLockOn && (
          <FormHelperText error>
            <Typography color="warning">CapsLock is on!</Typography>
          </FormHelperText>
        )}
        {!signinError && errorMessage && (
          <FormHelperText error>
            <Typography>{errorMessage}</Typography>
          </FormHelperText>
        )}
      </FormControl>
      <Button
        variant="contained"
        type="submit"
        color="primary"
        endIcon={isSubmit ? <></> : <SendSharp />}
      >
        <Input
          type="submit"
          disableUnderline={true}
          style={{
            color: "#fff",
            fontWeight: "600",
          }}
        />
        {isSubmit && signinError === false ? (
          <CircularProgress
            size={20}
            style={{
              color: "#fff",
              marginLeft: "5px",
            }}
          />
        ) : (
          <></>
        )}
      </Button>
    </form>
  );
}
