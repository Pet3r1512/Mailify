import React from "react";
import { useForm } from "react-hook-form";
import { Input, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
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
          return navigate("/testLogin");
        }
      });
  };

  return (
    <form
      className="flex flex-col gap-y-2 w-1/2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label="username"
        required
        placeholder="Username"
        {...register("username")}
      />
      <TextField
        label="Password"
        required
        type={"password"}
        placeholder="Password"
        {...register("password")}
      />
      <button className="btn btn-active btn-primary text-white">
        <input type="submit" />
      </button>
    </form>
  );
}
