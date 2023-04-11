import React, { useEffect, useState } from "react";
import Register from "../components/forms/_register";
import { HeadBar, Tab } from "../components/index";
import { Link, Typography } from "@mui/material";
import Loading from "./Loading";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => {
        setTimeout(r, Math.floor(Math.random() * (1250 - 750 + 1) + 750));
      });
      setIsLoading(!isLoading);
    };
    loadData();
  }, []);

  if (isLoading) return <Loading />;

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
