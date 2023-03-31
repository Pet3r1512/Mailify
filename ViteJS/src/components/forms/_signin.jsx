import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Grid, Button } from "@mui/material";
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
    <form className="w-1/3" onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        rowGap={2}
        direction="column"
        justifyContent={"center"}
        alignItems="center"
      >
        <TextField
          label="Username"
          required
          fullWidth
          placeholder="Username"
          {...register("username")}
        />
        <TextField
          label="Password"
          required
          fullWidth
          type={"password"}
          placeholder="Password"
          {...register("password")}
        />
        <Button variant="contained">
          <input type="submit" />
        </Button>
      </Grid>
    </form>
  );
}
