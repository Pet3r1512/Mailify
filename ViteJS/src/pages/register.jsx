import React from "react";
import Register from "../components/forms/_register";
import { HeadBar, Tab } from "../components/index";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";

export default function RegisterPage() {
  return (
    <div className="bg-white flex flex-col min-h-screen justify-center items-center">
      <Tab name={"Register"} />
      <h1 className="text-4xl text-primary font-bold mb-8">
        Create New Account
      </h1>
      <Register />
      <Typography
        variant="body1"
        color="common.black"
        style={{
          fontWeight: 600,
          marginTop: "24px",
        }}
      >
        Already have an account?{" "}
        <Link href="/signin" underline="always" color="primary">
          Sign In
        </Link>
      </Typography>
    </div>
  );
}
