import { createBrowserRouter, Link } from "react-router";
import App from "./App";
import { CoursesPage } from "./pages/courses-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

    {
    path: "/Courses",
    element: <CoursesPage />
  },
])