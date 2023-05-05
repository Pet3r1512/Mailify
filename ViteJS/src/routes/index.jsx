import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Setting from "../pages/Setting";
import RegisterPage from "../pages/RegisterPage";
import SignInPage from "../pages/SignInPage";
import Inbox from "../pages/Inbox";
import MailDetail from "../pages/MailDetail";

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
]);

export default router;
