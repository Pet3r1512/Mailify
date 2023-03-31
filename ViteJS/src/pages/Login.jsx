import { Tab } from "../components";
import { SignIn } from "../components/forms";

export default function SignInPage() {
  return (
    <>
      <Tab name="Sign In" />
      <div className="bg-white flex flex-col md:h-screen justify-center items-center">
        <h1 className="text-4xl text-primary font-bold mb-8">Sign In</h1>
        <SignIn />
      </div>
    </>
  );
}
