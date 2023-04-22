import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  InputAdornment,
  FormControl,
  OutlinedInput,
  IconButton,
  InputLabel,
  FormHelperText,
  Typography,
  Input,
  Button,
  CircularProgress,
} from "@mui/material";
import { VisibilityOff, Visibility, SendSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmit, setIsSubmit] = useState("");
  const [errorName, setErrorname] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);
  const [isCapsLockOnConfirm, setIsCapsLockOnConfirm] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState();

  const checkCapsLock = (event) => {
    if (event.getModifierState("CapsLock")) {
      setIsCapsLockOn(true);
    } else {
      setIsCapsLockOn(false);
    }
  };

  const checkCapsLockConfirm = (event) => {
    if (event.getModifierState("CapsLock")) {
      setIsCapsLockOnConfirm(true);
    } else {
      setIsCapsLockOnConfirm(false);
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
    setIsSubmit(true);
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
          setIsSubmit(false);
          navigate("/signin");
        } else {
          setIsFailed(true);
          setTimeout(() => {
            setIsFailed(false);
          }, 3000);
          setErrorname(res.message);
          if (res.message === "Confirm password does not match!") {
            setIsPasswordMatch(false);
          }
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
          <InputLabel
            htmlFor="outlined-adornment-password"
            color={errors.fullname ? "error" : "inputColor"}
          >
            Full Name
          </InputLabel>
          <OutlinedInput
            name="fullname"
            fullWidth
            required
            error={!!errors.fullname}
            color={errors.fullname ? "error" : "inputColor"}
            label="Full Name"
            {...register("fullname", {
              pattern:
                /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/gm,
            })}
          />
          {errors.fullname && errors.fullname.type === "pattern" && (
            <FormHelperText error>Invalid characters</FormHelperText>
          )}
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
            error={!!errors.phonenumber}
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
          {isFailed && errorName === "Phone number is existed!" && (
            <FormHelperText error>
              Phone number is already existed!
            </FormHelperText>
          )}
        </FormControl>
        {/* Username - Email Address */}
        <FormControl variant="outlined">
          <InputLabel
            htmlFor="outlined-adornment-password"
            color={isFailed ? "error" : "inputColor"}
          >
            Username
          </InputLabel>
          <OutlinedInput
            name="username"
            fullWidth
            required
            error={!!errors.username}
            color={isFailed ? `error` : "inputColor"}
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
          {isFailed && errorName === "Username is existed!" && (
            <FormHelperText error>Username is already existed!</FormHelperText>
          )}
        </FormControl>
        {/* Password */}
        <FormControl
          variant="outlined"
          color={errors.password ? "error" : "inputColor"}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            name="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            error={!!errors.password}
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
            <FormHelperText error>
              <Typography color="warning">CapsLock is on!</Typography>
            </FormHelperText>
          )}
        </FormControl>
        {/* Confirm password */}
        <FormControl
          variant="outlined"
          color={errors.confirm_password ? "error" : "inputColor"}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            name="confirm_password"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            required
            error={!!errors.confirm_password}
            onKeyUp={checkCapsLockConfirm}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                  edge="end"
                >
                  {!showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm password"
            {...register("confirm_password")}
          />
          {isCapsLockOnConfirm && (
            <FormHelperText error>
              <Typography color="warning">CapsLock is on!</Typography>
            </FormHelperText>
          )}
          {isPasswordMatch === false &&
            errorName === "Confirm password does not match!" && (
              <FormHelperText error>
                Confirm password does not match!
              </FormHelperText>
            )}
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={() => {
            setIsPasswordMatch(!isPasswordMatch);
          }}
          endIcon={isSubmit ? <></> : <SendSharp />}
        >
          <Input
            type="submit"
            disableUnderline={true}
            style={{
              color: "#fff",
              fontWeight: "600",
            }}
          ></Input>
          {isSubmit && isPasswordMatch ? (
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
    </>
  );
}
