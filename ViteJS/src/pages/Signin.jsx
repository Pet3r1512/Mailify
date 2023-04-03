import { useEffect, useState } from "react";
import { Tab } from "../components";
import { SignIn } from "../components/forms";
import Loading from "./Loading";
import { Link, Typography } from "@mui/material";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Loading effect
  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) =>
        setTimeout(r, Math.floor(Math.random() * (1250 - 750 + 1) + 750))
      );
      setIsLoading(!isLoading);
    };
    loadData();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <Tab name="Sign In" />
      <div className="bg-white flex flex-col md:h-screen justify-center items-center">
        <h1 className="text-4xl text-primary font-bold mb-8">Sign In</h1>
        <SignIn />
        <Typography
          variant="body1"
          color="common.black"
          style={{
            fontWeight: 600,
            marginTop: "24px",
          }}
        >
          Are you new to Mailify?{" "}
          <Link href="/register" underline="always" color="primary">
            Create new account
          </Link>
        </Typography>
      </div>
    </>
  );
}
