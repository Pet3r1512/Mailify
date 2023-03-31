import React from "react";
import Register from "../components/forms/_register";
import { HeadBar, Tab } from "../components/index";

export default function RegisterPage() {
  return (
    <div className="bg-white flex flex-col min-h-screen justify-center items-center">
      <Tab name={"Register"} />
      <h1 className="text-4xl text-primary font-bold mb-8">
        Create New Account
      </h1>
      <Register />
    </div>
  );
}
