import MainLayout from "../pages/mainLayout";
import LoginPage from "../pages/loginPage";
import SignUpPage from "../pages/signUpPage";

const Router = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/todoList",
    element: <MainLayout />,
  },
  {
    path: "/signUp",
    element: <SignUpPage />,
  },
];

export default Router;
