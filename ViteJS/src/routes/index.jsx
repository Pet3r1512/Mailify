import { createBrowserRouter } from "react-router-dom";
import { RegisterPage, SignInPage, Setting, Home, Inbox } from "../pages";
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
