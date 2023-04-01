import { useEffect, useState } from "react";
import { Tab } from "../components";
import { SignIn } from "../components/forms";
import { Link, Typography, CircularProgress } from "@mui/material";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 2000));
      setIsLoading(!isLoading);
    };

    loadData();
  }, []);

  if (isLoading) return <CircularProgress />;
  else
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
