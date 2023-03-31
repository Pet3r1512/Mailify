import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const onSubmit = async (data) => {
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
          return navigate("/");
        }
      });
  };

  return (
    <form
      className="flex flex-col gap-y-4 w-[600px] mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label="Full Name"
        color="inputColor"
        required
        {...register("fullname")}
      />
      <TextField
        label="Phone Number"
        required
        color="inputColor"
        type="tel"
        pattern="0[0-9]{9}"
        {...register("phonenumber")}
      />
      <TextField
        required
        label="Username"
        color="inputColor"
        placeholder="username@mailify.com"
        value={email}
        // onChange={(e) => {
        //   setEmail(e.target.value);
        // }}
        {...register("username")}
      />
      {email && (
        <Typography variant="primary">{`Your email address is: ${email}@mailify.com`}</Typography>
      )}
      <TextField
        required
        label="Password"
        color="inputColor"
        type="password"
        {...register("password")}
      />
      <button className="btn btn-active btn-primary text-white">
        <input type="submit" />
      </button>
    </form>
  );
}
