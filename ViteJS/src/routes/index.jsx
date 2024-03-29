import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Setting from "../pages/Setting";
import RegisterPage from "../pages/Register";
import SignInPage from "../pages/Signin";
import Inbox from "../pages/Inbox";
import MailDetail from "../pages/MailDetail";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/inbox",
    element: <Inbox />,
  },
  {
    path: "mail/:id",
    element: <MailDetail />,
  },
  {
    path: "/user/profile",
    element: <Profile />,
  },
]);

export default router;
