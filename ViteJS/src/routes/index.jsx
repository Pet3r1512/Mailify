import { createBrowserRouter } from "react-router-dom";
import { RegisterPage, SignInPage, Setting, Home, Inbox } from "../pages";

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
]);

export default router;
